import * as React from "react"
import Svg, { Path } from "react-native-svg"
const CardIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={19}
        fill="none"
        {...props}
    >
        <Path
            stroke={props.color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 6.844H1m16 4h-3m-6.6 7h7.2c2.24 0 3.36 0 4.216-.436a4 4 0 0 0 1.748-1.748c.436-.856.436-1.976.436-4.216v-3.2c0-2.24 0-3.36-.436-4.216a4 4 0 0 0-1.748-1.748c-.856-.436-1.976-.436-4.216-.436H7.4c-2.24 0-3.36 0-4.216.436a4 4 0 0 0-1.748 1.748C1 4.883 1 6.004 1 8.244v3.2c0 2.24 0 3.36.436 4.216a4 4 0 0 0 1.748 1.748c.856.436 1.976.436 4.216.436Z"
        />
    </Svg>
)
export default CardIcon
