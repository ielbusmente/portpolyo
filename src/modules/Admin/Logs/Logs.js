import React, { useEffect, useState } from "react"
import { listen_for_updates } from "../../../utils/firebase"
import { useNavigate } from "@reach/router"
import { useVals } from "../../../contexts/ContextProvider"
function Logs() {
  const [logs, setlogs] = useState([])
  const [loading, setloading] = useState(false)
  const { current_user } = useVals()
  const navigate = useNavigate()
  useEffect(() => {
    setloading(true)
    listen_for_updates(setlogs, "logs")
    setloading(false)
  }, [])

  // redirect to login if there is no current signed in user
  useEffect(() => {
    if (!current_user) navigate("/admin")
  }, [current_user])
  return (
    <div>
      Logs
      {loading ? (
        <>Loading</>
      ) : (
        <>
          {logs && (
            <>
              {logs.map((log, log_i) => (
                <div key={log.id}>
                  {log_i + 1} {log.log} {new Date(log.date).toISOString()}
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Logs
