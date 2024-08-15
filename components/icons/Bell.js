import * as React from "react"
import Svg, { Path } from "react-native-svg"
const BellIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={22}
        fill="none"
        {...props}
    >
        <Path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M7.387 17.385a62.795 62.795 0 0 1-3.94-.312 1.676 1.676 0 0 1-1.405-2.195c.171-.514.343-1.018.389-1.562l.374-4.496a7.608 7.608 0 0 1 15.163 0l.375 4.499c.045.543.217 1.048.387 1.56a1.675 1.675 0 0 1-1.404 2.194c-1.31.145-2.624.25-3.94.312m-6 0v.459a3 3 0 1 0 6 0v-.459m-6 0c2 .096 4.002.096 6 0"
        />
    </Svg>
)
export default BellIcon
