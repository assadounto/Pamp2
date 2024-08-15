import * as React from "react"
import Svg, { Path } from "react-native-svg"
const File2 = (props) => (
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
            d="M14.5 19h-2c-2.829 0-4.243 0-5.122-.879C6.5 17.243 6.5 15.828 6.5 13V8c0-2.828 0-4.243.878-5.121C8.258 2 9.671 2 12.5 2h1.343c.818 0 1.226 0 1.594.152.367.152.656.442 1.234 1.02l2.657 2.656c.578.578.867.868 1.02 1.235.152.368.152.776.152 1.594V13c0 2.828 0 4.243-.879 5.121C18.743 19 17.328 19 14.5 19Z"
        />
        <Path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 2.5v1c0 1.886 0 2.828.586 3.414.585.586 1.528.586 3.414.586h1M6.5 5a3 3 0 0 0-3 3v8c0 2.828 0 4.243.878 5.121C5.257 22 6.671 22 9.5 22h5a3 3 0 0 0 3-3M10 11h4m-4 4h7"
        />
    </Svg>
)
export default File2
