import React, { useEffect, useState } from "react"
import { listen_for_updates } from "../../../utils/firebase"
import Table from "../Table"
import { Form, Modal, Button, Container } from "react-bootstrap"
import {
  add_skill_type,
  delete_skill_type,
  update_skill_type,
} from "../../../utils/skill_types"
import { useVals } from "../../../contexts/ContextProvider"
import { add_log } from "../../../utils/logs"
import { useNavigate } from "@reach/router"

function Skill_Types() {
  //   auto import
  //   const skill_types_import = [
  //     { name: "Programming Language" },
  //     { name: "Library" },
  //     { name: "Framework" },
  //     { name: "Query Language" },
  //     { name: "Markup Language" },
  //     { name: "Styling Language" },
  //     { name: "Backend as a Service" },
  //     { name: "Platform as a Service" },
  //     { name: "Infrastructure as a Service" },
  //     { name: "IDE" },
  //   ]

  const [skill_types, setskill_types] = useState([])
  const [loading, setloading] = useState(false)
  // modal
  const [open_add_modal, setopen_add_modal] = useState(false)
  const [skill_type, setskill_type] = useState({ name: "" })
  const [open_edit_modal, setopen_edit_modal] = useState(false)
  const [skill_type_to_edit, setskill_type_to_edit] = useState(null)

  const { current_user } = useVals()
  const navigate = useNavigate()
  //  add project type to db and logs action
  async function handle_submit(e) {
    e.preventDefault()
    setloading(true)
    try {
      await add_skill_type({ name: skill_type.name.trim() })
      add_log({
        log: `${
          current_user.email
        } added ${skill_type.name.trim()} as a Skill Type.`,
      })
      setloading(false)
      setopen_add_modal(false)
      setskill_type({ name: "" })
    } catch (e) {
      console.error(e)
      add_log({
        log: `${
          current_user.email
        } failed to add ${skill_type.name.trim()} as a Skill Type.`,
      })
      setloading(false)
    }
  }
  //  updates a  project type in db and logs action
  async function handle_submit_edit(e) {
    e.preventDefault()
    setloading(true)
    try {
      await update_skill_type(skill_type_to_edit.id, {
        name: skill_type_to_edit.name.trim(),
      })
      add_log({
        log: `${
          current_user.email
        } updated ${skill_type_to_edit.name.trim()} Skill Type.`,
      })
      setloading(false)
      setopen_edit_modal(false)
      setskill_type_to_edit(null)
    } catch (e) {
      console.error(e)
      add_log({ log: `${current_user.email} failed to update Skill Type.` })
      setloading(false)
    }
  }
  function handle_cancel() {
    setopen_add_modal(false)
    setskill_type({ name: "" })
  }
  //   Opens the Edit Modal having the details of item matching id
  function handle_edit(id) {
    const target_skill_type = skill_types.filter(st => st.id === id)
    setskill_type_to_edit(target_skill_type[0])
    setopen_edit_modal(true)
  }
  function handle_cancel_edit() {
    setopen_edit_modal(false)
    setskill_type_to_edit(null)
  }
  async function handle_delete(id) {
    setloading(true)
    try {
      await delete_skill_type(id)
      add_log({
        log: `${current_user.email} deleted Skill Type with the id of ${id}.`,
      })
      setloading(false)
    } catch (e) {
      console.error(e)
      add_log({
        log: `${current_user.email} failed to delete Skill Type with the id of ${id}.`,
      })
      setloading(false)
    }
  }

  useEffect(() => {
    setloading(true)
    listen_for_updates(setskill_types, "skill_types")
    setloading(false)
  }, [])

  //   auto import
  //   useEffect(() => {
  //     skill_types_import.forEach(async s => {
  //       console.log(s)
  //       setloading(true)
  //       try {
  //         await add_skill_type(s)
  //         add_log({
  //           log: `${current_user.email} added ${s.name.trim()} as a Skill Type.`,
  //         })
  //         setloading(false)
  //         setopen_add_modal(false)
  //         setskill_type({ name: "" })
  //       } catch (e) {
  //         console.error(e)
  //         add_log({
  //           log: `${
  //             current_user.email
  //           } failed to add ${s.name.trim()} as a Skill Type.`,
  //         })
  //         setloading(false)
  //       }
  //     })
  //   }, [])

  // redirect to login if there is no current signed in user
  useEffect(() => {
    if (!current_user) navigate("/admin")
  }, [current_user])

  return (
    <>
      <Container>
        Skill Types
        <Button type="button" onClick={() => setopen_add_modal(true)}>
          Add a Skill Type
        </Button>
        <Table
          table_columns={3}
          header={[`#`, `Skill Type`, ``]}
          loading={loading}
          list={skill_types}
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
          <h2 className="text-white p-0 m-0">{"Add Skill Type"}</h2>
        </Modal.Header>
        <Form onSubmit={handle_submit}>
          <Modal.Body>
            <Form.Group className="mx-4 my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                id={`name`}
                required
                placeholder={`Name`}
                value={skill_type.name}
                onChange={e => {
                  setskill_type({ name: e.target.value })
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
                loading || (skill_type && skill_type.name.trim() === "")
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
      {skill_type_to_edit && (
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
                  value={skill_type_to_edit.name}
                  onChange={e => {
                    setskill_type_to_edit({
                      ...skill_type_to_edit,
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
                  (skill_type_to_edit && skill_type_to_edit.name.trim() === "")
                }
              >
                Update Skill Type
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

export default Skill_Types
