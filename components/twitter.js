import * as React from "react"
import Svg, { Path } from "react-native-svg"
const TwitterIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        color="#fff"
        viewBox="0 0 24 24"
        {...props}
    >
        <Path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="m3 21 7.548-7.548M21 3l-7.548 7.548m0 0L8 3H3l7.548 10.452m2.904-2.904L21 21h-5l-5.452-7.548"
        />
    </Svg>
)
export default TwitterIcon
