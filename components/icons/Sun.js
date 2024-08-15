import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SunIcon = (props) => (
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
            strokeWidth={2.5}
            d="M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
        />
        <Path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth={2.5}
            d="M12 2v1.5m0 17V22m7.07-2.929-1.06-1.06M5.99 5.989 4.928 4.93M22 12h-1.5m-17 0H2m17.071-7.071-1.06 1.06M5.99 18.011l-1.06 1.06"
        />
    </Svg>
)
export default SunIcon
