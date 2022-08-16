import React from "react"
import { Router } from "@reach/router"
import TestPage from "../modules/TestPage"
import Admin from "../modules/Admin/index"

export default function Site() {
  return (
    <Router>
      {/* TODO: make results optional - tried /:results? - did not work with TestPage.js*/}
      <TestPage path="/admin/test" />
      <TestPage path="/admin/test/:results" />
      <Admin path="/admin" />
    </Router>
  )
}
