import * as React from "react"
import Svg, { Path } from "react-native-svg"
const CompletedIcon = (props) => (
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
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 2v3M7 2v3M13 3.5h-2c-3.771 0-5.657 0-6.828 1.172C3 5.843 3 7.729 3 11.5V14c0 3.771 0 5.657 1.172 6.828C5.343 22 7.229 22 11 22h2c3.771 0 5.657 0 6.828-1.172C21 19.657 21 17.771 21 14v-2.5c0-3.771 0-5.657-1.172-6.828C18.657 3.5 16.771 3.5 13 3.5ZM3.5 8.5h17"
        />
        <Path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 15.5s1.5.5 2 2c0 0 2.177-4 5-5"
        />
    </Svg>
)
export default CompletedIcon
