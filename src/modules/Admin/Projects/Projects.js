import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import { listen_for_updates } from "../../../utils/firebase"
import { useNavigate } from "@reach/router"
import { useVals } from "../../../contexts/ContextProvider"

function Projects() {
  const [projects, setprojects] = useState([])
  const [loading, setloading] = useState(false)
  const { current_user } = useVals()
  const navigate = useNavigate()

  async function handle_delete(id) {
    console.log(id)
  }

  useEffect(() => {
    setloading(true)
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
