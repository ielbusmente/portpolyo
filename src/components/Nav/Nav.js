import React from "react"
import "./nav.css"
import LiNav from "./LiNav"

export default function Nav() {
  const pages = [
    {
      label: "Home",
      page: "home",
      link: "/",
    },
    {
      label: "Work Experience",
      page: "workxp",
      link: "/work-experience",
    },
    {
      label: "Education",
      page: "education",
      link: "/education",
    },
  ]
  return (
    <nav className="nav navbar">
      <ul className="d-flex w-100 align-items-center ">
        {pages.map((p, p_i) => (
          <LiNav key={p_i} label={p.label} page={p.page} link={p.link} />
        ))}
      </ul>
    </nav>
  )
}
