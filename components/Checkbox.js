import { useTheme } from '@rneui/themed';
import { makeStyles } from '@rneui/themed';
import React from "react";
import { CheckBox, Text, Image } from "@rneui/base";
import { View } from "react-native-animatable";
import { styles, colors } from "../src/Common_styles";
import { setuser } from "../src/redux/user";
import { verticalScale, horizontalScale, moderateScale } from "../src/Dimensions";
import { FontFamily } from '../GlobalStyles';
const CheckBoxComponent = ({ onPress, state, card = true, title, containerWidth = horizontalScale(200), mark, height = verticalScale(33), width = horizontalScale(33), color = colors.lg.color }) => {
  const { theme } = useTheme()
  return (
    <View
      style={{ width: containerWidth, }}
    >
      <CheckBox
        title={title}
       
        containerStyle={{ backgroundColor: card ? theme.colors.card : theme.colors.background }}
        textStyle={{borderRadius:5, marginLeft: horizontalScale(10), fontFamily:FontFamily.sourceSansProSemibold, fontSize: moderateScale(15), color: color }}
        uncheckedIcon={<View
          
          style={{ width, height,borderColor:theme.colors.tabColor,borderWidth:1,borderRadius:7 }}
          
        />}
        checkedIcon={
          <Image
            style={{ height, width }}
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