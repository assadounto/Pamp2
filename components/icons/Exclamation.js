import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
const ExclamationIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={16.75}
        height={16.75}
        {...props}
    >
        <G fill="none" stroke="#bbb9bc" data-name="Group 2456">
            <Path
                strokeWidth={1.5}
                d="M15 7.875A7.125 7.125 0 1 0 7.875 15 7.125 7.125 0 0 0 15 7.875Z"
                data-name="Path 3719"
            />
            <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8.048 11.437V7.875c0-.336 0-.5-.1-.608s-.272-.1-.608-.1"
                data-name="Path 3720"
            />
            <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7.869 5.025h.008"
                data-name="Path 3721"
            />
        </G>
    </Svg>
)
export default ExclamationIcon
