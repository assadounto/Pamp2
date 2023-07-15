import { Background } from '@react-navigation/elements';
import React, { useState } from 'react';
import {Text, View,StyleSheet,TouchableOpacity, SafeAreaView, Image, Modal,Pressable,FlatList} from 'react-native';
import { FontFamily } from '../src/GlobalStyles';
import { styles,colors } from '../src/Common_styles';
import { Icon } from '@rneui/base';
import Cancel_pop from './Cancel_pop';
import Notes_pop from './Notes_pop';
import Blur from '../src/screens/start_screens/Blur';
import rebook from '../assets/rebook.png'
import rebook2 from '../assets/rebook5.png'
import note from '../assets/note.png'
import note2 from '../assets/note5.png'
import cancel1 from '../assets/cancel.png'
import cancel2 from '../assets/cancel5.png'
import { useSelector } from 'react-redux';
const Booking_action = ({setblur,rebk,data}) => {
    //console.log(cancelled)
    const canc = data.status=='cancelled'? true:false

    const [cancelled,cancel]= useState(canc)

    const [cancel_modal,setcancel]=useState(false)
    const [notes,setnotes]=useState(false)
  return (
    <View style={md_style.cont}>
        <View>
        <TouchableOpacity
          // delayPressIn={}
          disabled={cancelled}
          style={[md_style.action,cancelled&& md_style.cancel]}
          // key={index}
          onPress={() => rebk()}>
          <Image
          source={cancelled ? rebook2:rebook}
          style={{width:22,height:22,alignSelf:'center'}}
          />
 
      </TouchableOpacity>
      <Text style={md_style.text}>Rebook</Text> 
        </View>
       
      <View>
      <TouchableOpacity
          // delayPressIn={}
         disabled={cancelled}
          style={[md_style.action,cancelled && md_style.cancel]}
          // key={index}
          onPress={() =>{setblur(true);setnotes(true)}}>
             
             <Image
          source={cancelled ? note2:note}
          style={{width:22,height:22,alignSelf:'center'}}
          />
           
          </TouchableOpacity>
          <Text style={md_style.text}>Notes</Text>
          </View>

<View>
          <TouchableOpacity 
    // delayPressIn={}
    disabled={cancelled}
  style={[md_style.action,cancelled&& md_style.cancel_red]}
   // key={index}
   onPress={() =>{setblur(true); setcancel(true)}}>
      <Image
          source={cancelled ? cancel2: cancel1}
          style={{width:22,height:22,alignSelf:'center'}}
          />
         

  </TouchableOpacity>
  <Text style={md_style.text}>Cancel</Text>
  </View>
  <Cancel_pop data={data} setblur={setblur} modal={cancel_modal} cancel={cancel} setcancel={setcancel}/>
<Notes_pop id={data.id} setblur={setblur} modal={notes} setcancel={setnotes} />
          </View>
  );
};

export default Booking_action;
const md_style= StyleSheet.create({
  action:{
    borderColor:colors.lg.color,
    borderWidth:1,
    width:64,
    height:64,
    borderRadius:20,
    justifyContent: 'center' 
  },
  cancel:{
    borderColor:'#EFEFEF',
  },
  cancel_red:{
    borderColor:'#CD3D49',
  },
  cont:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginBottom:20,
    marginTop: 20
  },

  text:{
    textAlign: 'center',
    marginTop:10,
    fontSize:18,
    fontFamily:FontFamily.sourceSansProSemibold,
    color:colors.dg.color
  }

})