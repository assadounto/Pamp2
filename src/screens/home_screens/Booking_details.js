import React, { useState } from 'react';
import BHeader from '../../../components/BHeader';
import {colors, styles} from '../../Common_styles';
import {View, TextInput, Text, ScrollView,Platform, SafeAreaView,Pressable, StyleSheet,Linking} from 'react-native';
//import Clipboard from '@react-native-clipboard/clipboard';
import {Button} from '@rneui/base';
import { SliderBox } from "react-native-image-slider-box";
import { Icon,ListItem ,Image} from '@rneui/base';
import { FontFamily } from '../../GlobalStyles';
import MapView,{ PROVIDER_GOOGLE,Marker } from 'react-native-maps';
import Booking_action from '../../../components/Bookin_action';
import Blur from '../start_screens/Blur';
import { useSelector } from 'react-redux';
let booked=true
const Booking_detail = () => {
   const [cancelled,setCancelled]=useState(false)
    const[blur,setblur]=useState(false)
const open=()=>{
    Linking.openURL('maps://app?saddr=100+101&daddr=100+102')}



  const copyToClipboard = () => {
    Clipboard.setString('hello world');
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };


  return (
   
   <ScrollView style={{backgroundColor:'#FFFFFF'}}>
   <SliderBox
    sliderBoxHeight={450}
    autoplay
  imageLoadingColor="#FFFFFF"
      images={[   
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree"]}>
      
         </SliderBox> 
         <View  style={{position: 'absolute',top:60,right:20}}>
        <Icon
          name='heart-outline'
          type='ionicon'
          size={30}
         
          color={'#FFFFFF'}
           />
        </View>
        <View  style={{position: 'absolute',top:60,left:20}}>
        <Icon
          name='chevron-back-outline'
          type='ionicon'
          size={30}
         
          color={'#FFFFFF'}
           />
        </View>
        <Text style={{marginTop:10,color:colors.dg.color, fontFamily:FontFamily.sourceSansProBold,fontSize:27,maxWidth:256,marginHorizontal:20}}>Monday, 13 July 2022 at 9am  <View style={[{width:62,height:21,borderRadius:10,padding:2,
        },cancelled ?style2.cancel : style2.booked]}><Text style={{fontSize:11, textAlign:'center',fontFamily:FontFamily.sourceSansProSemibold,color:'white'}}>{cancelled?"canceled":'booked'}</Text></View></Text>
       
       <View style={{marginHorizontal:20,marginVertical:30}}>
                        <ListItem
                  containerStyle={[{paddingVertical:20,borderBottomColor:colors.lg.color,borderTopColor:colors.lg.color,borderBottomWidth:0.5,borderTopWidth:0.5}]}
                  onPress={() => {
                  //dispatch(setDefault(pay))
                  navigation.goBack()
                  }}>
               
                  <Image
          source={{uri: "https://source.unsplash.com/1024x768/?nature"} }
          style={{width:40,height:40,borderRadius:50}}
        />
        
                  <ListItem.Content>
                    <ListItem.Title style={{fontFamily:FontFamily.sourceSansProSemibold,fontSize:20,color:colors.dg.color}}>
                    Likkle salon
                    </ListItem.Title>
                    <ListItem.Title style={{fontFamily:FontFamily.sourceSansProRegular,fontSize:15,color:colors.dg.color}}>
                    Airport Residential Road, Accra
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron color={'#00463C'} size={30} />
                </ListItem>

                    </View>
           <Booking_action setblur={setblur} setCancelled={setCancelled}/>

                    <View style={{marginTop:20, marginVertical:10, shadowColor:'#707070',shadowOpacity:0.2,shadowRadius: 10,shadowOffset:{width:5,height:0},elevation:4,backgroundColor:'white', borderRadius:20,width:'90%',alignSelf:'center' }}>
        
        
        <View style={{padding:20,borderBottomColor:colors.lg.color,borderBottomWidth:1}}>
        <View style={{display:'flex',flexDirection:'row'}}>
                <View>
                    <Text style={{fontFamily: FontFamily.sourceSansProSemibold,fontSize:18,color:colors.dg.color}}>Sew in & Hair</Text>
                    <Text style={{color:colors.lg.color}}>9am-11:30am</Text>
                </View>
                <Text style={{marginLeft:160,fontFamily:FontFamily.sourceSansProBold,fontSize:18,color:colors.lg.color}}>200</Text>
            </View>
       
        </View> 
      <View style={{padding:20,display:'flex',flexDirection:'row',height:80}}>
      <Text style={{fontFamily:FontFamily.sourceSansProSemibold,fontSize:16,color:colors.lg.color}}>
        Total
      </Text>
      <Text style={{fontFamily:FontFamily.sourceSansProBold,fontSize:18,color:colors.dg.color,marginLeft:230}}>
        200
      </Text>
      </View>
       </View>
       <Text style={{fontFamily:FontFamily.sourceSansProSemibold,fontSize:20,color:colors.dg.color,marginTop:55,marginHorizontal:30,marginBottom:14}}>Location</Text>
       <MapView
    initialRegion={{
      latitude: 5.614818,
      longitude: -0.205874,
      latitudeDelta: 0.00122,
      longitudeDelta: 0.00121,
    }}
    style={{width:'90%',height:300,alignSelf:'center',borderRadius:20}}
    provider={PROVIDER_GOOGLE}
></MapView>
<Text style={{fontFamily:FontFamily.sourceSansProSemibold,fontSize:20,color:colors.dg.color,marginTop:55,marginHorizontal:30,marginBottom:14}}>Address</Text>
<Text style={{fontFamily:FontFamily.sourceSansProRegular,fontSize:20,color:colors.dg.color,marginHorizontal:30,marginBottom:14}}>Airport Residential Road, Accra</Text>
<View style={{marginTop:30,marginBottom:50,width:'90%',alignSelf:'center'}}>
                        <ListItem
                  containerStyle={[{paddingVertical:20,borderTopColor:colors.lg.color,borderBottomColor:colors.lg.color,borderBottomWidth:1,borderTopWidth:1}]}
                  onPress={() => {
                 // dispatch(setDefault(pay))
                  open()
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
                 open()
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
    }
})
export default Booking_detail;

