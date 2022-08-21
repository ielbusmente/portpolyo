import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import { listen_for_updates } from "../../../utils/firebase"
import { useNavigate } from "@reach/router"
import { useVals } from "../../../contexts/ContextProvider"
import { add_log } from "../../../utils/logs"
import {
  add_project,
  delete_project,
  update_project,
} from "../../../utils/projects"
import { Form, Modal, Button, Container } from "react-bootstrap"
import Table from "../Table"

function Projects() {
  // import data

  // "0ECKmpk9UcWfBLlFr6lQ", //electron
  // "3m1X0BVG8XRtIxo2ScbN", //green java
  // "9vDKysWc4RO9K511iFop", // java
  // "EinlVsjzYPtSo6DowT6W", //xml
  // "Qklg5bvcGEbDdtiDuKYp", //nedb
  // "WT36nmgK2x7l5Mi52Bac", //py
  // "axemDruGht1fTjUVjxt4", //mongodb
  // "bpG4FEg0gctkJpbaNxan", //android java
  // "hY2tlDOP5CGbLRb3OIUQ", //android stud
  // "i9T85rCjIWtMCTkwfbuB", //mongoose
  // "taktvFzqb5UzydYzIBR4", //firebase
  // "vRszxejlJLGSCfKOroXv", //green
  // const projects_import = [
  //   {
  //     name: "El Tomasino",
  //     date: "2022-12-8",
  //     details: "Member Position: Lead Developer",
  //     description: "A Web Application Dedicated in Promoting UST Athletes",
  //     link: "https://el-tomasino.herokuapp.com/",
  //     skills: [
  //       "eW3Ne64TXqFL39qSQXwC", //html
  //       "hIsfKPtImV1y4dBH1zjQ", //css
  //       "TUuMQTXpX7GuIp5gpID1", //bootstrap
  //       "JLxP8mUmmSg4nbRkApjc", //js
  //       "w8rOEfs3xk4U1IYPBACh", //reacjs
  //       "taktvFzqb5UzydYzIBR4", //firebase
  //       "ZxmXXECtrR0YCchfGTqC", //heroku
  //     ],
  //     proj_type: "gavifsdMTdJJxd5yRJ4l", //major req
  //     color: "yellow",
  //   },
  //   {
  //     name: "SleepyPH Web App",
  //     date: "2022-10-11",
  //     details: "Member Position: Developer",
  //     description:
  //       "A Product Catalog Web Application with an Inquiry Management System",
  //     link: "http://sleepyph.000webhostapp.com/",
  //     skills: [
  //       "eW3Ne64TXqFL39qSQXwC", //html
  //       "hIsfKPtImV1y4dBH1zjQ", //css
  //       "TUuMQTXpX7GuIp5gpID1", //bootstrap
  //       "JLxP8mUmmSg4nbRkApjc", //js
  //       "CzsL4sli21nMWyorEdG3", //php
  //       "9NaMKNata9O2qZtad6YH", //sql
  //       "Ui1IEcufosVYxZssWqWR", //mysql
  //       "eq66xDe1uHidAZa4QAHJ", //000webhostapp
  //     ],
  //     proj_type: "gavifsdMTdJJxd5yRJ4l", //major req
  //     color: "pink",
  //   },
  // ]

  // useEffect(() => {
  //   // if (false)
  //   projects_import.forEach(async p => {
  //     setloading(true)
  //     try {
  //       await add_project(p)

  //       add_log({
  //         log: `${current_user.email} added ${p.name.trim()} as a Project.`,
  //       })
  //       setloading(false)
  //     } catch (e) {
  //       console.error(e)

  //       add_log({
  //         log: `${
  //           current_user.email
  //         } failed to add ${p.name.trim()} as a Project.`,
  //       })
  //       setloading(false)
  //     }
  //   })
  // }, [])
  const [projects, setprojects] = useState([])
  const [project_types, setproject_types] = useState([])
  const [skills, setskills] = useState([])
  const [selected_skills, setselected_skills] = useState([])
  const [loading, setloading] = useState(false)
  // modal
  const [open_add_modal, setopen_add_modal] = useState(false)
  const [project, setproject] = useState({ name: "" })
  const [open_edit_modal, setopen_edit_modal] = useState(false)
  const [project_to_edit, setproject_to_edit] = useState(null)

  const { current_user } = useVals()
  const navigate = useNavigate()

  //  add project to db and logs action
  async function handle_submit(e) {
    e.preventDefault()
    setloading(true)
    try {
      await add_project({
        name: project.name.trim(),
        date: project.date,
        details: project.details.trim(),
        description: project.description.trim(),
        link: project.link.trim(),
        projects: project.projects,
        proj_type: project.proj_type,
        color: project.color,
      })

      add_log({
        log: `${current_user.email} added ${project.name.trim()} as a Project.`,
      })
      setloading(false)
      setopen_add_modal(false)
      setproject({ name: "" })
    } catch (e) {
      console.error(e)

      add_log({
        log: `${
          current_user.email
        } failed to add ${project.name.trim()} as a Project.`,
      })
      setloading(false)
    }
  }
  //  updates a  project in db and logs action
  async function handle_submit_edit(e) {
    e.preventDefault()
    setloading(true)
    try {
      await update_project({
        _id: project_to_edit.id,
        name: project_to_edit.name.trim(),
        date: project_to_edit.date,
        details: project_to_edit.details.trim(),
        description: project_to_edit.description.trim(),
        link: project_to_edit.link.trim(),
        skills: project_to_edit.skills,
        proj_type: project_to_edit.proj_type,
      })

      add_log({
        log: `${
          current_user.email
        } updated ${project_to_edit.name.trim()} Project.`,
      })
      setloading(false)
      setopen_edit_modal(false)
      setproject_to_edit(null)
    } catch (e) {
      console.error(e)
      add_log({ log: `${current_user.email} failed to update Project.` })
      setloading(false)
    }
  }
  function handle_cancel() {
    setopen_add_modal(false)
    setproject({ name: "" })
  }
  //   Opens the Edit Modal having the details of item matching id
  function handle_edit(id) {
    const target_project = projects.filter(p => p.id === id)
    setproject_to_edit(target_project[0])
    setopen_edit_modal(true)
  }
  function handle_cancel_edit() {
    setopen_edit_modal(false)
    setproject_to_edit(null)
  }
  async function handle_delete(id) {
    setloading(true)
    try {
      await delete_project(id)
      add_log({
        log: `${current_user.email} deleted Project with the id of ${id}.`,
      })
      setloading(false)
    } catch (e) {
      console.error(e)
      add_log({
        log: `${current_user.email} failed to delete Project with the id of ${id}.`,
      })
      setloading(false)
    }
  }
  useEffect(() => {
    setloading(true)
    listen_for_updates(setproject_types, "proj_types")
    listen_for_updates(setskills, "skills")
    listen_for_updates(setprojects, "projects")
    setloading(false)
  }, [])
  // useEffect(() => {
  //   console.log(project)
  // }, [project])

  // redirect to login if there is no current signed in user
  useEffect(() => {
    if (!current_user) navigate("/admin")
  }, [current_user])

  return (
    <>
      <Container>
        Projects
        <Button type="button" onClick={() => setopen_add_modal(true)}>
          Add a Project
        </Button>
        <Table
          table_columns={4}
          header={[`#`, `Project`, `Type`, ``]}
          loading={loading}
          list={projects}
          handle_delete={handle_delete}
          handle_edit={handle_edit}
        />
      </Container>
      {/* add modal  */}
      <Modal show={open_add_modal}>
        <Modal.Header
          style={{ background: "#000" }}
          className="text-center flex-column p-4"
        >
          <h2 className="text-white p-0 m-0">{"Add Project"}</h2>
        </Modal.Header>
        <Form onSubmit={handle_submit}>
          <Modal.Body>
            <Form.Group className="mx-4 my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                id={`name`}
                required
                placeholder={`Name`}
                value={project.name}
                onChange={e => {
                  setproject({ ...project, name: e.target.value })
                }}
                disable={loading.toString()}
              />
            </Form.Group>
            <Form.Group className="mx-4 my-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                id={`proj_type`}
                required
                value={project.proj_type}
                onChange={e => {
                  setproject({
                    ...project,
                    proj_type: e.target.value,
                  })
                }}
                disable={loading.toString()}
              >
                <option value="">Select Project Type</option>
                {project_types.map(pt => (
                  <option key={pt.id} value={`${pt.id}`}>
                    {pt.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {/* <Form.Group className="mx-4 my-3">
              <Form.Label>Skills</Form.Label>
              <Form.Select
                id={`skill0`}
                required
                value={project.proj_type}
                onChange={e => {
                  setproject({
                    ...project,
                    proj_type: e.target.value,
                  })
                }}
                disable={loading.toString()}
              >
                <option value="">Select Project Type</option>
                {project_types.map(pt => (
                  <option key={pt.id} value={`${pt.id}`}>
                    {pt.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group> */}
            {/* setselected_skills */}
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                required
                value={project.date}
                onChange={e => {
                  setproject({
                    ...project,
                    date: e.target.value,
                  })
                }}
                disable={loading.toString()}
              />
            </Form.Group>
            <Form.Group className="mx-4 my-3">
              <Form.Label>Link</Form.Label>
              <Form.Control
                id={`link`}
                placeholder={`Link`}
                value={project.link}
                onChange={e => {
                  setproject({ ...project, link: e.target.value })
                }}
                disable={loading.toString()}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="dark"
              className="rounded-pill m-1"
              type="submit"
              disabled={loading || (project && project.name.trim() === "")}
            >
              Add Project
            </Button>
            <Button
              variant="outline-secondary"
              className="rounded-pill m-1"
              onClick={handle_cancel}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/* edit modal  */}
      {project_to_edit && (
        <Modal show={open_edit_modal}>
          <Modal.Header
            style={{ background: "#000" }}
            className="text-center flex-column p-4"
          >
            <h2 className="text-white p-0 m-0">{"Edit Project"}</h2>
          </Modal.Header>
          <Form onSubmit={handle_submit_edit}>
            <Modal.Body>
              <Form.Group className="mx-4 my-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  id={`name`}
                  required
                  placeholder={`Name`}
                  value={project_to_edit.name}
                  onChange={e => {
                    setproject_to_edit({
                      ...project_to_edit,
                      name: e.target.value,
                    })
                  }}
                  disable={loading.toString()}
                />
              </Form.Group>
              <Form.Group className="mx-4 my-3">
                <Form.Label>Type</Form.Label>
                <Form.Select
                  id={`proj_type`}
                  required
                  value={project_to_edit.proj_type}
                  onChange={e => {
                    setproject_to_edit({
                      ...project_to_edit,
                      proj_type: e.target.value,
                    })
                  }}
                  disable={loading.toString()}
                >
                  <option value="">Select Project Type</option>
                  {project_types.map(pt => (
                    <option key={pt.id} value={`${pt.id}`}>
                      {pt.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="dark"
                className="rounded-pill m-1"
                type="submit"
                disabled={
                  loading ||
                  (project_to_edit && project_to_edit.name.trim() === "")
                }
              >
                Update project
              </Button>
              <Button
                variant="outline-secondary"
                className="rounded-pill m-1"
                onClick={handle_cancel_edit}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </>
  )
}

export default Projects
