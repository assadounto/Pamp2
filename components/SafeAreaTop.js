import { View } from "react-native-animatable";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const SafeAreaTop=({children,props})=>{
    const insets= useSafeAreaInsets()
    return(
        <View { ...props} style={{paddingTop:insets.top}}>
          {children}  
        </View>
    )

}

export default SafeAreaTop