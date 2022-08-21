import React, { useState } from "react"
import "./intro.css"

function Intro() {
  const [translate, settranslate] = useState(false)
  return (
    <h1
      className="intro-container"
      onMouseEnter={() => settranslate(true)}
      onMouseLeave={() => settranslate(false)}
    >
      {translate ? `Daniel nga pala! ;))` : `Hi! I'm Daniel! ;))`}
    </h1>
  )
}

export default Intro
