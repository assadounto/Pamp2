import React, { useState } from 'react';
import {Text, View, SafeAreaView, Image, Modal,StyleSheet, Linking} from 'react-native';
import { styles,colors } from '../src/Common_styles';
import { Button } from '@rneui/base';
import { FontFamily } from '../GlobalStyles';
import Pop from '../src/screens/start_screens/pop';
import { useDispatch, useSelector } from 'react-redux';
import { cancel } from '../src/redux/booking';
import { backendURL } from '../src/services/http';
import axios from 'axios';
import Pop2 from '../src/screens/start_screens/pop2';
const Cancel_pop = ({cancel, setcancel, modal,setblur,data}) => {
    const dispatch =  useDispatch()
  console.log(data.id)

    const [notify_cancel,set_notify]=useState(false)
   const handlepressCancel=()=>{
  
    setblur(false);
    setcancel(false)
    }

    const handlePressOK=async()=>{
   const info= await axios.post(`${backendURL}/booking/cancel?id=${data.id}&scope=user`)
   console.log(info.data)
     cancel(true)
     setcancel(false)
     set_notify(true);
    setTimeout(() => {
         set_notify(false);
         setblur(false);
       }, 3000);
    }
  return (
    <><Modal animationType="slide" transparent={true} visible={modal}>
          <View style={[pop.pop]}>
            
              <Text style={[colors.dgb, pop.h1, styles.tac]}>Are you sure you want to cancel booking?</Text>
              {
              !data.cancelable&&  <><Text style={[colors.dgb, pop.h2, styles.tac]}>{`Due to late cancellation, you'll lose your deposit of 20% from the services value`} <Text style={{fontFamily:FontFamily.sourceSansProSemibold}}>(¢{parseInt(data.total)})</Text></Text><Text style={[colors.dgb, pop.h3, styles.tac]}>See the <Text onPress={()=>Linking.openURL('https://www.trypamp.com/terms-of-use')} style={pop.h4}> Cancellation policy</Text></Text></>
              }
              <View style={{ display: 'flex', flexDirection: 'row', gap: 10, marginVertical: 20 }}>
          
                  <Button onPress={handlePressOK} buttonStyle={{ borderRadius: 40, backgroundColor: '#CD3D49', width: 120, height: 40 }} title='Yes'>

                  </Button>
                  <Button onPress={handlepressCancel} buttonStyle={{ borderRadius: 40, backgroundColor: colors.dg2.color, width: 120, height: 40 }} title='No'>

</Button>
              </View>

          </View>
      </Modal><Pop2 main={'You have successfully cancelled your appointment'} modal={notify_cancel}/></>
  );r
};
const pop=StyleSheet.create({
    pop:{
        position:'absolute',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 20,
        alignSelf: 'center',
        padding: 10,
       width:'90%',
       bottom:70
    },
    h1:{
        fontFamily:FontFamily.sourceSansProSemibold,
        fontSize:24,
        width:'80%',
       marginVertical:20
    },
    h2:{
        fontFamily: FontFamily.sourceSansProRegular,
        fontSize:14,
        width:'80%'
    },
    h3:{
        fontFamily:FontFamily.sourceSansProSemibold,
        fontSize:14,
        marginVertical:20
        
    },
    h4:{
        color: colors.dg2.color
    }
})
export default Cancel_pop;

