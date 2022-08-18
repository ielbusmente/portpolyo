import React from "react"
import { Router } from "@reach/router"
import Login from "../modules/Admin/index"
import Dashboard from "../modules/Admin/dashboard"

export default function Site() {
  return (
    <Router>
      <Login path="/admin" />
      <Dashboard path="/admin/dashboard" />
    </Router>
  )
}
