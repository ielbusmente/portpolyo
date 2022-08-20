import React, { useEffect } from "react"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { useFuncs, useVals } from "../../contexts/ContextProvider"

function Education() {
  const { setcurrent_page } = useFuncs()
  const { current_page } = useVals()

  useEffect(() => {
    setcurrent_page("education")
  }, [setcurrent_page])

  return (
    <Layout current_page={current_page}>
      <Seo title="Education" />
      {/* <Link to="/admin">Admin</Link> */}
      Education Page
    </Layout>
  )
}

export const Head = () => <Seo title="Education" />
export default Education
