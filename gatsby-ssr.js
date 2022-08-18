const React = require("react")
const ContextProvider = require("./src/contexts/ContextProvider")

exports.onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: `en` })
}
// Wraps every page in a component
exports.wrapRootElement = ({ element }) => {
  return <ContextProvider>{element}</ContextProvider>
}
