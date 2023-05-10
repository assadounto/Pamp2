import { nanoid } from "@reduxjs/toolkit";
import * as React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { FontFamily, Color, FontSize, Border } from '../src/GlobalStyles'

const AppointmentsContainer = ({navigation}) => {
  return (
    <Pressable onPress={()=>navigation.navigate('Booking_detail')}  style={[styles.path636Parent]}>
      <Image
      
        style={[styles.groupChild, styles.groupChildPosition]}
        resizeMode="cover"
       source={require("../assets/rectangle-9764.png")}
      />
      <Image
        style={[styles.groupItem, styles.groupItemPosition]}
        resizeMode="cover"
        source={require("../assets/group-1799.png")}
      />
      <Text style={[styles.likkleSalon, styles.totalFlexBox]}>
        Likkle salon
      </Text>
      <Text style={[styles.sewIn, styles.sewInTypo]}>{`Sew in & Haircut`}</Text>
      <Text style={[styles.total, styles.sewInPosition]}>Total</Text>
      <Text style={[styles.am10am, styles.sewInPosition1]}>9am - 10am</Text>
      <Text style={[styles.text, styles.textTypo]}>¢200</Text>
      <Text style={[styles.july2022, styles.textTypo]}>14 July 2022</Text>
      <View style={[styles.groupInner, styles.lineViewBorder]} />
      <View style={[styles.lineView, styles.lineViewBorder]} />
      <View style={[styles.bookedWrapper, styles.groupItemPosition]}>
        <Text style={[styles.booked, styles.sewInTypo]}>Booked</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  groupChildPosition: {
    overflow: "hidden",
    maxWidth: "100%",
    left: 0,
    top: 0,
    position: "absolute",
 
  },
  groupItemPosition: {
    position: "absolute",
    top: "50%",
  },
  totalFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  sewInTypo: {
    fontFamily: FontFamily.sourceSansProSemibold,
    fontWeight: "600",
  },
  sewInPosition: {
    left: 25,
    color: Color.darkslategray_200,
  },
  sewInPosition1: {
    marginTop: 90.99,
    textAlign: "left",
    fontSize: FontSize.size_mid,
    top: "50%",
    position: "absolute",
  },
  textTypo: {
    fontSize: FontSize.size_xl,
    textAlign: "left",
    position: "absolute",
  },
  lineViewBorder: {
    height: 2,
    borderTopWidth: 1,
    borderColor: "#b0ebbd",
    borderStyle: "solid",
    position: "absolute",
  },
  path636Icon: {
    right: -195,
    bottom: -195,
    maxHeight: "100%",
  },
  groupChild: {
    right: 0,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
     width:'100%',
    height: 201,
  },
  groupItem: {
    marginTop: 32.99,
    left: 20,
    width: 34,
    height: 34,
    top: "50%",
  
  },
  likkleSalon: {
    marginTop: 38.99,
    marginLeft: -116.5,
    color: Color.darkslategray_200,
    textAlign: "left",
    fontFamily: FontFamily.sourceSansProRegular,
    fontSize: FontSize.size_mid,
    left: "50%",
    top: "50%",
  },
  sewIn: {
    left: 25,
    color: Color.darkslategray_200,
    marginTop: 90.99,
    textAlign: "left",
    fontSize: FontSize.size_mid,
    top: "50%",
    position: "absolute",
  },
  total: {
    bottom: 31,
    textAlign: "left",
    position: "absolute",
    fontFamily: FontFamily.sourceSansProRegular,
    fontSize: FontSize.size_mid,
    left: 25,
  },
  am10am: {
    right: 28,
    color: Color.lightgreen,
    fontFamily: FontFamily.sourceSansProRegular,
  },
  text: {
    right: 27,
    bottom: 30,
    fontWeight: "700",
    fontFamily: FontFamily.sourceSansProBold,
    color: Color.lightgreen,
  },
  july2022: {
    marginTop: 0.99,
    fontFamily: FontFamily.sourceSansProSemibold,
    fontWeight: "600",
    left: 25,
    color: Color.darkslategray_200,
    top: "50%",
  },
  groupInner: {
    marginTop: 74.99,
    right: 19,
    left: 15,
    top: "50%",
  },
  lineView: {
    right: 16,
    bottom: 76,
    left: 18,
  },
  booked: {
    marginLeft: -19,
    borderRadius:20,
    top: 3,
    fontSize: FontSize.size_2xs,
    color: Color.white,
    textAlign: "left",
    position: "absolute",
    left: "50%",
    fontWeight: "600",
  },
  bookedWrapper: {
    marginTop: 8.99,
    right: 29,
    borderRadius:20,
    backgroundColor: Color.darkslategray_200,
    width: 62,
    height: 21,
    top: "50%",
  },
  path636Parent: {
    shadowColor:'#707070',shadowOpacity:0.3,shadowRadius: 10,shadowOffset:{width:5,height:0},elevation:4,  
    height: 424,
    marginTop: 55.63,
    alignSelf: "center",
    backgroundColor:'white',
    width:'90%',
    marginRight:10,
    borderRadius:20,
    marginBottom:200
  },
});

export default AppointmentsContainer;
