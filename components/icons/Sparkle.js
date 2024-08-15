import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SparkleIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        color="#fff"
        {...props}
    >
        <Path
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="m15 2 .539 2.392a5.385 5.385 0 0 0 4.07 4.07L22 9l-2.392.539a5.385 5.385 0 0 0-4.07 4.07L15 16l-.539-2.392a5.385 5.385 0 0 0-4.07-4.07L8 9l2.392-.539a5.385 5.385 0 0 0 4.07-4.07L15 2ZM7 12l.385 1.708a3.846 3.846 0 0 0 2.907 2.907L12 17l-1.708.385a3.846 3.846 0 0 0-2.907 2.907L7 22l-.385-1.708a3.846 3.846 0 0 0-2.907-2.907L2 17l1.708-.385a3.846 3.846 0 0 0 2.907-2.907L7 12Z"
        />
    </Svg>
)
export default SparkleIcon
