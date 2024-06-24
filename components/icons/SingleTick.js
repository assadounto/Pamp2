import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SingleTick = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        fill="none"
        color="#fff"
        {...props}
    >
        <Path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5 14.5s1.5 0 3.5 3.5c0 0 5.559-9.167 10.5-11"
        />
    </Svg>
)
export default SingleTick
