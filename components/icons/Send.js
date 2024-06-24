import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SendIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={25}
        height={25}
        fill="none"
        color="#fff"
        {...props}
    >
        <Path
            stroke="currentColor"
            strokeWidth={2.5}
            d="M21.048 3.053C18.87.707 2.486 6.453 2.5 8.55c.015 2.379 6.398 3.11 8.167 3.607 1.064.299 1.349.604 1.594 1.72 1.111 5.052 1.67 7.566 2.94 7.622 2.027.09 7.972-16.158 5.847-18.447Z"
        />
        <Path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M11.5 12.5 15 9"
        />
    </Svg>
)
export default SendIcon
