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
const LINKS = [
  {
    text: "Tutorial",
    url: "page-2",
    description:
      "A great place to get started if you're new to web development. Designed to guide you through setting up your first Gatsby site.",
  },
]

const SpinningMesh = ({
  position,
  color,
  speed,
  title,
  settitle,
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
        setopen(true)
        settitle(title)
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
  const [title, settitle] = React.useState("")
  const { setcurrent_page } = useFuncs()

  React.useEffect(() => {
    setcurrent_page("home")
  }, [setcurrent_page])

  return (
    <Layout>
      <Seo title="Home" />
      <Link to="/admin">Admin</Link>
      {/* <StaticImage
        src="../images/example.png"
        loading="eager"
        width={64}
        quality={95}
        formats={["auto", "webp", "avif"]}
        alt=""
        style={{ marginBottom: `var(--space-3)` }}
      /> */}

      <h1>Projects</h1>
      {/* <div className="projects-canvas">
        <Canvas colorManagement camera={{ position: [5, 2, 10], fov: 60 }}>
        
          <ambientLight intensity={0.3} /> 
          <pointLight position={[-10, 0, -20]} intensity={0.5} />
          <pointLight position={[0, -10, 0]} intensity={1.5} />
          <group>
            <SpinningMesh
              position={[0, 2, 0]}
              color="lightblue"
              speed={2}
              title={`lightblue`}
              settitle={settitle}
              setopen={setopen}
              rotation_speed={0.01}
            />
            <SpinningMesh
              position={[1, 1, 1]}
              color="pink"
              speed={6}
              title={`pink`}
              settitle={settitle}
              setopen={setopen}
              rotation_speed={0.02}
            />
            <SpinningMesh
              position={[0, 3, 2]}
              color="yellow"
              speed={3}
              title={`yellow`}
              settitle={settitle}
              setopen={setopen}
              rotation_speed={0.03}
            />
            <SpinningMesh
              position={[-1, 3, 1]}
              color="violet"
              speed={3}
              title={`violet`}
              settitle={settitle}
              setopen={setopen}
              rotation_speed={0.03}
            />
            <SpinningMesh
              position={[-2, 1, 0]}
              color="green"
              speed={1}
              title={`green`}
              settitle={settitle}
              setopen={setopen}
              rotation_speed={0.001}
            />
          </group> 
          <OrbitControls />
        </Canvas>
      </div> */}

      <Modal show={open}>
        <Modal.Header
          style={{ background: "#000" }}
          className="text-center flex-column p-4"
        >
          <h2 className="text-white p-0 m-0">{"Add Project Type"}</h2>
        </Modal.Header>
        <Modal.Body>
          <h1>{title}</h1>
        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={() => {
              setopen(false)
              settitle("")
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
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
