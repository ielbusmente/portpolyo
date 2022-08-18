import React, { useState, useEffect, useContext } from "react"
import { auth } from "../utils/firebase"

const GatsbyContextState = React.createContext()
const GatsbyContextAction = React.createContext()

export const useVals = () => useContext(GatsbyContextState)
export const useFuncs = () => useContext(GatsbyContextAction)

function ContextProvider({ children }) {
  const [current_user, setcurrent_user] = useState()
  const [webloading, setwebloading] = useState(true)

  //firebase auth

  // function signup(email, pass) {
  //   return auth.createUserWithEmailAndPassword(email, pass)
  // }
  const login = (e, p) => auth.signInWithEmailAndPassword(e, p)
  const logout = () => auth.signOut()

  // function newPass(pass) {
  //   return auth.currentUser.updatePassword(pass)
  // }
  // function newEmail(email) {
  //   return auth.currentUser.updateEmail(email)
  // }
  // function resetPass(email) {
  //   return auth.sendPasswordResetEmail(email, {
  //     url: "http://localhost:3000/login", //dev code
  //   })
  // }

  const states = {
    current_user,
  }
  const funcs = {
    login,
    logout,
  }

  useEffect(
    () =>
      auth.onAuthStateChanged(user => {
        setcurrent_user(user)
        setwebloading(false)
      }),
    []
  )

  return (
    <GatsbyContextState.Provider value={states}>
      <GatsbyContextAction.Provider value={funcs}>
        {!webloading && children}
      </GatsbyContextAction.Provider>
    </GatsbyContextState.Provider>
  )
}

export default ContextProvider
