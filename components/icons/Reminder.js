import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
const ReminderIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        color="#000"
        {...props}
    >
        <Circle
            cx={12}
            cy={13}
            r={9}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth={2.5}
        />
        <Path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m5 19-2 2m16-2 2 2"
        />
        <Path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth={1.5}
            d="m19 3.57.596-.298c.845-.423 1.162-.374 1.834.298.672.672.72.99.298 1.834L21.43 6M5 3.57l-.596-.298c-.845-.423-1.162-.374-1.834.298-.672.672-.72.99-.298 1.834L2.57 6"
        />
        <Path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9.5v4l2 2M12 3.5V2M10 2h4"
        />
    </Svg>
)
export default ReminderIcon
