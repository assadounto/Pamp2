import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
const BankIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={16.82}
        height={17.41}
        {...props}
    >
        <G
            fill="none"
            stroke="#b0ebbd"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            data-name="Group 2167"
        >
            <Path d="m15.41 7.41-7-6" data-name="Line 131" />
            <Path d="M14.41 16.41h-12" data-name="Line 137" />
            <Path d="M6.41 16.41v-6" data-name="Line 133" />
            <Path d="M2.41 16.41v-8" data-name="Line 134" />
            <Path d="M10.41 16.41v-6" data-name="Line 135" />
            <Path d="M14.41 16.41v-8" data-name="Line 136" />
            <Path d="m1.41 7.41 7-6" data-name="Line 132" />
        </G>
    </Svg>
)
export default BankIcon
