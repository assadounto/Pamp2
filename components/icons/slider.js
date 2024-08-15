import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SliderIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        color="#000"
        {...props}
    >
        <Path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth={2.5}
            d="M5 20v-6M5 11V4M9 8h6M2 14h6M16 12h6M12 8V4M12 20v-9M19 12V4M19 20v-5"
        />
    </Svg>
)
export default SliderIcon
