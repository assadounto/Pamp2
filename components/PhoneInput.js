import React, { useState } from 'react';
import {Text, View, SafeAreaView, Image, Modal,StyleSheet, TextInput,Keyboard, Alert} from 'react-native';
import { styles,colors } from '../src/Common_styles';
import { Button } from '@rneui/base';
import { FontFamily } from '../GlobalStyles';
import Pop from '../src/screens/start_screens/pop';
import { Icon } from '@rneui/base';
import axios from 'axios';
import { backendURL } from '../src/services/http';
import Pop2 from '../src/screens/start_screens/pop2';

const Phone_pop = ({setcancel, modal,setblur,id,data,login,googledata}) => {
    const [loading,setLoading]=useState(false)
    const [poph,setpop]=useState(400)
    const [text,setText]=useState('')


   const handlepressCancel=()=>{
   
    setcancel(false)
    }

    const handlePressOK=async()=>{
        setLoading(true)
    const {data}= axios.post(`${backendURL}/phone/confirm`,{id: id,phone: text,scope:'update_user' })
    console.log(data)
    setLoading(false)
   
    setcancel(false)
    if (googledata) {
        // Introduce a delay of 1 second before calling login
        setTimeout(() => {
          login(googledata);
        }, 1000);
      } else {
        Alert.alert('Error','Something went wrong. Please try again');
      }

    }

    React.useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
          setpop(260)
        });
    
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setpop(400)
        });
    
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
        };
      }, []);
  return (
    <><Modal animationType="slide" transparent={true} visible={modal}>
          <View style={{
        width: '95%',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 20,
        alignSelf: 'center',
        padding: 10,
        top:poph
    }}>
         <View style={pop.notes}>
            <Icon 
            onPress={handlepressCancel}
            name='close-outline'
            type='ionicon'
             size={40}
             color={'#00463C'}
            />

         </View>
         <Text style={pop.text}>Add your phone number</Text>
        <TextInput maxLength={13}  placeholderTextColor={'#BBB9BC'} placeholder='+23324xxxxxxx' onChangeText={setText}    style={pop.input}/>
          <Button loading={loading} titleStyle={{fontFamily:FontFamily.sourceSansProBold}} onPress={handlePressOK} buttonStyle={{ borderRadius: 40, backgroundColor: colors.dg2.color, width: 120, height: 40 }} title='Add'>

                  </Button>
          </View>
      </Modal></>
  );
};
const pop=StyleSheet.create({
  
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
    text:{
      fontFamily: FontFamily.sourceSansProRegular,
    color:colors.dg.color ,
    alignSelf:'flex-start',
marginHorizontal:20,
    fontSize:18,
    },
    h4:{
        color: colors.lg.color
    },
    notes:
    {
        alignSelf:'flex-end',
        marginRight: 10,
     
    },
    input:{
        width:'90%',
        height:40,
     borderColor:'#EFEFEF',
     borderWidth:1,
     borderRadius:10,
     padding:10,
     paddingTop:10,
     marginVertical:30
    }

})
export default Phone_pop;

