import React, { useEffect, useState } from "react"
import { listen_for_updates } from "../../../utils/firebase"
import Table from "../Table"
import { Form, Modal } from "react-bootstrap"
import {
  add_proj_type,
  delete_proj_type,
  update_proj_type,
} from "../../../utils/proj_types"
import { useVals } from "../../../contexts/ContextProvider"
import { add_log } from "../../../utils/logs"
import { useNavigate } from "@reach/router"
import { Button, Container } from "react-bootstrap"

function Project_Type() {
  const [project_types, setproject_types] = useState([])
  const [loading, setloading] = useState(false)
  // modal
  const [open_add_modal, setopen_add_modal] = useState(false)
  const [project_type, setproject_type] = useState({ name: "" })
  const [open_edit_modal, setopen_edit_modal] = useState(false)
  const [project_type_to_edit, setproject_type_to_edit] = useState(null)

  const { current_user } = useVals()
  const navigate = useNavigate()
  //  add project type to db and logs action
  async function handle_submit(e) {
    e.preventDefault()
    setloading(true)
    try {
      await add_proj_type({ name: project_type.name.trim() })

      add_log({
        log: `${
          current_user.email
        } added ${project_type.name.trim()} as a Project Type.`,
      })
      setloading(false)
      setopen_add_modal(false)
      setproject_type({ name: "" })
    } catch (e) {
      console.error(e)
      add_log({
        log: `${
          current_user.email
        } failed to add ${project_type.name.trim()} as a Project Type.`,
      })
      setloading(false)
    }
  }
  //  updates a  project type in db and logs action
  async function handle_submit_edit(e) {
    e.preventDefault()
    setloading(true)
    try {
      await update_proj_type(project_type_to_edit.id, {
        name: project_type_to_edit.name.trim(),
      })
      add_log({
        log: `${
          current_user.email
        } updated ${project_type_to_edit.name.trim()} Project Type.`,
      })
      setloading(false)
      setopen_edit_modal(false)
      setproject_type_to_edit(null)
    } catch (e) {
      console.error(e)
      add_log({ log: `${current_user.email} failed to update Project Type.` })
      setloading(false)
    }
  }
  function handle_cancel() {
    setopen_add_modal(false)
    setproject_type({ name: "" })
  }
  //   Opens the Edit Modal having the details of item matching id
  function handle_edit(id) {
    const target_project_type = project_types.filter(pt => pt.id === id)
    setproject_type_to_edit(target_project_type[0])
    setopen_edit_modal(true)
  }
  function handle_cancel_edit() {
    setopen_edit_modal(false)
    setproject_type_to_edit(null)
  }
  async function handle_delete(id) {
    setloading(true)
    try {
      await delete_proj_type(id)
      add_log({
        log: `${current_user.email} deleted Project Type with the id of ${id}.`,
      })
      setloading(false)
    } catch (e) {
      console.error(e)
      add_log({
        log: `${current_user.email} failed to delete Project Type with the id of ${id}.`,
      })
      setloading(false)
    }
  }

  useEffect(() => {
    setloading(true)
    listen_for_updates(setproject_types, "proj_types")
    setloading(false)
  }, [])

  // redirect to login if there is no current signed in user
  useEffect(() => {
    if (!current_user) navigate("/admin")
  }, [current_user])

  return (
    <>
      <Container>
        Project Types
        <Button type="button" onClick={() => setopen_add_modal(true)}>
          Add a Project Type
        </Button>
        <Table
          table_columns={3}
          header={[`#`, `Project Type`, ``]}
          loading={loading}
          list={project_types}
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
          <h2 className="text-white p-0 m-0">{"Add Project Type"}</h2>
        </Modal.Header>
        <Form onSubmit={handle_submit}>
          <Modal.Body>
            <Form.Group className="mx-4 my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                id={`name`}
                required
                placeholder={`Name`}
                value={project_type.name}
                onChange={e => {
                  setproject_type({ name: e.target.value })
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
              disabled={
                loading || (project_type && project_type.name.trim() === "")
              }
            >
              Add Project Type
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
      {project_type_to_edit && (
        <Modal show={open_edit_modal}>
          <Modal.Header
            style={{ background: "#000" }}
            className="text-center flex-column p-4"
          >
            <h2 className="text-white p-0 m-0">{"Edit"}</h2>
          </Modal.Header>
          <Form onSubmit={handle_submit_edit}>
            <Modal.Body>
              <Form.Group className="mx-4 my-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  id={`name`}
                  required
                  placeholder={`Name`}
                  value={project_type_to_edit.name}
                  onChange={e => {
                    setproject_type_to_edit({
                      ...project_type_to_edit,
                      name: e.target.value,
                    })
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
                disabled={
                  loading ||
                  (project_type_to_edit &&
                    project_type_to_edit.name.trim() === "")
                }
              >
                Update Project Type
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

export default Project_Type
