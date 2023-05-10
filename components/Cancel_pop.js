import React, { useState } from 'react';
import {Text, View, SafeAreaView, Image, Modal,StyleSheet} from 'react-native';
import { styles,colors } from '../src/Common_styles';
import { Button } from '@rneui/base';
import { FontFamily } from '../GlobalStyles';
import Pop from '../src/screens/start_screens/pop';
import { useDispatch, useSelector } from 'react-redux';
import { cancel } from '../src/redux/booking';
const Cancel_pop = ({setcancel, modal,setblur}) => {
    const dispatch =  useDispatch()
  

    const [notify_cancel,set_notify]=useState(false)
   const handlepressCancel=()=>{
   
    setblur(false);
    setcancel(false)
    }

    const handlePressOK=()=>{
    setcancel(false)
    dispatch(cancel(true))
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
              <Text style={[colors.dgb, pop.h2, styles.tac]}>Due to late cancellation, you'll lose your deposit of 20% from the services value (¢200)</Text>
              <Text style={[colors.dgb, pop.h3, styles.tac]}>See the <Text style={pop.h4}> Cancellation policy</Text></Text>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 10, marginVertical: 20 }}>
                  <Button onPress={handlePressOK} buttonStyle={{ borderRadius: 40, backgroundColor: colors.lg.color, width: 120, height: 40 }} title='Keep'>

                  </Button>
                  <Button onPress={handlepressCancel} buttonStyle={{ borderRadius: 40, backgroundColor: 'red', width: 120, height: 40 }} title='cancel'>

                  </Button>

              </View>

          </View>
      </Modal><Pop main={'You have successfully cancelled your appointment'} modal={notify_cancel}/></>
  );
};
const pop=StyleSheet.create({
    pop:{
        width: '95%',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 20,
        alignSelf: 'center',
        padding: 10,
       
        top:400
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
        color: colors.lg.color
    }
})
export default Cancel_pop;

