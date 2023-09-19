import React from "react";
import { CheckBox,Text,Image } from "@rneui/base";
import { View } from "react-native-animatable";
import { styles,colors } from "../src/Common_styles";
import { setuser } from "../src/redux/user";
const CheckBoxComponent=({onPress,state,title,mark})=>{
    return(
        <CheckBox
        title={title}
        
        textStyle={{marginLeft:20, fontSize: 17,color:colors.lg.color}}
        uncheckedIcon={<Image
          resizeMode='contain'
          style={{width:33,height:33}}
            source={require('../assets/rectangle1063.png')}
             />}
        checkedIcon={
          <Image
          style={{width:33,height:33}}
          resizeMode='contain'
            source={require('../assets/group2210.png')}
             />
        }
        checked={state}
        onPress={onPress
        }
      />   
    )
}

export default CheckBoxComponent