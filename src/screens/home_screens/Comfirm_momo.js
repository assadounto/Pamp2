import React, { useState } from 'react';
import {Text, View, SafeAreaView, Image, Modal, TextInput,StyleSheet} from 'react-native';
import {styles, colors} from '../../Common_styles';
import {CheckBox, Button} from '@rneui/base';
import {Border, FontFamily} from '../../GlobalStyles';
import Lottie from 'lottie-react-native';
import axios from 'axios';
import Blur from '../start_screens/Blur';
import Pop from '../start_screens/pop';
import  { Paystack }  from 'react-native-paystack-webview';
import { useNavigation } from '@react-navigation/core';
import { useSelector } from 'react-redux';
import Success from './Sucess';
import { connect } from 'formik';
import { watchPosition } from 'react-native-geolocation-service';
import { backendURL } from '../../services/http';
const Processing = ({route}) => {
   const navigation=useNavigation()
   const booking= useSelector((state)=>state.booking)
    const { total,pay_type} = route.params;
    const [modalVisible, setModal] = React.useState(false);
    const [verificationResult, setVerificationResult] = React.useState(null);
   const [info,setinfo]= useState('Please approve payment and verify')
   const [success,setSucess]=useState(false)
   
   const formatDateForRails = (dateObj) => {
    const { day, month, year } = dateObj;
    
    // Convert month name to a numerical value
    const monthMap = {
      January: "01",
      February: "02",
      March: "03",
      April: "04",
      May: "05",
      June: "06",
      July: "07",
      August: "08",
      September: "09",
      October: "10",
      November: "11",
      December: "12"
    };
    
    // Format the date string in 'YYYY-MM-DD' format
    const formattedDate = `${year}-${monthMap[month]}-${day.toString().padStart(2, "0")}`;
    
    return formattedDate;
  };

  const formatTimeForRails = (timeString) => {
    const currentDate = new Date();
    const [hours, minutes, period] = timeString.split(/:|\s/); // Split the time string using a regular expression
  
    let hourValue = parseInt(hours, 10);
  
    if (period.toLowerCase() === 'pm' && hourValue !== 12) {
      hourValue += 12; // Convert the hour to 24-hour format for PM times
    } else if (period.toLowerCase() === 'am' && hourValue === 12) {
      hourValue = 0; // Convert 12 AM to 0 (midnight) in 24-hour format
    }
  
    currentDate.setHours(hourValue);
    currentDate.setMinutes(parseInt(minutes, 10));
  
    return currentDate.toISOString().slice(11, 19);
  };
  
  
  // Example usage:
  
  
    const createBooking=async (ref)=>{
      const {data}= await axios.post(`${backendURL}/booking`,
      {
        date: formatDateForRails(booking.actual_booking.date),
        time:  formatTimeForRails(booking.actual_booking.time),
        status: booking.actual_booking.status,
        service_ids: booking.actual_booking.services_id,
        user: booking.actual_booking.user,
        vendor: booking.actual_booking.vendor,
        payment_method: booking.actual_booking.payment_method,
        total: pay_type==='Pay with cash'? (total*0.2):total,
        ref: ref,
        others: booking.actual_booking.items,
        staff:  booking.actual_booking.staff
      }
      )
    }

    const nextpage=(ref)=>{
      createBooking(ref)
      navigation.navigate('Success')
    }
    return (
        <>
       
        {
          success? <Success /> :
          <SafeAreaView style={styles2.cont}>
          <Paystack  
        paystackKey="pk_test_e4bdcee80587746aabcc7b289634c04024d9dac5"
        amount={pay_type==='Pay with cash'? (total*0.2):total}
        currency={'GHS'}
        channels={pay_type==='Pay with cash'? ["mobile_money","card"]:pay_type=== 'Pay with card'? ["card"]:["mobile_money"]}
        billingEmail="adukyerer@gmail.com"
        activityIndicatorColor="green"
        onCancel={(e) => {
            navigation.navigate('main')
          // handle response here
        }}
        onSuccess={(res) => {
          // handle response here
          nextpage(res.data.transactionRef.reference)
        
         
        }}

      
        autoStart={true}
      />
       </SafeAreaView>
        }
          <Pop
          main={'Payment Received. Thank you'}
          modal={modalVisible}
        />
    

     
      {modalVisible && <Blur />}
      </>
  
  
)

};
const styles2 = StyleSheet.create({
   text: {
      textAlign:'center',
      fontFamily:FontFamily.sourceSansProSemibold,
      fontSize:18,
      marginBottom:100,
      width:'80%'
    },
    cont:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})
export default Processing

