import React, { useEffect } from "react"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { useFuncs, useVals } from "../../contexts/ContextProvider"

function WorkXP() {
  const { setcurrent_page } = useFuncs()
  const { current_page } = useVals()

  useEffect(() => {
    setcurrent_page("workxp")
  }, [setcurrent_page])

  return (
    <Layout current_page={current_page}>
      <Seo title="Work Experience" />
      {/* <Link to="/admin">Admin</Link> */}
      Work Experience
    </Layout>
  )
}

export const Head = () => <Seo title="Work Experience" />
export default WorkXP
