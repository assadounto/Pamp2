import React, { useState } from "react";
import { SafeAreaView ,View,Text,Pressable} from "react-native";
import BHeader from "../../../components/BHeader";
import { FontFamily } from "../../GlobalStyles";
import { colors } from "../../Common_styles";
import { Icon,Button,ListItem } from "@rneui/base";
import { Image } from "react-native-animatable";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import source from '../../../assets/pay-with-cash.png'
import source2 from '../../../assets/group-1902.png'
import momo from '../../../assets/momo.png'
import voda from '../../../assets/Vodafone.png'
import add from '../../../assets/group-1756.png'
import airtel from '../../../assets/airtel.png'
import axios from "axios";
import { set_actual_booking } from "../../redux/booking";
import { useDispatch } from "react-redux";
import FastImage from "react-native-fast-image";
import { useFocusEffect } from '@react-navigation/native';
import { backendURL } from '../../services/http';


import { convertMinutesToHoursAndMinutes,getTotalByKey} from "../../Functions";
import { useGetCouponQuery } from "../../redux/authapi";
import { da } from "date-fns/locale";

const co=[
  'red',
  'violet',
  'yellow',
  
]
const payment_methods=
{
  'Pay with cash': '',
   'Pay with momo':'smartphone',
   'Pay with card': 'credit-card',
}

const Confirm_payment=({navigation,route})=>{
  const user =  useSelector((state)=>state.user.userInfo)
  const booking= useSelector((state)=> state.booking)
const [isLoading,setLoading]=useState(false)
const [coupon_id,setC]=useState()
  const {data:coupon_info,refetch}= useGetCouponQuery({id:user.id,vendor_id: booking.vendor_id})
  
 // const { completed, items ,time} = route.params || {};
  const dispatch=useDispatch()
  const pay_data_=  useSelector((state)=>state.user.payment_methods.default)
  const payment_pref=useSelector((state)=>state.user.vPM)
  let pay_data=pay_data_ && pay_data_
   const booking_detail= booking.booking? JSON.parse( booking.booking):[]
 const data={}
   useFocusEffect(
  
    React.useCallback(() => {
      refetch()
      // data && setC(info)
    }, []) // Include user.id in the dependency array
  );
  

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
  const [ref,setref]=useState()
   const a=booking_detail.topping2.filter(({total})=>total!=0)
  const HandleSubmit=async()=>{
   if (getTotalByKey(booking_detail.topping2, 'total')- (coupon_info?.amount? coupon_info?.amount:0) <=0){
    setLoading(true)
    await createBooking()
    navigation.navigate('Success')
   }
   else{
    gather_actual()
    let total=  getTotalByKey(booking_detail.topping2,'total')
    let pay_type =pay_data.name
      

  
  //  start_transaction()
    navigation.navigate('Processing',{
      amount_paid: theTotal(total),
      total: total,
      pay_type:pay_type,
    

    })
   }
    
  
  }




  const theTotal=(amount)=>{
    let total
    if (pay_data.name!='Pay with cash'){
      if (coupon_info?.amount){
         total= amount - coupon_info?.amount
      } else 
      {
        total=amount
      }
      
    }
    else {
      total=amount*0.2
    }
    return total.toFixed(2)
  }
const getTotalMin=()=>{
 let min= 0
 booking && booking_detail.topping2.map(({  time  }) =>{
  min+=time
 })
  return min
}

  const gather_actual=()=>{
    console.log({
      user:user.id,
      vendor: booking.vendor_id,
      services_id: getIds(),
      date:booking.date ,
      time: booking.time ,
      status: 'booked',
      staff: booking.staff,
      payment_method: pay_data.name,
      total: getTotalByKey(booking_detail.topping2,'total'),
      items: booking_detail.topping2,
      coupon_id: coupon_info?.id
     })
   dispatch(set_actual_booking({
    user:user.id,
    vendor: booking.vendor_id,
    services_id: getIds(),
    date:booking.date,
    time: booking.time  ,
    status: 'booked',
    staff: booking.staff,
    payment_method: pay_data.name,
    total: getTotalByKey(booking_detail.topping2,'total'),
    items: booking_detail.topping2,
    total_mins: getTotalMin(),
    coupon_id:coupon_info?.id  
}))
  }
  
  const getIds=()=>{
  let array=[]
  booking_detail.topping2.map((dat)=> {
    dat.items.map((u)=>{
        if (u.check){
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



const createBooking=async (ref)=>{
 
 const {data}= await axios.post(`${backendURL}/booking`,
  {
    date: booking.date,
    time:  formatTimeForRails(booking.time),
    status: 'booked',
    service_ids:getIds(),
    user: user.id,
    vendor: booking.vendor_id,
    payment_method: pay_data.name,
    total: getTotalByKey(booking_detail.topping2,'total'),
    ref: ref,
    others: booking_detail.topping2,
    staff:  booking.staff,
    total_min: getTotalMin(),
    coupon_id: coupon_info?.id,
    amount_paid: 0

  }

  )

  
  setLoading(false)
}

  
  const payment_method =useSelector((state)=>state.user.payment_methods.default)
    return(
      <><SafeAreaView>
        <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
          contentContainerStyle={{ backgroundColor: 'white' }}
        >
          <BHeader color={'#86D694'} title={'Confirm Payment'} />
          <Text style={{ paddingLeft: 20, width: '90%', alignSelf: 'center', marginVertical: 20, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 18, color: colors.dg.color }}>Payment Method</Text>
          {payment_method ?

            <ListItem
              containerStyle={[{ display: 'flex', flexDirection: 'row', height: 63, width: '90%', alignSelf: 'center', paddingTop: 20, paddingHorizontal: 20, shadowColor: '#707070', shadowOpacity: 0.2, shadowRadius: 10, elevation: 4, shadowOffset: { width: 5, height: 0 }, backgroundColor: 'white', borderRadius: 20 }]}
              onPress={() => {
                navigation.navigate('Select_payment',{data: payment_pref});
              } }>

{payment_methods[payment_method.name]==''?
                       <Image
                       source={source}
                       style={{width:40,height:30,borderRadius:5,resizeMode:'contain'}}
                     />:
                       <Icon style={{marginLeft:10}} name={payment_methods[payment_method.name]} color={colors.dg2.color}  type="feather"/> 
                    }
              <ListItem.Content>
                <ListItem.Title style={colors.dgb}>
                  {payment_method.Number && '***'}{payment_method.Number ? payment_method.Number.slice(-5) : payment_method.name}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron color={'#00463C'} size={30} />
            </ListItem>

            : <Pressable onPress={() => navigation.navigate('Select_payment')} style={{ display: 'flex', flexDirection: 'row', height: 63, width: '90%', alignSelf: 'center', paddingTop: 20, paddingHorizontal: 20, shadowColor: '#707070', shadowOpacity: 0.2, shadowRadius: 10, elevation: 4, shadowOffset: { width: 5, height: 0 }, backgroundColor: 'white', borderRadius: 20 }}>
              <Text style={{ fontFamily: FontFamily.sourceSansProBold, fontSize: 20, color: colors.dg.color }}>Select</Text>
              <Icon
                style={{ width: 30, marginLeft: 240 }}
                name={'chevron-forward'}
                type="ionicon"
                onPress={() => setShowPassword(!showPassword)}
                color={colors.dg.color} />
            </Pressable>}
          {payment_method && payment_method.name == 'Pay with cash' &&

            <View style={{ marginVertical: 20, padding: 10, borderRadius: 10, backgroundColor: '#B0EBBD40', width: '90%', alignSelf: 'center', display: 'flex', flexDirection: 'row' }}>
              <Icon
                style={{ marginLeft: 10, marginTop: 10 }}
                name="alert-circle-outline"
                type="ionicon"
                size={25} />
              <Text style={{ width: '80%', marginLeft: 20, flexWrap: 'wrap', fontFamily: FontFamily.sourceSansProRegular, fontSize: 15, color: colors.dg.color }}>You will be required to pay with Mobile Money, Debit or Credit card to use the 'Pay with cash' option, Vendors charge a deposit of 20% ahead, the rest will be collected in-store. you'll lose your deposit in case of a late cancellation or no-show.</Text>
            </View>}
          <View style={{marginBottom:150, marginTop: 20, marginVertical: 10, shadowColor: '#707070', shadowOpacity: 0.2, shadowRadius: 10, shadowOffset: { width: 5, height: 0 }, elevation: 4, backgroundColor: 'white', borderRadius: 20, width: '90%', alignSelf: 'center' }}>
            <View style={{ padding: 20,  display: 'flex', flexDirection: 'row', marginLeft: 15 }}>
              <View>
                <Text style={{ fontFamily: FontFamily.sourceSansProSemibold, fontSize: 23, color: colors.dg.color }}>{booking.date&& formatDate(booking.date)}</Text>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                <FastImage
                style={{ width: 30, height: 30, borderRadius: 40,marginTop:4, marginRight: 10 }}  
              source={{
              uri: booking.vendorimg ,
              headers: { Authorization: 'someAuthToken' },
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover} />
                  <Text style={{ fontFamily: FontFamily.sourceSansProRegular, top: 7, fontSize: 18, color: colors.dg.color }}>{booking_detail.name}</Text>
                </View>
              </View>
              <Pressable style={{
                position: 'absolute', top: 20,
                right: 30,
              }} onPress={() => navigation.navigate('VendorDetail', { id: booking.vendor_id,datas: booking.Booking_detail })}>
                <Icon
                  name="edit-2"
                  type="feather"
                  size={18}
                  color={colors.lg.color}

                  style={{
                    borderRadius: 50,
                    borderWidth: 1,
                    borderColor: colors.lg.color,
                    padding: 5,
                    // color: colors.dg2.color,
                  }} />
              </Pressable>
            </View>
            <View style={{padding: 20,borderTopColor:colors.lg.color,borderTopWidth:0.5, borderBottomColor: colors.lg.color, borderBottomWidth: 0.5}}>
              {booking && booking_detail.topping2.filter(({ total }) => total != 0).map(({ name, items_name, appointment_color, total, time, services }, _index2) => {
              
                return (
                  <View style={{ marginBottom: 10, display: 'flex', flexDirection: 'row' }}>
                    <View style={{ width: 10, top: 5, marginRight: 10, height: 10, borderRadius: 10, backgroundColor: appointment_color }}></View>
                    {a.length != 1 && _index2 + 1 !== booking_detail.topping2.length ?
                      <View style={{ position: 'absolute', left: 5, top: 15, height: 60, width: 0.6, backgroundColor: '#BBB9BC' }}></View> : null}
                    <View style={{width:'80%'}}>

                      <Text style={{ fontFamily: FontFamily.sourceSansProSemibold, fontSize: 18, color: colors.dg.color,width:'70%'}}>{name} - <Text style={{ color: '#BBB9BC', fontSize: 13,  }}>{items_name}</Text></Text>
                      <Text style={{marginTop:10, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 13, color: '#BBB9BC' }}>{convertMinutesToHoursAndMinutes(time)}</Text>

                    </View>
                    <Text style={{ fontFamily: FontFamily.sourceSansProBold, fontSize: 20, color: colors.dg.color, position: 'absolute', right: 9 }}>¢{total}</Text>
                  </View>
                );
              })}
              {booking.staff && <Text style={{ left: 20, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 16, color: '#BBB9BC' }}>Booked with {booking.staff}</Text>}
              <Text style={{ left: 20, fontFamily: FontFamily.sourceSansProBold, fontSize: 20, color: colors.lg.color }}>{booking.time}</Text>
              <View style={{ marginVertical: 20, padding: 10, borderRadius: 10, backgroundColor: '#B0EBBD40', width: '100%', alignSelf: 'center', display: 'flex', flexDirection: 'row' }}>
                <Icon
                  style={{ marginLeft: 10, marginTop: 10 }}
                  name="clock"
                  type="feather"
                  size={25} />
                <Text style={{ height: 40, marginLeft: 10, fontFamily: FontFamily.sourceSansProRegular, fontSize: 15, color: colors.dg.color }}>{'Reschedule up to 72 hours before\n appointment'}</Text>
              </View>
            </View>
            <View style={{ padding: 20, display: 'flex', flexDirection: 'row', height: 80 }}>
              <Text style={{left:20, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 16, color: colors.dg.color }}>
                Discount
              </Text>
              <Text style={{ fontFamily: FontFamily.sourceSansProBold, fontSize: 20, color: colors.lg.color, position: 'absolute', top: 17, right: 30 }}>
              ¢{coupon_info?.amount ? coupon_info.amount: 0}
              </Text>
            </View>
            <View style={{marginTop:-20,padding: 20, display: 'flex', flexDirection: 'row', height: 80 }}>
              <Text style={{left:20, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 16, color: colors.dg.color }}>
                 Total
              </Text>
              <Text style={{ fontFamily: FontFamily.sourceSansProBold, fontSize: 20, color: colors.lg.color, position: 'absolute', top: 17, right: 30 }}>
                ¢{getTotalByKey(booking_detail.topping2, 'total')- (coupon_info?.amount ? coupon_info.amount:0) <=0 ? 0: getTotalByKey(booking_detail.topping2, 'total')- (coupon_info?.amount?  coupon_info.amount:0)}
              </Text>
            </View>
          </View>


        </ScrollView>

      </SafeAreaView><View style={{ position: 'absolute', top: '90%', alignSelf: 'center', backgroundColor: '#ffff', height: 200, width: '100%', marginBottom: 0 }}>
          <Button
           titleStyle={{fontFamily:FontFamily.sourceSansProBold}}
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
              borderRadius: 20,
              backgroundColor: colors.dg2.color,
              shadowColor: colors.dg2.color, shadowOpacity: 0., shadowRadius: 5, shadowOffset: { width: 5, height: 0 }
            }}
            onPress={HandleSubmit} />
        </View></>
    )
}

export default Confirm_payment