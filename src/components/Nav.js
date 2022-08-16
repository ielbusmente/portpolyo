import React from "react"
import { Link } from "gatsby"

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/page1">Page 1</Link>
        </li>
        <li>
          <Link to="/page3">Page 3</Link>
        </li>
      </ul>
    </nav>
  )
}
