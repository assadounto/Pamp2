import * as React from "react";
import { StyleSheet, View, Pressable, Text, Image } from "react-native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
const SucessPop = () => {
    const name = useSelector((state) => state.booking.vendor_name);
    const navigation =useNavigation()
  return (
    <View style={styles.component48}>
      <View style={styles.component48Child} />
      <Pressable onPress={()=>navigation.navigate('main')}  style={styles.backToHomeWrapper}>
        <Text style={styles.backToHome}>Back to Home</Text>
      </Pressable>
      <Image
        style={styles.path650Icon}
        resizeMode="cover"
        source={require("../assets/path-650.png")}
      />
      <Text style={[styles.success, styles.successFlexBox]}>Success</Text>
      <Text
        style={[styles.youHaveSuccessfully, styles.successFlexBox]}
      >{`You have successfully booked 
an appointment with ${name}.`}</Text>
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
    top: 17,
    left: 47,
    fontSize: FontSize.size_mini,
    fontWeight: "700",
    fontFamily: FontFamily.sourceSansProBold,
    color: Color.white,
    textAlign: "left",
    position: "absolute",
  },
  backToHomeWrapper: {
    height: "11.98%",
    width: "53.8%",
    top: "78.34%",
    right: "25.44%",
    bottom: "9.68%",
    left: "20.76%",
    borderRadius: Border.br_4xl,
    backgroundColor: Color.lightgreen,
    position: "absolute",
  },
  path650Icon: {
    height: "7.68%",
    width: "13.4%",
    top: "8.22%",
    right: "43.3%",
    bottom: "84.1%",
    left: "43.3%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
    position: "absolute",
  },
  success: {
    top: "31.11%",
    left: "35.43%",
    
    fontSize: 25,
    lineHeight: 38,
    fontWeight: "600",
    fontFamily: FontFamily.sourceSansProSemibold,
    color: '#00463C',
  },
  youHaveSuccessfully: {
    top: "55.99%",
    left: "16.82%",
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.sourceSansProRegular,
    color: Color.lightgreen,
  },
  component48: {
    top: 231,
    width: 342,
    height: 434,
    position: "absolute",
    alignSelf:'center',
    
  },
});

export default SucessPop;
