import * as React from "react"
import Svg, { Path } from "react-native-svg"
const UsedIcon = (props) => (
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
            d="M11.05 22c-4.03 0-6.046 0-7.298-1.354C2.5 19.293 2.5 17.114 2.5 12.756v-.513c0-4.357 0-6.536 1.252-7.89C5.004 3 7.02 3 11.05 3h1.9c4.03 0 6.046 0 7.298 1.354 1.179 1.274 1.248 3.28 1.252 7.146V13M21 18.5h-8m8 0c0 .7-1.994 2.009-2.5 2.5m2.5-2.5c0-.7-1.994-2.009-2.5-2.5M18 2v2M6 2v2M3 8h18"
        />
    </Svg>
)
export default UsedIcon 
