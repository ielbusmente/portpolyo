import { Link } from "gatsby"
import React from "react"
import { useVals } from "../../contexts/ContextProvider"

function LiNav({ label, page, link }) {
  const { current_page } = useVals()
  const is_current_page = current_page === page
  return (
    <li>
      <Link
        to={is_current_page ? null : link}
        className={`btn btn-outline-light ${is_current_page ? "active" : ""}`}
      >
        {label}
      </Link>
    </li>
  )
}

export default LiNav
