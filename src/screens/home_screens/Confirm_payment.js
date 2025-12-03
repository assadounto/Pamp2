import { makeStyles } from '@rneui/themed';
import { useTheme } from '@rneui/themed';
import React, { useState } from "react";
import { SafeAreaView, View, Text, Pressable, Alert } from "react-native";
import BHeader from "../../../components/BHeader";
import { FontFamily } from "../../GlobalStyles";
import { colors } from "../../Common_styles";
import { Icon, Button, ListItem } from "@rneui/base";
import { Image } from "react-native-animatable";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import source from '../../../assets/pay-with-cash.png'
import source2 from '../../../assets/group-1902.png'
import momo from '../../../assets/momo.png'
import voda from '../../../assets/Vodafone.png'
import add from '../../../assets/group-1756.png'
import airtel from '../../../assets/airtel.png'

import axios from "axios";
import { set_actual_booking } from "../../redux/booking";
import FastImage from "react-native-fast-image";
import { useFocusEffect } from '@react-navigation/native';
import { backendURL } from '../../services/http';


import { convertMinutesToHoursAndMinutes, getTotalByKey } from "../../Functions";
import { useGetCouponQuery } from "../../redux/authapi";
import { da } from "date-fns/locale";
import AuthNavigator from "../../Navigation/AuthNavigator";
import { horizontalScale } from "../../Dimensions";
import { setDefault } from "../../redux/user";
import CardIcon from '../../../components/icons/Card';
import Money2Icon from '../../../components/Money2';
import EditIcon from '../../../components/icons/Edit';
import VerifiedIcon from '../../../components/icons/Verified';
import theme from '../../redux/theme';

const co = [
  'red',
  'violet',
  'yellow',

]


const Confirm_payment = ({ navigation, route }) => {
  const user = useSelector((state) => state.user.userInfo)
  const booking = useSelector((state) => state.booking)
  const [data, setData] = useState({})
  const location = useSelector(state => state.user.location)

  const [isLoading, setLoading] = useState(false)
  const [isLoading2, setLoading2] = useState(false)
  const [flag, setFlag] = useState(0)
  const [coupon_id, setC] = useState()

  const { data: book_data, refetch } = useGetCouponQuery({ id: user?.id, vendor_id: booking.vendor_id })
  const { coupon_info, booking_fee }=book_data?book_data:{}
  console.log(booking_fee, 'kg')
  // const { completed, items ,time} = route.params || {};
  const dispatch = useDispatch()
  const pay_data_ = useSelector((state) => state.user.payment_methods.default)
  const payment_pref = useSelector((state) => state.user.vPM)
  let pay_data = pay_data_ && pay_data_
  const booking_detail = booking.booking ? JSON.parse(booking.booking) : []
  useFocusEffect(

    React.useCallback(() => {
      refetch()

      get()

      // }
      // data && setC(info)
    }, []) // Include user.id in the dependency array
  );



  async function get() {
    setLoading2(true)
    const { data } = await axios.get(`${backendURL}/details?id=${booking?.vendor_id}`)
    setLoading2(false)
    setData(data.payment_method)

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
  const [ref, setref] = useState()
  const a = booking_detail.topping2.filter(({ total }) => total != 0)
  const HandleSubmit = async () => {

    if (!payment_method?.name) {
      Alert.alert('Caution', 'Please select a payment method')
      return

    }

    if (getTotalByKey(booking_detail.topping2, 'total') - (coupon_info?.amount ? coupon_info?.amount : 0) <= 0) {
      setLoading(true)
      await createBooking()
      navigation.navigate('Success')
    }
    else {
      gather_actual()
      let total = getTotalByKey(booking_detail.topping2, 'total')
      let pay_type = pay_data?.name



      //  start_transaction()
      navigation.navigate('Processing', {
        amount_paid: theTotal(total),
        total: total,
        pay_type: pay_type,


      })
    }


  }




  const theTotal = (amount) => {
    let total
    if (pay_data.name != 'Pay with cash') {
      if (coupon_info?.amount) {
        total = amount - coupon_info?.amount
      } else {
        total = amount
      }

    }
    else {
      total = amount * 0.2
    }
    return total.toFixed(2)
  }
  const getTotalMin = () => {
    let min = 0
    booking && booking_detail.topping2.map(({ time }) => {
      min += time
    })
    return min
  }

  const gather_actual = () => {
    console.log({
      user: user?.id,
      vendor: booking.vendor_id,
      services_id: getIds(),
      date: booking.date,
      time: booking.time,
      status: 'booked',
      staff: booking.staff,
      payment_method: pay_data.name,
      total: getTotalByKey(booking_detail.topping2, 'total'),
      items: booking_detail.topping2,
      coupon_id: coupon_info?.id
    })
    dispatch(set_actual_booking({
      user: user?.id,
      vendor: booking.vendor_id,
      services_id: getIds(),
      date: booking.date,
      time: booking.time,
      status: 'booked',
      staff: booking.staff,
      booking_fee: getfee(),
      payment_method: pay_data.name,
      total: getTotalByKey(booking_detail.topping2, 'total'),
      items: booking_detail.topping2,
      total_mins: getTotalMin(),
      coupon_id: coupon_info?.id
    }))
  }

  const getIds = () => {
    let array = []
    booking_detail.topping2.map((dat) => {
      dat.items.map((u) => {
        if (u.check) {
          array.push(u.id)
        }
      })
    })

    return array
  }


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


  const getfee=()=>{
    return   booking_fee? booking_fee:0
  }

  const createBooking = async (ref) => {

    const { data } = await axios.post(`${backendURL}/booking`,
      {
        date: booking.date,
        time: formatTimeForRails(booking.time),
        status: 'booked',
        service_ids: getIds(),
        user: user?.id,
        vendor: booking.vendor_id,
        payment_method: pay_data.name,
        total: getTotalByKey(booking_detail.topping2, 'total'),
        ref: ref,
        booking_fee: getfee(),
        others: booking_detail.topping2,
        staff: booking.staff,
        total_min: getTotalMin(),
        coupon_id: coupon_info?.id,
        amount_paid: 0

      }

    )


    setLoading(false)
  }
  const active_user = useSelector((state) => state.user.userInfo);
  console.log(active_user == true)
  const { theme } = useTheme();
  const payment_methods =
  {
    'Pay with cash': <Money2Icon color={theme.colors.lg} />,
    'Pay with momo': <Icon name='smartphone' color={colors.dg2.color} type="feather" />,
    'Pay with card': <CardIcon color={theme.colors.lg} />,
  }
  const payment_method = useSelector((state) => state.user.payment_methods.default)
  console.log(payment_method, 'yes')
  return (


    <><SafeAreaView>
      <BHeader top={Platform.OS === 'ios' ? 0 : 20} color={'#86D694'} title={'Confirm Payment'} />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:150, backgroundColor: theme.colors.background }}
      >
        <Text style={{ paddingLeft: 20, width: '90%', alignSelf: 'center', marginVertical: 20, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 18, color: theme.colors.dg }}>Payment Method</Text>
        {payment_method ?

          <ListItem
            containerStyle={[{ display: 'flex', flexDirection: 'row', height: 63, width: '90%', alignSelf: 'center', paddingTop: 20, paddingHorizontal: 20, shadowColor: '#707070', shadowOpacity: 0.2, shadowRadius: 10, elevation: 4, shadowOffset: { width: 5, height: 0 }, backgroundColor: theme.colors.card, borderRadius: 20 }]}
            onPress={() => {
              navigation.navigate('Select_payment', { data: payment_pref });
            }}>

            {payment_methods[payment_method.name]}
            <ListItem.Content>
              <ListItem.Title style={{ color: theme.colors.dg }}>
                {payment_method.Number && '***'}{payment_method.Number ? payment_method.Number.slice(-5) : payment_method.name}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron color={theme.colors.dg} size={30} />
          </ListItem>

          : <Pressable onPress={() => navigation.navigate('Select_payment', { data: payment_pref })} style={{ display: 'flex', flexDirection: 'row', height: 63, width: '90%', alignSelf: 'center', paddingTop: 20, paddingHorizontal: 20, shadowColor: '#707070', shadowOpacity: 0.2, shadowRadius: 10, elevation: 4, shadowOffset: { width: 5, height: 0 }, backgroundColor: theme.colors.card, borderRadius: 20 }}>
            <Text style={{ fontFamily: FontFamily.sourceSansProBold, fontSize: 20, color: theme.colors.dg }}>Select</Text>
            <View style={{ position: 'absolute', right: 20, top: 20 }}>


              <Icon
                style={{ width: 30, }}
                name={'chevron-forward'}
                type="ionicon"
                onPress={() => setShowPassword(!showPassword)}
                color={theme.colors.dg} />
            </View>
          </Pressable>}
        {payment_method && payment_method.name == 'Pay with cash' &&

          <View style={{ marginVertical: 20, padding: 10, borderRadius: 10, backgroundColor: theme.colors.caution2, width: '90%', alignSelf: 'center', display: 'flex', flexDirection: 'row' }}>
            <Icon
              style={{ marginLeft: 10, marginTop: 10 }}
              name="alert-circle-outline"
              type="ionicon"
              color={theme.colors.dg}
              size={25} />
            <Text style={{ width: '80%', marginLeft: 20, flexWrap: 'wrap', fontFamily: FontFamily.sourceSansProRegular, fontSize: 15, color: theme.colors.dg }}>A 20% deposit is required via mobile money, debit, or credit card. The remaining balance will be paid in-store. Please note that the deposit is non-refundable for late cancellations or no-shows.</Text>
          </View>}
        <View style={{  marginTop: 20, marginVertical: 10, shadowColor: '#707070', shadowOpacity: 0.2, shadowRadius: 10, shadowOffset: { width: 5, height: 0 }, elevation: 4, backgroundColor: theme.colors.card, borderRadius: 20, width: '90%', alignSelf: 'center' }}>
          <View style={{ padding: 20, display: 'flex', flexDirection: 'row', marginLeft: 15 }}>
            <View>
              <Text style={{ fontFamily: FontFamily.sourceSansProSemibold, fontSize: 23, color: theme.colors.dg }}>{booking.date && formatDate(booking.date)}</Text>
              <View style={{ gap: 5, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                <FastImage
                  style={{ width: 30, height: 30, borderRadius: 40, borderWidth: 3, borderColor: theme.colors.ring, marginTop: 4, }}
                  source={{
                    uri: booking.vendorimg,
                    headers: { Authorization: 'someAuthToken' },
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.cover} />
                <Text style={{ fontFamily: FontFamily.sourceSansProRegular, fontSize: 18, color: theme.colors.dg, maxWidth: 200 }}>{booking_detail.name}</Text>
                {booking_detail.home && <VerifiedIcon color={theme.colors.lg} />}
              </View>
            </View>
            <Pressable style={{
              position: 'absolute', top: 20,
              right: 30,
            }} onPress={() => navigation.navigate('VendorDetail', { id: booking?.vendor_id, datas: booking.Booking_detail })}>
              <EditIcon color={theme.colors.lg} />
            </Pressable>
          </View>
          <View style={{ padding: 20, borderTopColor: theme.colors.tabColor, borderTopWidth: 0.5, borderBottomColor: theme.colors.tabColor, borderBottomWidth: 0.5 }}>
            {booking && booking_detail.topping2.filter(({ total }) => total != 0).map(({ name, items_name, appointment_color, total, time, services }, _index2) => {


              return (
                <View style={{ marginBottom: 10, display: 'flex', flexDirection: 'row' }}>
                  <View style={{ width: 10, top: 5, marginRight: 10, height: 10, borderRadius: 10, backgroundColor: appointment_color }}></View>
                  {a.length != 1 && _index2 + 1 !== booking_detail.topping2.length ?
                    <View style={{ position: 'absolute', left: 5, top: 15, height: 60, width: 0.6, backgroundColor: '#BBB9BC' }}></View> : null}
                  <View style={{ width: '80%' }}>

                    <Text style={{ fontFamily: FontFamily.sourceSansProSemibold, fontSize: 18, color: theme.colors.dg, width: '70%' }}>{name} - <Text style={{ color: '#BBB9BC', fontSize: 13, }}>{items_name}</Text></Text>
                    <Text style={{ marginTop: 10, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 13, color: '#BBB9BC' }}>{convertMinutesToHoursAndMinutes(time)}</Text>

                  </View>
                  <Text style={{ fontFamily: FontFamily.sourceSansProBold, fontSize: 20, color: theme.colors.dg, position: 'absolute', right: 9 }}>{location.currency || "₵"}{total}</Text>
                </View>
              );
            })}
            {booking.staff && <Text style={{ left: 20, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 16, color: '#BBB9BC' }}>Booked with {booking.staff}</Text>}
            <Text style={{ left: 20, fontFamily: FontFamily.sourceSansProBold, fontSize: 20, color: theme.colors.lg }}>{booking.time}</Text>
            <View style={{ marginVertical: 20, padding: 10, borderRadius: 10, backgroundColor: theme.colors.caution2, width: '100%', alignSelf: 'center', display: 'flex', flexDirection: 'row' }}>
              <Icon
                style={{ marginLeft: 10, marginTop: 10 }}
                name="clock"
                type="feather"
                color={theme.colors.dg}
                size={25} />
              <Text style={{ height: 40, marginLeft: 10, fontFamily: FontFamily.sourceSansProRegular, fontSize: 15, color: theme.colors.dg }}>{'Reschedule up to 72 hours before\n appointment'}</Text>
            </View>
          </View>
          <View style={{ padding: 20, display: 'flex', flexDirection: 'row', height: 60 }}>
            <Text style={{ left: 20, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 16, color: theme.colors.dg }}>
              Discount
            </Text>
            <Text style={{ fontFamily: FontFamily.sourceSansProBold, fontSize: 20, color: theme.colors.lg, position: 'absolute', top: 17, right: 30 }}>
              {location.currency || "₵"}{coupon_info?.amount ? coupon_info.amount : 0}
            </Text>
          </View>
          <View style={{ padding: 20, display: 'flex', flexDirection: 'row', height: 80 }}>
            <Text style={{ left: 20, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 16, color: theme.colors.dg }}>
              Booking fee
            </Text>
            <Text style={{ fontFamily: FontFamily.sourceSansProBold, fontSize: 20, color: theme.colors.lg, position: 'absolute', top: 17, right: 30 }}>
              {location.currency || "₵"}{getfee()}
            </Text>
          </View>
          <View style={{ marginTop: -20, padding: 20, display: 'flex', flexDirection: 'row', height: 80 }}>
            <Text style={{ left: 20, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 16, color: theme.colors.dg }}>
              Total
            </Text>
            <Text style={{ fontFamily: FontFamily.sourceSansProBold, fontSize: 20, color: theme.colors.lg, position: 'absolute', top: 17, right: 30 }}>
              {location.currency || "₵"}{getTotalByKey(booking_detail.topping2, 'total') + getfee() - (coupon_info?.amount ? coupon_info.amount : 0) <= 0 ? 0 : getTotalByKey(booking_detail.topping2, 'total') + getfee() - (coupon_info?.amount ? coupon_info.amount : 0)}
            </Text>
          </View>

          
        </View>
{
          coupon_info && coupon_info.coupon_type=='influencer'&&    <ListItem
          containerStyle={[{marginTop:20,  height: 88, marginBottom: 150, alignSelf: 'center', gap: 10, paddingVertical: 20, shadowColor: '#707070', shadowOpacity: 0.2, shadowRadius: 10, shadowOffset: { width: 5, height: 0 }, elevation: 4, backgroundColor: theme.colors.card, borderRadius: 20, width: '90%', borderRadius: 20 }]}
         >
          <Text style={{ marginTop: 10, color: theme.colors.dg, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 18, marginHorizontal: 20 }}>Booking influenced by <Text style={{color:theme.colors.lg}}>{' '}{coupon_info?.other}</Text></Text>
          <ListItem.Content>
            <ListItem.Title style={{ marginLeft: -15, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 20, color: colors.dg.color }}>
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>}
      </ScrollView>

    </SafeAreaView><View style={{ position: 'absolute', top: '90%', alignSelf: 'center', backgroundColor: theme.colors.background, height: 200, width: '100%', marginBottom: 0 }}>
        <Button
          titleStyle={{ fontFamily: FontFamily.sourceSansProBold }}
          title={'Confirm'}
          loading={isLoading}
          // containerStyle={}
          buttonStyle={{
            width: 184,
            height: 54,
            //margin: 'auto',
            marginBottom: 20,
            marginTop: 10,
            alignSelf: 'center',
            borderRadius: 30,
            backgroundColor: theme.colors.lgb,
            shadowColor: theme.colors.lgb, shadowOpacity: 0., shadowRadius: 5, shadowOffset: { width: 5, height: 0 }
          }}
          onPress={HandleSubmit} />
      </View>

    </>

  )
}

export default Confirm_payment