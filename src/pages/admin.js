import React from "react"
import { Router } from "@reach/router"
import Login from "../modules/Admin/index"
import Dashboard from "../modules/Admin/Dashboard.js"
import Logs from "../modules/Admin/Logs/Logs.js"
import Projects from "../modules/Admin/Projects/Projects.js"
import Project_Type from "../modules/Admin/Project_Type/Project_Type.js"
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import Skill_Types from "../modules/Admin/Skill_Types/Skill_Types.js"
import Skills from "../modules/Admin/Skills/Skills.js"

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
