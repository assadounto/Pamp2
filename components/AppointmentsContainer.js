import { useTheme } from '@rneui/themed';
import { makeStyles } from '@rneui/themed';
import { nanoid } from "@reduxjs/toolkit";
import { da } from "date-fns/locale";
import * as React from "react";
import { useDispatch, useSelector } from 'react-redux';

import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { FontFamily, Color, FontSize, Border } from '../src/GlobalStyles'
import FastImage from "react-native-fast-image";
import AppJob from "./AppJob";
import { colors } from "../src/Common_styles";
import ImageCont from "./Image";
import VerifiedIcon from './icons/Verified';
const AppointmentsContainer = ({ navigation, data }) => {
  const location = useSelector(state => state.user.location)

  const [info, setInfo] = React.useState()
  function formatServiceNames(services) {
    const maxLength = 25; // Maximum length of the final formatted string
    const names = services.filter((serv) => serv.items_name != '').map(service => service.items_name);
    let formattedString = names.join(" & ");

    if (formattedString.length > maxLength) {
      formattedString = formattedString.substring(0, maxLength - 3) + "...";
    }

    return formattedString;
  }

  function capitalizeFirstLetter(str) {
    if (typeof str !== 'string') {
      throw new Error('Input must be a string');
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
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

  const { theme } = useTheme();

  const statuses = ['declined', "rebooked", "completed", "cancelled", "confirmed", "no show", "booked", "unconfirmed", "pending"]



  const bgc = {
    cancelled: '#CD3D49',
    completed: theme.colors.lgb,
    confirmed: "#03989E",
    booked: '#00463C',
    rebooked: "#00463C",
    declined: '#CD3D49',
    "no show": '#CD3D49',
    unconfirmed: "#00463C",
    pending: data?.services[0] ? data?.services[0].color : 'red'
  }

  const c = {
    declined: 'white',
    cancelled: 'white',
    confirmed: 'white',
    completed: 'white',
    booked: 'white',
    "no show": 'white',
    pending: 'white',
    unconfirmed: 'white',
    rebooked: 'white',
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
  const styles = useStyles();
console.log(data.vendor)
  return (
    <Pressable onPress={() => navigation.navigate('Booking_detail', {
      id: data.id
    })} style={[styles.path636Parent]}>
      <AppJob setInfo={setInfo} vendor={data.vendor} services={data.services} time={data.time} />
      <ImageCont booking styles={[styles.groupChild, styles.groupChildPosition]} uri={data.vendor.cover} />
      <FastImage
        style={[styles.groupItem, styles.groupItemPosition]}

        source={{
          uri: data.vendor.logo,
          headers: { Authorization: 'someAuthToken' },
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View style={[styles.totalFlexBox,]}>
        <View style={[styles.likkleSalon,{gap:5,display:'flex',alignItems:'center', flexDirection:'row'}]}>
          <Text  style={styles.likkleSalonText}>{data.vendor.username}</Text> 
          {data.vendor.verified && <View>
            <VerifiedIcon color={theme.colors.lg} />
          </View>}
        </View>
        
      </View>

      <Text style={[styles.sewIn, styles.sewInTypo]}>{formatServiceNames(data.items)}</Text>
      <Text style={[styles.total, styles.sewInPosition]}>Total</Text>
      <Text style={[styles.am10am, styles.sewInPosition1]}>{(formatTime(data.time)).toLocaleLowerCase()}</Text>
      <Text style={[styles.text, styles.textTypo]}>{location.currency || "₵"}{parseFloat(data.total).toFixed(2)}</Text>
      <Text style={[styles.july2022, styles.textTypo]}>{formatDate(data.date)}</Text>
      <View style={[styles.groupInner, styles.lineViewBorder]} />
      <View style={[styles.lineView, styles.lineViewBorder]} />
      <View style={[styles.bookedWrapper, statuses.includes(data.status) ? { backgroundColor: bgc[data.status] } : { backgroundColor: info?.color }, styles.groupItemPosition]}>
        <Text style={[styles.booked, info ? { color: 'white' } : { color: c[data.status] }, styles.sewInTypo]}>{statuses.includes(data.status) ? capitalizeFirstLetter(data.status) : info && capitalizeFirstLetter(info.status)}</Text>
      </View>
    </Pressable>
  );
};

const useStyles = makeStyles((theme) => ({
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
    left: 60,
    top: "50%",
    display:'flex',
   
  },
  verify: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center'
  },
  sewInTypo: {
    fontFamily: FontFamily.sourceSansProSemibold,
    fontWeight: "600",
  },
  sewInPosition: {
    left: 25,
    color: theme.colors.dg,
  },
  sewInPosition1: {
    marginTop: 90.99,
    textAlign: "left",
    fontSize: 18,
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
    borderColor: theme.colors.tabColor,
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    height: 201,
  },
  groupItem: {
    marginTop: 32.99,
    left: 20,
    width: 34,
    height: 34,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: theme.colors.ring,
    top: "50%",
  },
  likkleSalon: {
    marginTop: 35.99,
   
   

  },
  likkleSalonText:{
    color: theme.colors.dg,
    textAlign: "left",
    fontFamily: FontFamily.sourceSansProSemibold,
    fontSize: 17,
    maxWidth:150
    
  },
  sewIn: {
    left: 25,
    width: 200,
    color: theme.colors.dg,
    marginTop: 90.99,
    textAlign: "left",
    fontSize: 18,
    top: "50%",
    position: "absolute",
  },
  total: {
    bottom: 31,
    textAlign: "left",
    position: "absolute",
    fontFamily: FontFamily.sourceSansProRegular,
    fontSize: 18,
    left: 25,
  },
  am10am: {
    right: 28,
    color: theme.colors.othergreen,
    fontFamily: FontFamily.sourceSansProRegular,
  },
  text: {
    right: 27,
    bottom: 30,
    fontWeight: "700",
    fontFamily: FontFamily.sourceSansProBold,
    color: theme.colors.lg,
  },
  july2022: {
    marginTop: 0.99,
    fontFamily: FontFamily.sourceSansProSemibold,
    fontWeight: "600",
    left: 25,
    color: theme.colors.dg,
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

    borderRadius: 20,

    fontSize: FontSize.size_2xs,
    // color: theme.colors.dg,
    textAlign: "center",


    fontWeight: "600",
  },
  bookedWrapper: {

    right: 29,
    paddingHorizontal: 10,
    borderRadius: 28,
    //backgroundColor: Color.darkslategray_200,


    height: 21,
    top: "50%",
  },
  path636Parent: {
    elevation: 3,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 }, height: 424,
    marginBottom: 20.63,
    alignSelf: "center",
    backgroundColor: theme.colors.card,
    width: '90%',

    borderRadius: 20,

  },
}));

export default AppointmentsContainer;




