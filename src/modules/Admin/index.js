import React, { useRef, useContext, useState, useEffect } from "react"
import { useNavigate } from "@reach/router"
import { useFuncs, useVals } from "../../contexts/ContextProvider"
import { add_log } from "../../utils/logs"

export default function Admin() {
  const email_ref = useRef()
  const pass_ref = useRef()
  const { login } = useFuncs()
  const { current_user } = useVals()
  // console.log(login)
  const navigate = useNavigate()
  const handle_login = async e => {
    e.preventDefault()
    try {
      // TODO:
      // set loading true
      await login(email_ref.current.value, pass_ref.current.value)
      add_log({ log: `${email_ref.current.value} logged in successfully.` })
      navigate("/admin/dashboard")
    } catch (e) {
      console.error(e)
      console.error(e.message)
      add_log({ log: `${email_ref.current.value} failed to log in.` })
    }
    // TODO:
    // set loading false
  }

  // redirect to dashboard if there is a current signed in user
  useEffect(() => {
    if (current_user) navigate("/admin/dashboard")
  }, [current_user])

  return (
    <div>
      <form onSubmit={handle_login}>
        <div id="email_group">
          <label htmlFor="email">Email</label>
          <input ref={email_ref} type="text" id="email" placeholder="Email" />
        </div>
        <div id="password_group">
          <label htmlFor="password">Password</label>
          <input
            ref={pass_ref}
            type="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
