import { makeStyles } from '@rneui/themed';
import { useTheme } from '@rneui/themed';
import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, Image, Modal, TextInput, StyleSheet, Alert } from 'react-native';
import { styles, colors } from '../../Common_styles';
import { CheckBox, Button } from '@rneui/base';
import { Border, FontFamily } from '../../GlobalStyles';
import Lottie from 'lottie-react-native';
import axios from 'axios';
import Blur from '../start_screens/Blur';
import Pop from '../start_screens/pop';
import { Paystack } from 'react-native-paystack-webview';
import { useNavigation } from '@react-navigation/core';
import { useSelector } from 'react-redux';
import Success from './Sucess';
import { connect } from 'formik';
import { watchPosition } from 'react-native-geolocation-service';
import { backendURL } from '../../services/http';
import uuid from 'react-native-uuid';


const Processing = ({ route }) => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.userInfo);
  const booking = useSelector((state) => state.booking);
  const { total, pay_type, amount_paid } = route.params;

  const [modalVisible, setModal] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [info, setinfo] = useState('Please approve payment and verify');
  const [success, setSucess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => {
    const ref = generateReference();
    setBookingRef(ref);
    createBooking(ref);
    
  }, []);

  const generateReference = () => {
    const refuuid = uuid.v4();
    let ref;
    ref = `BOOK-${refuuid}`;
    return ref;
  };

  const formatDateForRails = (dateObj) => {
    const { day, month, year } = dateObj;

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

    const formattedDate = `${year}-${monthMap[month]}-${day.toString().padStart(2, "0")}`;
    return formattedDate;
  };

  const formatTimeForRails = (timeString) => {
    const currentDate = new Date();
    const [hours, minutes, period] = timeString.split(/:|\s/);

    let hourValue = parseInt(hours, 10);

    if (period.toLowerCase() === 'pm' && hourValue !== 12) {
      hourValue += 12;
    } else if (period.toLowerCase() === 'am' && hourValue === 12) {
      hourValue = 0;
    }

    currentDate.setHours(hourValue);
    currentDate.setMinutes(parseInt(minutes, 10));

    return currentDate.toISOString().slice(11, 19);
  };

  const deleteBooking=async()=>{
    await axios.delete(`${backendURL}/booking/${bookingRef}/${user.id}`)
  }

  const createBooking = async (ref) => {
    const { data } = await axios.post(`${backendURL}/booking`,
      {
        date: booking.actual_booking.date,
        time: formatTimeForRails(booking.actual_booking.time),
        status: booking.actual_booking.status,
        service_ids: booking.actual_booking.services_id,
        user: booking.actual_booking.user,
        vendor: booking.actual_booking.vendor,
        payment_method: booking.actual_booking.payment_method,
        total: total,
        ref: ref,
        booking_fee: booking.actual_booking.booking_fee,
        others: booking.actual_booking.items,
        staff: booking.actual_booking.staff,
        total_min: booking.actual_booking.total_mins,
        coupon_id: booking.actual_booking.coupon_id,
        amount_paid: amount_paid
      }
    );
  };
  const payable = parseFloat(amount_paid) + parseFloat(booking.actual_booking.booking_fee)
  const channels = (name) => {
    let channel = [];
    switch (name) {
      case "Pay with cash":
        channel.push('mobile_money', 'card');
        break;
      case 'Pay with card':
        channel.push('card');
        break;
      case 'Pay with momo':
        channel.push('mobile_money');
        break;
    }
    return channel;
  };
  const nextpage = (ref) => {
    navigation.navigate('Success');
  };
  const { theme } = useTheme();
  const styles = useStyles();
console.log(payable,'payablw')
  return (
    <>
      {
        success ? <Success /> :
          <SafeAreaView style={styles.cont}>
            <Paystack
              paystackKey="pk_live_cac01fe0c36e8e38e53f9dcae4a3a405fed0e7d1"
              amount={payable}
              currency={'GHS'}
              refNumber={bookingRef}
              channels={channels(pay_type)}
              billingEmail={user.email}
              activityIndicatorColor="green"
              onCancel={(e) => {
               console.log(bookingRef)
                deleteBooking()
                
               navigation.navigate('main');
              }}
              onSuccess={(res) => {
                nextpage(res.data.transactionRef.reference);
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
  );
};

const useStyles = makeStyles((theme) => ({
  text: {
    textAlign: 'center',
    fontFamily: FontFamily.sourceSansProSemibold,
    fontSize: 18,
    marginBottom: 100,
    width: '80%'
  },
  cont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

export default Processing;
