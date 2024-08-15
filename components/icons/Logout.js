import * as React from "react"
import Svg, { Path } from "react-native-svg"
const LogoutIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={21}
        fill="none"
        {...props}
    >
        <Path
            stroke="#CD3D49"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16.189 7.047a15 15 0 0 1 2.654 2.556c.105.13.157.287.157.444m0 0a.704.704 0 0 1-.157.444 14.998 14.998 0 0 1-2.654 2.556m2.811-3H6m5-7.472A6 6 0 0 0 1 7.047v6a6 6 0 0 0 10 4.472"
        />
    </Svg>
)
export default LogoutIcon
