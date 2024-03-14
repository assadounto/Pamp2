import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import { horizontalScale, moderateScale, verticalScale } from "../src/Dimensions";
import { colors } from "../src/Common_styles";
import { Button } from "@rneui/base";
import { useDispatch } from "react-redux";
import { setNextNav } from "../src/redux/user";

import { useNavigation } from "@react-navigation/core";
const EmptyAppoiment = ({showBtn, sub="You don't have upcoming schedules.",col,mt}) => {
  const navigation= useNavigation()
  const dispatch= useDispatch()
  return (
    <View style={styles.component44}>
      <Image
        style={styles.component44Child}
        resizeMode="contain"
        source={require("../assets/group-2142.png")}
      />
      <Text style={[styles.noAppointments, styles.youDontHaveTypo]}>
        No appointments
      </Text>
      <Text style={[styles.youDontHave, styles.youDontHaveTypo,{color: col ?col:colors.dg.color,marginTop:mt?mt:null,fontFamily: FontFamily.sourceSansProRegular},]}>
        {sub}
      </Text>
      {showBtn&& <Button
           titleStyle={{fontSize:moderateScale(14),fontFamily:FontFamily.sourceSansProBold,color:colors.dg2.color}}
            title={'Log in or sign up'}
           
            // containerStyle={}
            buttonStyle={{

              width: horizontalScale(184),
              height: verticalScale(45),
              //margin: 'auto',

              marginBottom: 20,
              marginTop: 20,
              alignSelf: 'center',
              borderRadius: 40,
              borderColor:colors.dg2.color,
              borderWidth:2,
              
              backgroundColor: colors.w.color,
            }}
            onPress={()=>{
              dispatch(setNextNav('Favourites'))
              navigation.navigate('login')
            }
              
            }
             />}
    </View>
  );
};

const styles = StyleSheet.create({
  youDontHaveTypo: {
    textAlign: "center",
    color: colors.dg.color

  },
  component44Child: {
    height: verticalScale(200),
    width: "60.83%",

alignSelf:'center',

    overflow: "hidden",
    maxHeight: "100%",

  },
  noAppointments: {
    marginTop: verticalScale(20),
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.sourceSansProBold
  },
  youDontHave: {

    left: "0%",
    fontSize: FontSize.size_lg,

  },
  component44: {
    
marginTop: verticalScale(30),
    width: '80%',
    alignSelf:'center',
    height: verticalScale(296),
   
  },
});

export default EmptyAppoiment;
