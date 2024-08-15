import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SurfIcon = (props) => (
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
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M10.053 6.507c3.28-3.28 8.308-4.665 10.886-4.493.363.025.544.037.777.27.233.232.245.414.27.777.172 2.578-1.212 7.606-4.493 10.886-3.047 3.047-7.678 5.952-10.683 7.701-.353.206-.53.309-.677.337a.883.883 0 0 1-.99-.57c-.05-.141-.05-.35-.05-.766 0-.397 0-.595-.043-.758a1.315 1.315 0 0 0-.941-.941c-.163-.043-.361-.043-.758-.043-.417 0-.625 0-.767-.05a.883.883 0 0 1-.569-.99c.028-.148.13-.324.336-.678 1.75-3.004 4.654-7.635 7.702-10.682Z"
        />
        <Path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M21 8c-3.59 6.134-10.602.453-15.5 4.5M7 17l1-1"
        />
    </Svg>
)
export default SurfIcon