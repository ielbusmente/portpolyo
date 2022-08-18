import React from "react"
import ContextProvider from "./src/contexts/ContextProvider"

export const wrapRootElement = ({ element }) => {
  return <ContextProvider>{element}</ContextProvider>
}
