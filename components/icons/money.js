import * as React from "react"
import Svg, { Path } from "react-native-svg"
const MoneyIcon = (props) => (
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
            d="M12 19.5c-1.332.622-3.083 1-5 1-1.066 0-2.08-.117-3-.327-1.582-.363-2-1.293-2-2.787V6.614c0-.985 1.04-1.661 2-1.441.92.21 1.934.327 3 .327 1.917 0 3.668-.378 5-1 1.332-.622 3.083-1 5-1 1.066 0 2.08.117 3 .327 1.582.363 2 1.293 2 2.787v10.772c0 .985-1.04 1.661-2 1.441-.92-.21-1.934-.327-3-.327-1.917 0-3.668.378-5 1Z"
        />
        <Path
            stroke="currentColor"
            strokeWidth={2.5}
            d="M14.5 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
        />
        <Path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.5 13v.009M18.5 10.992v.01"
        />
    </Svg>
)
export default MoneyIcon
