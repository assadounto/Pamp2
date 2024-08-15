import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Filter = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill='none'
        {...props}
    >
        <Path
            stroke={props.color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7h7m0 0a3 3 0 0 0 3 3h1a3 3 0 1 0 0-6h-1a3 3 0 0 0-3 3Zm6 10h5M20 7h1M3 17h3m0 0a3 3 0 0 0 3 3h1a3 3 0 1 0 0-6H9a3 3 0 0 0-3 3Z"
        />
    </Svg>
)
export default Filter
