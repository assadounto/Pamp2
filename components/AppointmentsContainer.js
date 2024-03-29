import { nanoid } from "@reduxjs/toolkit";
import { da } from "date-fns/locale";
import * as React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { FontFamily, Color, FontSize, Border } from '../src/GlobalStyles'
import FastImage from "react-native-fast-image";
import AppJob from "./AppJob";
import { colors } from "../src/Common_styles";
const AppointmentsContainer = ({navigation,data}) => {
  const [info,setInfo]= React.useState()
  function formatServiceNames(services) {
    const maxLength = 25; // Maximum length of the final formatted string
    const names = services.map(service => service.name);
    let formattedString = names.join(" & ");
 
    if (formattedString.length > maxLength) {
      formattedString = formattedString.substring(0, maxLength - 3) + "...";
    }
  
    return formattedString;
  }
  
  // Example usage:
  const services = [
    {
      id: 1,
      name: "Dread",
      time: 60,
      appointment_color: null,
      service_for: null,
      price: 20,
      service_category_id: 1,
      created_at: "2023-06-22T11:54:24.168Z",
      updated_at: "2023-06-22T11:54:24.168Z"
    },
    {
      id: 3,
      name: "Rail",
      time: 68,
      appointment_color: null,
      service_for: null,
      price: 20,
      service_category_id: 2,
      created_at: "2023-06-22T11:55:17.048Z",
      updated_at: "2023-06-22T11:55:17.048Z"
    }
  ];
  
  const formattedServices = formatServiceNames(services);
  console.log(formattedServices); // Output: "Dread & Rail"
  
const bgc={
  cancelled: 'red',
  confirmed: colors.lg.color,
  booked: colors.dg.color
}

const c={
  cancelled: 'white',
  confirmed: 'white',
  booked: 'white'
}

 function formatTime(timeString) {
    const date = new Date(timeString);
    const formattedTime = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    return formattedTime;
  }

  function formatDate(dateString) {
    const dateParts = dateString.split("-");
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const day = parseInt(dateParts[2]);
  
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
  
    const formattedDate = `${day} ${months[month - 1]} ${year}`;
    return formattedDate;
  }
  return (
    <Pressable onPress={()=>navigation.navigate('Booking_detail',{
      data
    })}  style={[styles.path636Parent]}>
       <AppJob setInfo={setInfo} services={data.services} time={data.time}/>

          <FastImage
        style={[styles.groupChild, styles.groupChildPosition]}
  
            source={{
              uri: data.vendor.cover,
              headers: { Authorization: 'someAuthToken' },
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover} />

<FastImage
        style={[styles.groupItem, styles.groupItemPosition]}
  
            source={{
              uri:data.vendor.logo,
              headers: { Authorization: 'someAuthToken' },
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover} />
      <Text style={[styles.likkleSalon, styles.totalFlexBox]}>
      {data.vendor.username}
      </Text>
      <Text style={[styles.sewIn, styles.sewInTypo]}>{formatServiceNames(data.items)}</Text>
      <Text style={[styles.total, styles.sewInPosition]}>Total</Text>
      <Text style={[styles.am10am, styles.sewInPosition1]}>{formatTime(data.time)}</Text>
      <Text style={[styles.text, styles.textTypo]}>¢{data.total}</Text>
      <Text style={[styles.july2022, styles.textTypo]}>{formatDate(data.date)}</Text>
      <View style={[styles.groupInner, styles.lineViewBorder]} />
      <View style={[styles.lineView, styles.lineViewBorder]} />
      <View style={[styles.bookedWrapper, info ? {backgroundColor: info.color}: {backgroundColor: bgc[data.status]}, styles.groupItemPosition]}>
        <Text style={[styles.booked, info  ? {color: 'white'} : {color:c[data.status]}, styles.sewInTypo]}>{info ? info.status : data.status}</Text>
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
    borderRadius:50,
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

    borderRadius:20,
     paddingHorizontal:10,
    fontSize: FontSize.size_2xs,
   // color: colors.dg.color,
    textAlign: "center",
    
    
    fontWeight: "600",
  },
  bookedWrapper: {
    marginTop: 8.99,
    right: 29,
    borderRadius:20,
    //backgroundColor: Color.darkslategray_200,
    width: 80,
  
    height: 21,
    top: "50%",
  },
  path636Parent: {
    shadowColor:'#707070',shadowOpacity:0.3,shadowRadius: 10,shadowOffset:{width:5,height:0},elevation:4,  
    height: 424,
    marginBottom: 20.63,
    alignSelf: "center",
    backgroundColor:'white',
    width:'90%',
  
    borderRadius:20,
 
  },
});

export default AppointmentsContainer;
