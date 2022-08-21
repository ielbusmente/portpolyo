import React, { useEffect, useState } from "react"
import { listen_for_updates } from "../../../utils/firebase"
import Table from "../Table"
import { Form, Modal } from "react-bootstrap"
import { add_skill, update_skill, delete_skill } from "../../../utils/skills"
import { useVals } from "../../../contexts/ContextProvider"
import { add_log } from "../../../utils/logs"
import { useNavigate } from "@reach/router"
import { Button, Container } from "react-bootstrap"

function Skills() {
  // const skills_import = [
  //   { name: "JavaScript", type: "6ibFhIwRhf86L1JMgnvq" },
  //   { name: "PHP", type: "6ibFhIwRhf86L1JMgnvq" },
  //   { name: "ReactJS", type: "cj0Xj4TkmzHEpBpmag7m" },
  //   { name: "Android Java", type: "6ibFhIwRhf86L1JMgnvq" },
  //   { name: "HTML", type: "rrqzeb1g5gxTXi677Kfw" },
  //   { name: "XML", type: "rrqzeb1g5gxTXi677Kfw" },
  //   { name: "CSS", type: "DABFJ1swCAFZJSC9mj3y" },
  //   { name: "Java", type: "6ibFhIwRhf86L1JMgnvq" },
  //   { name: "Greenfoot Java", type: "6ibFhIwRhf86L1JMgnvq" },
  //   { name: "Greenfoot", type: "aPsivqN7lfF6ojuEHIhR" },
  //   { name: "Android Studio", type: "aPsivqN7lfF6ojuEHIhR" },
  //   { name: "Python", type: "6ibFhIwRhf86L1JMgnvq" },
  //   { name: "Heroku", type: "kdSk6PG0RWt6jxzLMDdp" },
  //   { name: "Firebase", type: "HeU33VxE2xc6oY8weBOZ" },
  //   { name: "Electron", type: "u5LeJzEgBazplHOtxUnW" },
  //   { name: "SQL", type: "g3EvPKmiMsceo2U7hzZF" },
  //   { name: "Mongoose", type: "cj0Xj4TkmzHEpBpmag7m" },
  // ]

  // // auto import
  // useEffect(() => {
  //   skills_import.forEach(async s => {
  //     // console.log(s)
  //     setloading(true)
  //     try {
  //       await add_skill(s)
  //       add_log({
  //         log: `${current_user.email} added ${s.name.trim()} as a Skill.`,
  //       })
  //       setloading(false)
  //       // setopen_add_modal(false)
  //       // setskill_type({ name: "" })
  //     } catch (e) {
  //       console.error(e)
  //       add_log({
  //         log: `${
  //           current_user.email
  //         } failed to add ${s.name.trim()} as a Skill.`,
  //       })
  //       setloading(false)
  //     }
  //   })
  // }, [])
  const [skills, setskills] = useState([])
  const [skill_types, setskill_types] = useState([])
  const [loading, setloading] = useState(false)
  // modal
  const [open_add_modal, setopen_add_modal] = useState(false)
  const [skill, setskill] = useState({ name: "" })
  const [open_edit_modal, setopen_edit_modal] = useState(false)
  const [skill_to_edit, setskill_to_edit] = useState(null)

  const { current_user } = useVals()
  const navigate = useNavigate()
  //  add skill to db and logs action
  async function handle_submit(e) {
    e.preventDefault()
    setloading(true)
    try {
      await add_skill({ name: skill.name.trim(), type: skill.type })
      add_log({
        log: `${current_user.email} added ${skill.name.trim()} as a Skill.`,
      })
      setloading(false)
      setopen_add_modal(false)
      setskill({ name: "" })
    } catch (e) {
      console.error(e)
      add_log({
        log: `${
          current_user.email
        } failed to add ${skill.name.trim()} as a Skill.`,
      })
      setloading(false)
    }
  }
  //  updates a skill in db and logs action
  async function handle_submit_edit(e) {
    e.preventDefault()
    setloading(true)
    try {
      await update_skill(skill_to_edit.id, {
        name: skill_to_edit.name.trim(),
      })
      add_log({
        log: `${
          current_user.email
        } updated ${skill_to_edit.name.trim()} Skill.`,
      })
      setloading(false)
      setopen_edit_modal(false)
      setskill_to_edit(null)
    } catch (e) {
      console.error(e)
      add_log({ log: `${current_user.email} failed to update Skill.` })
      setloading(false)
    }
  }
  function handle_cancel() {
    setopen_add_modal(false)
    setskill({ name: "" })
  }
  //   Opens the Edit Modal having the details of item matching id
  function handle_edit(id) {
    const target_skill = skills.filter(s => s.id === id)
    setskill_to_edit(target_skill[0])
    setopen_edit_modal(true)
  }
  function handle_cancel_edit() {
    setopen_edit_modal(false)
    setskill_to_edit(null)
  }
  async function handle_delete(id) {
    setloading(true)
    try {
      await delete_skill(id)
      add_log({
        log: `${current_user.email} deleted Skill with the id of ${id}.`,
      })
      setloading(false)
    } catch (e) {
      console.error(e)
      add_log({
        log: `${current_user.email} failed to delete Skill with the id of ${id}.`,
      })
      setloading(false)
    }
  }

  useEffect(() => {
    setloading(true)
    listen_for_updates(setskills, "skills")
    listen_for_updates(setskill_types, "skill_types")
    setloading(false)
  }, [])

  useEffect(() => {
    const new_skills = skills.map(s => {
      const type = skill_types.filter(st => st.id === s.type)[0]
      return { ...s, type_string: type.name }
    })
    console.log(new_skills)
    setskills(new_skills)
  }, [skill_types, loading])

  // redirect to login if there is no current signed in user
  useEffect(() => {
    if (!current_user) navigate("/admin")
  }, [current_user])

  return (
    <>
      <Container>
        Skills
        <Button type="button" onClick={() => setopen_add_modal(true)}>
          Add a Skill
        </Button>
        <Table
          table_columns={4}
          header={[`#`, `Skill`, `Type`, ``]}
          loading={loading}
          list={skills}
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
          <h2 className="text-white p-0 m-0">{"Add Skill"}</h2>
        </Modal.Header>
        <Form onSubmit={handle_submit}>
          <Modal.Body>
            <Form.Group className="mx-4 my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                id={`name`}
                required
                placeholder={`Name`}
                value={skill.name}
                onChange={e => {
                  setskill({ ...skill, name: e.target.value })
                }}
                disable={loading.toString()}
              />
            </Form.Group>
            <Form.Group className="mx-4 my-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                id={`type`}
                required
                value={skill.type}
                onChange={e => {
                  setskill({
                    ...skill,
                    type: e.target.value,
                  })
                }}
                disable={loading.toString()}
              >
                <option value="">Select Skill Type</option>
                {skill_types.map(st => (
                  <option key={st.id} value={`${st.id}`}>
                    {st.name}
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
              disabled={loading || (skill && skill.name.trim() === "")}
            >
              Add Skill
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
      {skill_to_edit && (
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
                  value={skill_to_edit.name}
                  onChange={e => {
                    setskill_to_edit({
                      ...skill_to_edit,
                      name: e.target.value,
                    })
                  }}
                  disable={loading.toString()}
                />
              </Form.Group>
              <Form.Group className="mx-4 my-3">
                <Form.Label>Type</Form.Label>
                <Form.Select
                  id={`type`}
                  required
                  value={skill_to_edit.type}
                  onChange={e => {
                    setskill_to_edit({
                      ...skill_to_edit,
                      type: e.target.value,
                    })
                  }}
                  disable={loading.toString()}
                >
                  <option value="">Select Skill Type</option>
                  {skill_types.map(st => (
                    <option key={st.id} value={`${st.id}`}>
                      {st.name}
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
                  loading || (skill_to_edit && skill_to_edit.name.trim() === "")
                }
              >
                Update Skill
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

export default Skills
