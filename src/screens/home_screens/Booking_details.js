import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import BHeader from '../../../components/BHeader';
import {colors, styles} from '../../Common_styles';
import {View, TextInput, Text, ScrollView,Platform, SafeAreaView,Pressable, StyleSheet,Linking} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {Button, color} from '@rneui/base';
import { SliderBox } from "react-native-image-slider-box";
import { Icon,ListItem ,Image} from '@rneui/base';
import { FontFamily } from '../../GlobalStyles';
import MapView,{ PROVIDER_GOOGLE,Marker } from 'react-native-maps';
import Booking_action from '../../../components/Bookin_action';
import Blur from '../start_screens/Blur';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { backendURL } from '../../services/http';
import { setVendor,setvendorid,setvendorname } from '../../redux/booking';
import { useSelector } from 'react-redux';
import { convertMinutesToHoursAndMinutes,getTotalByKey } from '../../Functions';
import CustomImageSlider from '../../../components/CustomSlider';
import AppJob from '../../../components/AppJob';
let booked=true
const Booking_detail = ({route,navigation}) => {
  const dispatch= useDispatch()
  const [info,setInfo]= useState()
  const user = useSelector((state)=>state.user.userInfo)
  const [noti, shownoti] = React.useState(false);
  const {data}=route.params
  console.log(data.services,'k')
    
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
   const [cancelled,setCancelled]=useState(false)
    const[blur,setblur]=useState(false)
    const [fav,setFav]=useState(data.favorite)
    const openGoogleMaps = () => {
      const url = `https://www.google.com/maps/search/?api=1&query=${data.vendor.lat},${data.vendor.lon}`;
    
      Linking.canOpenURL(url)
        .then(supported => {
          if (!supported) {
            console.log('Google Maps is not installed');
          } else {
            return Linking.openURL(url);
          }
        })
        .catch(error => console.log('Error opening Google Maps:', error));
    };
    
    const createFav=async()=>{
      console.log('d')
      try {
       const info= await axios.post(`${backendURL}/favorites`,{vendor_id: data.vendor.id,user_id:user.id})
       info.data.message=='added'? setFav(true): setFav(false)
      }
      catch(e){
        console.log(e)
      }
    }
  const rebook=()=>{
    dispatch(setvendorname(data.vendor.username))
    dispatch(setvendorid(data.vendor.id))
    dispatch(setVendor(data.hours))
    if (data.cancelable){
      navigation.navigate('SelectDate',{rebooked:true,id:data.id})
    }
    else {
      alert('You cannot rebook since its within 48hours to appointment.However you can send notes to vendor requesting a reschedule. If vendor approves, you can rebook')
    }
  }

  const copyToClipboard = () => {
    Clipboard.setString(`https://www.google.com/maps/search/?api=1&query=${data.vendor.lat},${data.vendor.lon}`);
    shownoti(true)
    setTimeout(()=>{
     shownoti(false)
    },3000
    )
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };

  function formatTime(timeString) {
    const date = new Date(timeString);
    const formattedTime = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    return formattedTime;
  }

  function formatDate(dateString) {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }
  
  function formatServiceNames(services) {
    const maxLength = 25; // Maximum length of the final formatted string
    const names = services.map(service => service.name);
    let formattedString = names.join(" & ");
  
    if (formattedString.length > maxLength) {
      formattedString = formattedString.substring(0, maxLength - 3) + "...";
    }
  
    return formattedString;
  }

  return (
   
   <ScrollView style={{backgroundColor:'#FFFFFF'}}>
   <CustomImageSlider images={[data.vendor.cover, ...data.vendor.otherImages]} />

         
         <View  style={{position: 'absolute',top:60,right:20}}>
         <Icon
        onPress={createFav}
          name='heart'
          type='ionicon'
          size={30}
          
          color={fav ?colors.lg.color: '#FFFFFF'} />
        </View>
        <View  style={{position: 'absolute',top:60,left:20}}>
        <Icon
          name='chevron-back-outline'
          type='ionicon'
          size={30}
         
          color={'#FFFFFF'}
           />
        </View>
        <Text style={{marginTop:10,color:colors.dg.color, fontFamily:FontFamily.sourceSansProBold,fontSize:27,marginHorizontal:20}}>{formatDate(data.date)}</Text>
        <Text style={{color:colors.dg.color, fontFamily:FontFamily.sourceSansProBold,fontSize:27,marginHorizontal:15}}> at {formatTime(data.time)}{'  '}
        
      </Text>
      <View style={[{width:62,height:21,borderRadius:10,padding:2,position:'relative',top:-27,left:165,
        }, info ? {backgroundColor: info.color}: {backgroundColor: bgc[data.status]}]}>
          <Text style={[{fontSize:11, textAlign:'center',fontFamily:FontFamily.sourceSansProSemibold},info  ? {color: 'white'} : {color:c[data.status]}]}>{info? info.status : data.status}</Text></View>
       <AppJob setInfo={setInfo} services={data.services} time={data.time}/>
       <View style={{marginHorizontal:20,marginVertical:30}}>
                        <ListItem
                  containerStyle={[{paddingVertical:20,borderBottomColor:colors.lg.color,borderTopColor:colors.lg.color,borderBottomWidth:0.5,borderTopWidth:0.5}]}
                  onPress={() => {
                  //dispatch(setDefault(pay))
              navigation.navigate('VendorDetail',
              {
              id: data.vendor.id,
              })
                  }}>
                <FastImage
          style={{width:40,height:40,borderRadius:50}}
  
            source={{
              uri: data.vendor.logo,
              headers: { Authorization: 'someAuthToken' },
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover} />
                  
        
                  <ListItem.Content>
                    <ListItem.Title style={{fontFamily:FontFamily.sourceSansProSemibold,fontSize:20,color:colors.dg.color}}>
                    {data.vendor.username}
                    </ListItem.Title>
                    <ListItem.Title style={{fontFamily:FontFamily.sourceSansProRegular,fontSize:15,color:colors.dg.color}}>
                    {data.vendor.name}
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron color={'#00463C'} size={30} />
                </ListItem>

                    </View>
           <Booking_action rebk={rebook} data={data} setblur={setblur} setCancelled={setCancelled}/>

                    <View style={{marginTop:20, marginVertical:10, shadowColor:'#707070',shadowOpacity:0.2,shadowRadius: 10,shadowOffset:{width:5,height:0},elevation:4,backgroundColor:'white', borderRadius:20,width:'90%',alignSelf:'center' }}>
        
        
        <View style={{padding:20,borderBottomColor:colors.lg.color,borderBottomWidth:1}}>
        {data.items.filter(({total})=>total!=0).map(({  name, items_name,appointment_color, total,time,services }, _index2) => {
        return(  
        <View style={{marginBottom:15, display:'flex',flexDirection:'row'}}>
               <View style={{width:10,top:5,marginRight:10, height:10 ,borderRadius:10, backgroundColor:appointment_color}}></View>
            {data.items.length!=1 &&_index2+1 !== data.items.length ?  
               <View style={{position:'absolute',left:5,top:15, height:45,width:0.6,backgroundColor:'#BBB9BC'}}></View>: null
            } 
                <View style={{width:'70%'}}>
                  
                    <Text style={{fontFamily: FontFamily.sourceSansProSemibold,fontSize:18,color:colors.lg.color}}>{name} - <Text style={{color:'#BBB9BC',fontSize:13,marginTop:-17}}>{items_name}</Text></Text>
                    <Text style={{fontFamily: FontFamily.sourceSansProSemibold,fontSize:13,color:'#BBB9BC'}}> {convertMinutesToHoursAndMinutes(time)}</Text>
                   
                </View>
                <Text style={{fontFamily:FontFamily.sourceSansProBold,fontSize:18,color:colors.dg.color,position:'absolute', right:9}}>¢{total}</Text>
            </View>
         )
        })}
       
        </View> 
      <View style={{padding:20,display:'flex',flexDirection:'row',height:80}}>
      <Text style={{left: 30,position:'absolute',top:20,fontFamily:FontFamily.sourceSansProSemibold,fontSize:18,color:colors.dg.color}}>
        Total
      </Text>
      <View style={{position:'absolute',right:30, top:20}}>
      <Text style={{fontFamily:FontFamily.sourceSansProBold,fontSize:18,color:colors.lg.color}}>
      ¢{data.payment_method== 'Pay with cash'? parseInt(data.total)/ 0.2: parseInt(data.total)}
      </Text>
      </View>
      
      </View>
     {
      data.payment_method== 'Pay with cash'  &&
       <><Text style={{ fontFamily: FontFamily.sourceSansProSemibold, fontSize: 16, color: colors.dg.color, left: 30, marginBottom: 20 }}>
            Initial deposit
          </Text>
          <Text style={{fontFamily: FontFamily.sourceSansProSemibold,fontSize:18, color: colors.dg.color,position: 'absolute',right:30,top:245 }}>¢{parseInt(data.total)}</Text></>
     }
       </View>
       <Text style={{fontFamily:FontFamily.sourceSansProSemibold,fontSize:20,color:colors.dg.color,marginTop:55,marginHorizontal:30,marginBottom:14}}>Location</Text>
       <MapView
    initialRegion={{
      latitude: data.vendor.lat?data.vendor.lat:5.614818,
      longitude: data.vendor.lon? data.vendor.lon: -0.205874,
      latitudeDelta: 0.00122,
      longitudeDelta: 0.00121,
    }}
    style={{width:'90%',height:300,alignSelf:'center',borderRadius:20}}
    provider={PROVIDER_GOOGLE}
></MapView>
<Text style={{fontFamily:FontFamily.sourceSansProSemibold,fontSize:20,color:colors.dg.color,marginTop:55,marginHorizontal:30,marginBottom:14}}>Address</Text>
<Text style={{fontFamily:FontFamily.sourceSansProRegular,fontSize:20,color:colors.dg.color,marginHorizontal:30,marginBottom:14}}>{data.vendor.name}</Text>
<View style={{marginTop:30,marginBottom:50,width:'90%',alignSelf:'center'}}>

                        <ListItem
                  containerStyle={[{paddingVertical:20,borderTopColor:colors.lg.color,borderBottomColor:colors.lg.color,borderBottomWidth:1,borderTopWidth:1}]}
                  onPress={() => {
                 // dispatch(setDefault(pay))
                 copyToClipboard()
                  }}>
                    <Icon
                    name="copy-outline"
                    type="ionicon"
                    size={20}
                    color={colors.lg.color}
                    />
         
                  <ListItem.Content>
                    <ListItem.Title style={colors.dgb}>
                    Copy address
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron color={'#00463C'} size={20} />
                </ListItem>
                <ListItem
                  containerStyle={[{paddingVertical:20,borderBottomColor:colors.lg.color,borderBottomWidth:1}]}
                  onPress={() => {
                 // dispatch(setDefault(pay))
                 openGoogleMaps()
                  }}>
                     <Icon
                    name="map-pin"
                    type="feather"
                    size={20}
                    color={colors.lg.color}
                    />
         
                  <ListItem.Content>
                    <ListItem.Title style={colors.dgb}>
                    Get directions
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron color={'#00463C'} size={20} />
                </ListItem>

                    </View>
                    {
            noti && 
            <View style={style2.copy_info}>
               <Text style={style2.copy_info_text}>Location copied Successfully!</Text>
           </View>
           }
                   {blur&& <Blur/>} 

   </ScrollView>
  ) 
};

const style2=StyleSheet.create({
    booked:{
        backgroundColor:colors.dg.color
    },
    completed:{
        backgroundColor:colors.lg.color
    },
    cancel:{
        backgroundColor:'red'
    },

  copy_info:{
    width: '90%',
    position:'absolute',
    alignSelf:'center',
    top:"70%",
    height:32,
    borderRadius:23,
    backgroundColor:colors.lg.color
  },
  copy_info_text:{
    fontFamily:FontFamily.sourceSansProRegular,
    fontSize:14,
    left:20,
    top:5,
    color:colors.dg.color
  }
})
export default Booking_detail;

