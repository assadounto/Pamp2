import React from "react"
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"

const Loader1 = (props) => (
    <ContentLoader 
    speed={2}
    width={400}
    height={400}
    viewBox="0 0 500 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <Rect x="-26" y="18" rx="15" ry="15" width="420" height="317" />
  </ContentLoader>

)

export default Loader1

