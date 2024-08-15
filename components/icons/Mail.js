import * as React from "react"
import Svg, { Path } from "react-native-svg"
const MailIcon = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={16} {...props}>
        <Path
            fill="none"
            stroke={props.color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M18.41 3.209 15.4 5.552c-1.926 1.5-2.889 2.247-3.958 2.535a5.549 5.549 0 0 1-2.88 0C7.492 7.8 6.529 7.05 4.6 5.552L1.59 3.209m16.82 0a4.448 4.448 0 0 0-1.867-1.732C15.58 1 14.32 1 11.8 1H8.2c-2.52 0-3.78 0-4.743.477A4.448 4.448 0 0 0 1.59 3.209m16.82 0q.052.089.1.18C19 4.325 19 5.55 19 8s0 3.675-.49 4.611a4.44 4.44 0 0 1-1.967 1.912C15.58 15 14.32 15 11.8 15H8.2c-2.52 0-3.78 0-4.743-.477a4.44 4.44 0 0 1-1.967-1.912C1 11.675 1 10.45 1 8s0-3.675.49-4.611q.048-.091.1-.18"
        />
    </Svg>
)
export default MailIcon
