import React from "react"
import { Router } from "@reach/router"
import Login from "./Admin/index"
import Dashboard from "./Admin/Dashboard.js.js"
import Logs from "./Admin/Logs/Logs.js.js"
import Projects from "./Admin/Projects/Projects.js.js"
import Project_Type from "./Admin/Project_Type/Project_Type.js"
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import Skill_Types from "./Admin/Skill_Types/Skill_Types.js"
import Skills from "./Admin/Skills/Skills.js"

export default function Site() {
  return (
    <Router>
      <Login path="/admin" />
      <Dashboard path="/admin/dashboard" />
      <Logs path="/admin/logs" />
      <Projects path="/admin/projects" />
      <Project_Type path="/admin/project-types" />
      <Skill_Types path="/admin/skill-types" />
      <Skills path="/admin/skills" />
    </Router>
  )
}
