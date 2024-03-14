import React from "react";
import { CheckBox,Text,Image } from "@rneui/base";
import { View } from "react-native-animatable";
import { styles,colors } from "../src/Common_styles";
import { setuser } from "../src/redux/user";
import { verticalScale,horizontalScale,moderateScale } from "../src/Dimensions";
const CheckBoxComponent=({onPress,state,title,containerWidth=horizontalScale(200),mark,height=verticalScale(33), width=horizontalScale(33),color=colors.lg.color})=>{
    return(
      <View 
      style={{width: containerWidth}}
      >
        <CheckBox
        title={title}
        
        textStyle={{marginLeft:horizontalScale(10),fontWeight:'normal', fontSize: moderateScale(15),color:color}}
        uncheckedIcon={<Image
          resizeMode='contain'
          style={{width,height}}
            source={require('../assets/rectangle1063.png')}
             />}
        checkedIcon={
          <Image
          style={{height,width}}
          resizeMode='contain'
            source={require('../assets/group2210.png')}
             />
        }
        checked={state}
        onPress={onPress
        }
      />  
      </View> 
    )
}

export default CheckBoxComponent