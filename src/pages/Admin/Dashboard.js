import React, { useEffect } from "react"
import { useVals, useFuncs } from "../../contexts/ContextProvider"
import { useNavigate } from "@reach/router"
import { add_log } from "../../utils/logs"

export default function Dashboard() {
  const { current_user } = useVals()
  const { logout } = useFuncs()
  const navigate = useNavigate()

  async function handle_log_out(e) {
    e.preventDefault()
    try {
      // TODO:
      // set loading true
      await logout()
      add_log({ log: `${current_user.email} logged out successfully.` })
      navigate("/admin")
    } catch (e) {
      console.error(e)
      console.error(e.message)
      add_log({ log: `${current_user.email} failed to log out.` })
    }
  }
  // redirect to login if there is no current signed in user
  useEffect(() => {
    if (!current_user) navigate("/admin")
  }, [current_user])

  return (
    <div>
      dashboard{" "}
      <button type="button" onClick={handle_log_out}>
        Log Out
      </button>
    </div>
  )
}
