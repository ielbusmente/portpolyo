import React from "react"
import { Router } from "@reach/router"
import Login from "../modules/Admin/index"
import Dashboard from "../modules/Admin/Dashboard"
import Logs from "../modules/Admin/Logs/Logs"
import Projects from "../modules/Admin/Projects/Projects"
import Project_Type from "../modules/Admin/Project_Type/Project_Type"
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import Skill_Types from "../modules/Admin/Skill_Types/Skill_Types"
import Skills from "../modules/Admin/Skills/Skills"

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
