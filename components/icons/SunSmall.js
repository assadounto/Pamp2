import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"
const SunSmallIcon = (props) => (

    <Svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} {...props}>
        <G data-name="Group 2545" transform="translate(-4094 20255)">
            <Circle
                cx={11}
                cy={11}
                r={11}
                fill={props.fill}
                data-name="Ellipse 206"
                transform="translate(4094 -20255)"
            />
            <G fill="none" stroke="#86d694" data-name="Group 2544">
                <Path
                    d="M4107.973-20243.999a2.973 2.973 0 1 1-2.972-2.973 2.973 2.973 0 0 1 2.972 2.973Z"
                    data-name="Path 3766"
                />
                <Path
                    strokeLinecap="round"
                    d="M4105-20249.945a.749.749 0 0 0 0 1.189m0 9.512a.749.749 0 0 1 0 1.189m4.455-10.402a.792.792 0 0 0-.889.889m-7.433 6.838a.792.792 0 0 1-.889.889m.6-8.618a.793.793 0 0 0 .89.89m6.837 6.84a.775.775 0 0 1 .889.841m1.485-4.112a.749.749 0 0 0-1.189 0m-9.512-.3a.749.749 0 0 1-1.189.003"
                    data-name="Path 3767"
                />
            </G>
        </G>
    </Svg>
)
export default SunSmallIcon
