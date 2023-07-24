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


import { convertMinutesToHoursAndMinutes,getTotalByKey} from "../../Functions";

const co=[
  'red',
  'violet',
  'yellow',
  
]

const Confirm_payment=({navigation})=>{
  const dispatch=useDispatch()
  const pay_data_=  useSelector((state)=>state.user.payment_methods.default)
  let pay_data=pay_data_ && pay_data_
  const user = useSelector((state)=>state.user.userInfo)
  const booking_= useSelector((state)=>state.booking)
   const booking=booking_&& booking_
  //  console.log(booking.Booking_detail.topping2[0].items)
  const [ref,setref]=useState()
   const a=booking.Booking_detail.topping2.filter(({total})=>total!=0)
  const HandleSubmit=()=>{
    gather_actual()
    let total=  getTotalByKey(booking.Booking_detail.topping2,'total')
    let pay_type =pay_data.name
    //if (pay_type=='Pay with cash')
   // start_transaction()
    navigation.navigate('Processing',{
      total: total,
      pay_type:pay_type,

    })
  }

 console.log( booking.Booking_detail.topping2,'kk')
  const gather_actual=()=>{
   dispatch(set_actual_booking({
    user:user.id,
    vendor: booking.vendor_id,
    services_id: getIds(),
    date:booking.date ,
    time: booking.time ,
    status: 'booked',
    staff: booking.staff,
    payment_method: pay_data.name,
    total: getTotalByKey(booking.Booking_detail.topping2,'total'),
    items: booking.Booking_detail.topping2
   }))
  }
  
  const getIds=()=>{
  let array=[]
  booking.Booking_detail.topping2.map((dat)=> {
    dat.items.map((u)=>{
        if (u.check){
          array.push(u.id)
        }
      })
     })

     return array
  }

  const start_transaction=async ()=>{
   let total=  getTotalByKey(booking.Booking_detail.topping2,'total')
   let prov =pay_data&& pay_data.name.toLowerCase()
   RNPaystack.chargeCardWithAccessCode({
    cardNumber: '4123450131001381', 
    expiryMonth: '10', 
    expiryYear: '17', 
    cvc: '883',
    accessCode: '2p3j42th639duy4'
  })
.then(response => {
 
})
.catch(error => {
 
 
 
})
}

  
  const payment_method =useSelector((state)=>state.user.payment_methods.default)
    return(
        <><SafeAreaView>
        <ScrollView
          contentContainerStyle={{ backgroundColor: 'white' }}
        >
          <BHeader title={'Confirm Payment'} />
          <Text style={{ paddingLeft: 20, width: '90%', alignSelf: 'center', marginVertical: 20, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 18, color: colors.dg.color }}>Payment Method</Text>
          {payment_method ?

            <ListItem
              containerStyle={[{ display: 'flex', flexDirection: 'row', height: 63, width: '90%', alignSelf: 'center', paddingTop: 20, paddingHorizontal: 20, shadowColor: '#707070', shadowOpacity: 0.2, shadowRadius: 10, elevation: 4, shadowOffset: { width: 5, height: 0 }, backgroundColor: 'white', borderRadius: 20 }]}
              onPress={() => {
                navigation.navigate('Select_payment');
              } }>

              <Image
                source={payment_method.img == 'cash' ? source : payment_method.name == 'MTN' ? momo : payment_method.name == 'VODAFONE' ? voda : payment_method.name == 'AIRTELTIGO' ? airtel : source2}
                style={{ resizeMode: 'contain', width: 40, height: 30 }} />
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
              <Text style={{ width: '80%', marginLeft: 20, flexWrap: 'wrap', fontFamily: FontFamily.sourceSansProRegular, fontSize: 15, color: colors.dg.color }}>You need to add a debit or credit card to use the 'Pay with cash' option, Vendors charge a deposit of 20% ahead, the rest will be collected in-store. you'll lose your deposit in case of a late cancellation or no-show.</Text>
            </View>}
          <View style={{marginBottom:70, marginTop: 20, marginVertical: 10, shadowColor: '#707070', shadowOpacity: 0.2, shadowRadius: 10, shadowOffset: { width: 5, height: 0 }, elevation: 4, backgroundColor: 'white', borderRadius: 20, width: '90%', alignSelf: 'center' }}>
            <View style={{ padding: 20,  display: 'flex', flexDirection: 'row', marginLeft: 15 }}>
              <View>
                <Text style={{ fontFamily: FontFamily.sourceSansProSemibold, fontSize: 23, color: colors.dg.color }}>{[booking.date.day, ' ', booking.date.month, ' ', booking.date.year]}</Text>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                <FastImage
                style={{ width: 30, height: 30, borderRadius: 40, marginRight: 10 }}  
              source={{
              uri: booking.vendorimg ,
              headers: { Authorization: 'someAuthToken' },
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover} />
                  <Text style={{ fontFamily: FontFamily.sourceSansProRegular, top: 7, fontSize: 18, color: colors.dg.color }}>{booking.Booking_detail.name}</Text>
                </View>
              </View>
              <Pressable style={{
                position: 'absolute', top: 20,
                right: 30,
              }} onPress={() => navigation.navigate('VendorDetail', { id: booking.vendor_id })}>
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
              {booking && booking.Booking_detail.topping2.filter(({ total }) => total != 0).map(({ name, items_name, appointment_color, total, time, services }, _index2) => {
                return (
                  <View style={{ marginBottom: 25, display: 'flex', flexDirection: 'row' }}>
                    <View style={{ width: 10, top: 5, marginRight: 10, height: 10, borderRadius: 10, backgroundColor: appointment_color }}></View>
                    {a.length != 1 && _index2 + 1 !== booking.Booking_detail.topping2.length ?
                      <View style={{ position: 'absolute', left: 5, top: 15, height: 70, width: 0.6, backgroundColor: '#BBB9BC' }}></View> : null}
                    <View style={{width:'80%'}}>

                      <Text style={{ fontFamily: FontFamily.sourceSansProSemibold, fontSize: 18, color: colors.lg.color,width:'70%'}}>{name} - <Text style={{ color: '#BBB9BC', fontSize: 13,  }}>{items_name}</Text></Text>
                      <Text style={{marginTop:10, fontFamily: FontFamily.sourceSansProSemibold, fontSize: 13, color: '#BBB9BC' }}> {convertMinutesToHoursAndMinutes(time)}</Text>

                    </View>
                    <Text style={{ fontFamily: FontFamily.sourceSansProBold, fontSize: 18, color: colors.dg.color, position: 'absolute', right: 9 }}>¢{total}</Text>
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
              <Text style={{ fontFamily: FontFamily.sourceSansProSemibold, fontSize: 16, color: colors.lg.color }}>
                Total
              </Text>
              <Text style={{ fontFamily: FontFamily.sourceSansProBold, fontSize: 18, color: colors.lg.color, position: 'absolute', top: 17, right: 30 }}>
                ¢{getTotalByKey(booking.Booking_detail.topping2, 'total')}
              </Text>
            </View>
          </View>


        </ScrollView>

      </SafeAreaView><View style={{ position: 'absolute', top: '90%', alignSelf: 'center', backgroundColor: '#ffff', height: 200, width: '100%', marginBottom: 0 }}>
          <Button
            title={'Confirm'}
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