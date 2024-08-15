import { Icon } from "@rneui/base";
import React from "react";
import { useTheme } from "@rneui/themed";
import { Alert, Pressable } from "react-native";
import { Text, View } from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontFamily } from "../GlobalStyles";
import { colors } from "../src/Common_styles";

const Filters=({onPress1,onPress2,value1,value2})=>{
    const { theme } = useTheme()
    return(
        <View style={{gap:5, top:20, display:'flex',flexDirection:'row', right: 20, position:'absolute'}}>
        <Pressable onPress={onPress1} style={{ paddingHorizontal:10, height:25, alignItems:'center',display:'flex',flexDirection:'row', borderRadius:20,borderWidth:0.5,borderColor:theme.colors.othergreen}}>
                <Text style={{ fontFamily: FontFamily.sourceSansProSemibold, color: theme.colors.dg,fontSize:10}}>{value1}</Text>
            <Icon size={14} color={theme.colors.dg} name="chevron-down" type="feather"/>
        </Pressable>
        {
            value2 &&
            <TouchableOpacity onPress={onPress2} style={{ paddingHorizontal:10, height:25, alignItems:'center',display:'flex',flexDirection:'row', borderRadius:20,borderWidth:0.5,borderColor:theme.colors.othergreen}}>
                        <Text style={{ fontFamily: FontFamily.sourceSansProSemibold, color: theme.colors.dg,fontSize:10}}>{value2}</Text>
                        <Icon size={14} color={theme.colors.dg} name="chevron-down" type="feather"/>
           </TouchableOpacity>
        }
        
        </View>
    )
}

export default Filters