import * as React from "react";
import { StyleSheet, View, Pressable, Text, Image } from "react-native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { horizontalScale, verticalScale } from "../src/Dimensions";
const SucessPop = () => {
    const name = useSelector((state) => state.booking.vendor_name);
    const navigation =useNavigation()
  return (
    <View style={styles.component48}>
      <View style={styles.component48Child} />
      
      <Image
        style={styles.path650Icon}
        resizeMode="contain"
        source={require("../assets/path-650.png")}
      />
      <Text style={[styles.success]}>Success</Text>
      <Text
        style={[styles.youHaveSuccessfully]}
      >{`You have successfully booked 
an appointment with ${name}.`}</Text>
<Pressable onPress={()=>navigation.push('main')}  style={styles.backToHomeWrapper}>
        <Text style={styles.backToHome}>Back to Home</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  successFlexBox: {
    textAlign: "center",
    position: "absolute",
  },
  component48Child: {
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: Border.br_xl,
    backgroundColor: Color.white,
    position: "absolute",
  },
  backToHome: {
   textAlignVertical:'center',
  alignSelf:'center',
    fontSize: FontSize.size_mini,
    fontWeight: "700",
    fontFamily: FontFamily.sourceSansProBold,
    color: Color.white,
    
  },
  backToHomeWrapper: {
    height: "11.98%",
    width: "53.8%",
    alignContent:'center',
   marginTop:40,
   justifyContent:'center',
  alignSelf:'center',

    borderRadius: Border.br_4xl,
    backgroundColor: Color.lightgreen,
  
  },
  path650Icon: {
    height: verticalScale(50),
    width: horizontalScale(40),
    alignSelf:'center',

    marginTop:verticalScale(30)
   
  },
  success: {
  textAlign:'center',
    fontSize: 25,
    lineHeight: 38,
    marginVertical:verticalScale(50),
    fontWeight: "600",
    fontFamily: FontFamily.sourceSansProSemibold,
    color: '#00463C',
  },
  youHaveSuccessfully: {
   
    textAlign:'center',
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.sourceSansProRegular,
    color: Color.lightgreen,
  },
  component48: {
    top: '30%',
    width: horizontalScale(342),
  height: verticalScale(400),
    position: "absolute",
    alignSelf:'center',
    
  },
});

export default SucessPop;
