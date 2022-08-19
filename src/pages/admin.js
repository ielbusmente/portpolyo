import React from "react"
import { Router } from "@reach/router"
import Login from "../modules/Admin/index"
import Dashboard from "../modules/Admin/Dashboard"
import Logs from "../modules/Admin/Logs/Logs"
import Projects from "../modules/Admin/Projects/Projects"
import Project_Type from "../modules/Admin/Project_Type/Project_Type"
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

export default function Site() {
  return (
    <Router>
      <Login path="/admin" />
      <Dashboard path="/admin/dashboard" />
      <Logs path="/admin/logs" />
      <Projects path="/admin/projects" />
      <Project_Type path="/admin/project-types" />
    </Router>
  )
}
