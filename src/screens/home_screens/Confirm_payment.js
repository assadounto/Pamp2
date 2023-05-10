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

import { convertMinutesToHoursAndMinutes,getTotalByKey} from "../../Functions";
const Confirm_payment=({navigation})=>{
  const pay_data= useSelector((state)=>state.user.payment_methods.default)
  const user = useSelector((state)=>state.user.userInfo)
  const booking= useSelector((state)=>state.booking)
  const [ref,setref]=useState()
    console.log(user.email)
  const HandleSubmit=()=>{
    start_transaction()
    navigation.navigate('Processing',{ref: ref })
  }

  const start_transaction=async ()=>{
   let total=  getTotalByKey(booking.Booking_detail.topping2,'total')
   let prov =pay_data.name.toLowerCase()
   console.log(prov,pay_data)

   try {
    if (pay_data.Number||pay_data.number){
    const res = await axios.post('https://api.paystack.co/charge',
    { "amount": total*100,
      "email": user.email,
      "currency": "GHS",
      "mobile_money": {
        "phone" : pay_data.Number|| pay_data.number,
        "provider" : prov
      }
    }, 

     {
  headers: {
 
    'Content-Type': 'application/json',
    "Authorization": 'Bearer sk_test_de0425527eb3ec101488bf4a316b8bd4237f42c6'
  }
});
setref(res.data)
console.log(ref,res.data)
    }

   } catch (error) {
    console.log(error);
  }
}

  
  const payment_method =useSelector((state)=>state.user.payment_methods.default)
    return(
        <SafeAreaView>
            <ScrollView
            contentContainerStyle={{backgroundColor:'white'}}
            > 
                <BHeader title={'Confirm Payment'}/>
                <Text style={{paddingLeft:20, width: '90%',alignSelf:'center',marginVertical:20,fontFamily:FontFamily.sourceSansProSemibold,fontSize:18,color:colors.dg.color}}>Payment Method</Text>
                {
                  payment_method ? 
                  
                  <ListItem
                  containerStyle={[{ display:'flex',flexDirection:'row', height:63, width: '90%',alignSelf:'center',paddingTop:20, paddingHorizontal:20,shadowColor:'#707070',shadowOpacity:0.2,shadowRadius: 10,elevation:4,shadowOffset:{width:5,height:0},backgroundColor:'white', borderRadius:20}]}
                  onPress={() => {
                   navigation.navigate('Select_payment');
                  }}>
                    
                  <Image
          source={payment_method.img=='cash'? source: payment_method.name=='MTN' ? momo: payment_method.name=='VODAFONE'? voda: payment_method.name=='AIRTELTIGO'? airtel:source2}
          style={{resizeMode:'contain',width:40,height:30}}
        />
                  <ListItem.Content>
                    <ListItem.Title style={colors.dgb}>
                 {payment_method.Number && '***'}{payment_method.Number ? payment_method.Number.slice(-5): payment_method.name}
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron color={'#00463C'} size={30} />
                </ListItem>
                  
                  :<Pressable onPress={()=>navigation.navigate('Select_payment')} style={{ display:'flex',flexDirection:'row', height:63, width: '90%',alignSelf:'center',paddingTop:20, paddingHorizontal:20,shadowColor:'#707070',shadowOpacity:0.2,shadowRadius: 10,elevation:4,shadowOffset:{width:5,height:0},backgroundColor:'white', borderRadius:20}}> 
                  <Text style={{fontFamily:FontFamily.sourceSansProBold,fontSize:20,color:colors.dg.color}}>Select</Text>
            <Icon 
             style={{width:30,marginLeft: 240}}
                        name={'chevron-forward'}
                        type="ionicon"
                        onPress={() => setShowPassword(!showPassword)}
                        color={colors.dg.color}
                      />
         </Pressable>
                }
{payment_method.name=='Pay with cash' &&

<View style={{marginVertical:20, padding:10,borderRadius:10 ,backgroundColor:'#B0EBBD40', width:'90%',alignSelf:'center',display:'flex',flexDirection:'row'}}> 
        <Icon
         style={{marginLeft:10,marginTop:10}}
                name="alert-circle-outline"
                type="ionicon"
                size={25}
                /> 
                <Text style={{ width:'80%',marginLeft:20,flexWrap:'wrap',fontFamily:FontFamily.sourceSansProRegular,fontSize:15,color:colors.dg.color}}>You need to add a debit or credit card to use the 'Pay with cash' option, Vendors charge a deposit of 20% ahead, the rest will be collected in-store. you'll lose your deposit in case of a late cancellation or no-show.</Text>
         </View>
}



       <View style={{marginTop:20, marginVertical:10, shadowColor:'#707070',shadowOpacity:0.2,shadowRadius: 10,shadowOffset:{width:5,height:0},elevation:4,backgroundColor:'white', borderRadius:20,width:'90%',alignSelf:'center' }}>
        <View style={{padding:20,borderBottomColor:colors.lg.color,borderBottomWidth:1,display:'flex',flexDirection:'row'}}>
            <View>
                <Text  style={{fontFamily:FontFamily.sourceSansProSemibold,fontSize:23,color:colors.dg.color}}>{[booking.date.day,' ',booking.date.month,' ',booking.date.year]}</Text>
             <View style={{display:'flex',flexDirection:'row'}}>
             <Image
        source={require('../../../assets/group-1820.png')}/>
                <Text style={{fontFamily:FontFamily.sourceSansProRegular,fontSize:18,color:colors.dg.color}}>{booking.Booking_detail.name}</Text>
             </View>
             </View>
             <Pressable onPress={() => navigation.navigate('edit_profile')}>
              <Icon
                name="edit-2"
                type="feather"
                size={18}
                style={{
                marginLeft:160,
                  marginTop: 12,
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: colors.lg.color,
                  padding: 5,
                  color: colors.dg2.color,
                }}
              />
            </Pressable>
        </View>
        <View style={{padding:20,borderBottomColor:colors.lg.color,borderBottomWidth:1}}>
       {booking && booking.Booking_detail.topping2.map(({  name, items_name, total,time,services }, _index2) => {
        return(
          
        <View style={{display:'flex',flexDirection:'row'}}>
                <View>
                  
                    <Text style={{fontFamily: FontFamily.sourceSansProSemibold,fontSize:18,color:colors.lg.color}}>{name}-<Text style={{color:'#BBB9BC',fontSize:9,marginTop:-10}}>{items_name}</Text></Text>
                    <Text style={{fontFamily: FontFamily.sourceSansProSemibold,fontSize:13,color:'#BBB9BC'}}> {convertMinutesToHoursAndMinutes(time)}-{services} service</Text>
                    <Text style={{color:colors.lg.color}}>{booking.time}-completion</Text>
                </View>
                <Text style={{fontFamily:FontFamily.sourceSansProBold,fontSize:18,color:colors.lg.color,position:'absolute', right:10}}>{total}</Text>
            </View>
         )
        })}
        <View style={{marginVertical:20, padding:10,borderRadius:10 ,backgroundColor:'#B0EBBD40', width:'100%',alignSelf:'center',display:'flex',flexDirection:'row'}}> 
        <Icon
         style={{marginLeft:10,marginTop:10}}
                name="clock"
                type="feather"
                size={25}
                /> 
                <Text style={{height:40,marginLeft:20,flexWrap:'wrap',fontFamily:FontFamily.sourceSansProRegular,fontSize:15,color:colors.dg.color}}>Reschedule up to 72 hours before appointment</Text>
         </View>
        </View> 
      <View style={{padding:20,display:'flex',flexDirection:'row',height:80}}>
      <Text style={{fontFamily:FontFamily.sourceSansProSemibold,fontSize:16,color:colors.lg.color}}>
        Total
      </Text>
      <Text style={{fontFamily:FontFamily.sourceSansProBold,fontSize:18,color:colors.dg.color,marginLeft:230}}>
      {getTotalByKey(booking.Booking_detail.topping2,'total')}
      </Text>
      </View>
       </View>
       <Button
          title={'Confirm'}
          // containerStyle={}
          buttonStyle={{
            width: 184,
            height: 54,
            //margin: 'auto',
            marginBottom: 20,
            marginTop: 20,
            alignSelf: 'center',
            borderRadius: 20,
            backgroundColor: colors.dg2.color,
            shadowColor: colors.lg.color, shadowOpacity: 0.5, shadowRadius: 5, shadowOffset: { width: 5, height: 0 }
          }}
          onPress={HandleSubmit} />
       </ScrollView>
        </SafeAreaView>
    )
}

export default Confirm_payment