import * as React from "react"
import { Link } from "gatsby"
// import { StaticImage } from "gatsby-plugin-image"
import "../components/home.css"
import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"
// three
import { Canvas, useFrame } from "react-three-fiber"
import { a } from "react-spring/three"
// Deai - R3F
import { MeshWobbleMaterial, OrbitControls } from "@react-three/drei"
import { Modal, Button } from "react-bootstrap"
import { useFuncs } from "../contexts/ContextProvider"
import { listen_for_updates } from "../utils/firebase"
import { points } from "../utils/plane-positioning"
import Intro from "../components/Intro/Intro"

const SpinningMesh = ({
  position,
  color,
  speed,
  project,
  setproject,
  setopen,
  rotation_speed,
}) => {
  //ref to target the mesh
  const mesh = React.useRef()

  //useFrame allows us to re-render/update rotation on each frame
  useFrame(
    () => (mesh.current.rotation.x = mesh.current.rotation.y += rotation_speed)
  )

  return (
    <a.mesh
      position={position}
      ref={mesh}
      scale={[0.5, 0.5, 0.5]}
      onClick={() => {
        // console.log(project)
        setopen(true)
        setproject(project)
      }}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <MeshWobbleMaterial
        color={color}
        speed={speed}
        attach="material"
        factor={0.6}
      />
    </a.mesh>
  )
}

const IndexPage = () => {
  const [open, setopen] = React.useState(false)
  const [project, setproject] = React.useState("")
  const { setcurrent_page } = useFuncs()

  const [projects, setprojects] = React.useState([])
  const [loading, setloading] = React.useState(false)

  function format_date(date) {
    const new_date = new Date(date).toDateString().split(" ").slice(1)
    new_date.splice(1, 1)
    return new_date.join(" ")
  }
  React.useEffect(() => {
    setcurrent_page("home")
  }, [setcurrent_page])

  React.useEffect(() => {
    setloading(true)
    listen_for_updates(setprojects, "projects")
    setloading(false)
  }, [])

  return (
    <Layout>
      <Seo title="Home" />
      <Intro />
      {/* <Link to="/admin">Admin</Link> */}
      {/* <StaticImage
        src="../images/example.png"
        loading="eager"
        width={64}
        quality={95}
        formats={["auto", "webp", "avif"]}
        alt=""
        style={{ marginBottom: `var(--space-3)` }}
      /> */}
      <h1>Check out my Projects!</h1>
      {loading ? (
        <>Loading</>
      ) : (
        <div className="projects-canvas" title="CLick 'em!">
          <Canvas colorManagement camera={{ position: [5, 2, 10], fov: 60 }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[-10, 0, -20]} intensity={0.5} />
            <pointLight position={[0, -10, 0]} intensity={1.5} />
            <group>
              {projects.map((pro, pro_i) => (
                <SpinningMesh
                  position={points[pro_i]}
                  color={pro.color}
                  speed={Math.floor(Math.random() * 3)}
                  project={pro}
                  setproject={setproject}
                  setopen={setopen}
                  rotation_speed={Math.random() * 0.03}
                />
              ))}
            </group>
            <OrbitControls />
          </Canvas>
        </div>
      )}
      {project && (
        <Modal show={open}>
          <Modal.Header
            className={`${project.color}-modal-header text-center flex-column p-4`}
          >
            <h2 className="text-white p-0 m-0">{project.name}</h2>
          </Modal.Header>
          <Modal.Body>
            {/* <h1>{project.name}</h1> */}
            <h5>{project.description}</h5>
            <h6>{format_date(project.date)}</h6>
            <p>{project.details}</p>
            {/* {project.link} */}
            {project.link && <a href={`${project.link}`}>Take a peek</a>}
          </Modal.Body>

          <Modal.Footer>
            <Button
              onClick={() => {
                setopen(false)
                setproject(null)
              }}
              variant={`outline-dark`}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
