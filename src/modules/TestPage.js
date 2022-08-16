import React, { useEffect, useState } from "react"
/* TODO: make results optional - tried /:results? - did not work with TestPage.js*/
export default function TestPage({ path, results }) {
  // console.log(path)
  // console.log(results)
  const [person, setperson] = useState({})
  const [loading, setloading] = useState(true)
  useEffect(() => {
    setloading(true)
    console.log("results", results)
    fetch(`https://randomuser.me/api${results ? `/?results=${results}` : ""}`)
      .then(x => x.json())
      .then(x => {
        setperson(x)
        setloading(false)
      })
      .catch(err => {
        console.error(err)
        setperson(err)
        setloading(false)
      })
  }, [path])

  return (
    <pre>{loading ? <>Loading</> : <>{JSON.stringify(person, null, 2)}</>}</pre>
  )
}
