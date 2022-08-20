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

function Projects() {
  const [projects, setprojects] = useState([])
  const [project_types, setproject_types] = useState([])
  const [loading, setloading] = useState(false)
  // modal
  const [open_add_modal, setopen_add_modal] = useState(false)
  const [project, setproject] = useState({ title: "" })
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
        title: project.title.trim(),
        date: project.date,
        details: project.details.trim(),
        description: project.description.trim(),
        link: project.link.trim(),
        skills: project.skills,
        proj_type: project.proj_type,
      })

      add_log({
        log: `${
          current_user.email
        } added ${project.title.trim()} as a Project.`,
      })
      setloading(false)
      setopen_add_modal(false)
      setproject({ title: "" })
    } catch (e) {
      console.error(e)

      add_log({
        log: `${
          current_user.email
        } failed to add ${project.title.trim()} as a Project.`,
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
        title: project_to_edit.title.trim(),
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
        } updated ${project_to_edit.title.trim()} Project.`,
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
    setproject({ title: "" })
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
    listen_for_updates(setprojects, "projects")
    setloading(false)
  }, [])
  // redirect to login if there is no current signed in user
  useEffect(() => {
    if (!current_user) navigate("/admin")
  }, [current_user])

  return (
    <div>
      Projects
      {project_types.map(project_type => (
        <h1>{project_type.name}</h1>
      ))}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Project</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={3}>Loading</td>
            </tr>
          ) : (
            <>
              {projects.length > 0 ? (
                projects.map((p, p_i) => (
                  <tr key={p_i}>
                    <td>{p_i + 1}</td>
                    <td>
                      <Link to={`/admin/projects/${p.id}`}>{p.title}</Link>
                    </td>
                    <td>
                      <button type="button" onClick={() => handle_delete(p.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>No Data</td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Projects
