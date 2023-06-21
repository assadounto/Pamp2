import React, { useState } from 'react';
import {Text, View, SafeAreaView, Image, Modal, TextInput,StyleSheet} from 'react-native';
import {styles, colors} from '../../Common_styles';
import {CheckBox, Button} from '@rneui/base';
import {Border, FontFamily} from '../../GlobalStyles';
import Lottie from 'lottie-react-native';
import axios from 'axios';
import Blur from '../start_screens/Blur';
import Pop from '../start_screens/pop';
import  { Paystack }  from 'react-native-paystack-webview';
import { useNavigation } from '@react-navigation/core';
import Success from './Sucess';
const Processing = ({route}) => {
   const navigation=useNavigation()
   console.log(total)
    const { total,pay_type} = route.params;
    const [modalVisible, setModal] = React.useState(false);
    const [verificationResult, setVerificationResult] = React.useState(null);
   const [info,setinfo]= useState('Please approve payment and verify')
   const [success,setSucess]=useState(false)
    const verifyTransaction = async () => {
        if (ref){
            
        }
      try {
        const response = await axios.get(
          `https://api.paystack.co/transaction/verify/qbieah9n0dqcnea`,
          {
            headers: {
              Authorization: `Bearer sk_live_5477923d0cb43f62e0c5d88d1bc73ea765e995e5`,
            },
          }
        );
        console.log(response.data)
        setVerificationResult(response.data);
        nextpage()
      } catch (error) {
        console.log(error);
      }
    };
  
    const nextpage=()=>{
      setSucess(true)
            setModal(true);
            
            setTimeout(() => {
              setModal(false);
             // navigation.navigate('Success');
            }, 4000);
          
         
    }
    return (
        <>
       
        {
          success? <Success /> :
          <SafeAreaView style={styles2.cont}>

          <Paystack  
        paystackKey="pk_test_e4bdcee80587746aabcc7b289634c04024d9dac5"
        amount={pay_type==='Pay with cash'? (total*0.1):total}
        currency={'GHS'}
        channels={pay_type==='Pay with cash'? ["mobile_money","card"]:pay_type=== 'Pay with card'? ["card"]:["mobile_money"]}
        billingEmail="adukyerer@gmail.com"
        activityIndicatorColor="green"
        onCancel={(e) => {
            navigation.navigate('main')
          // handle response here
        }}
        onSuccess={(res) => {
          console.log(res)
          // handle response here
          nextpage()
        
         
        }}

      
        autoStart={true}
      />
       </SafeAreaView>
        }
          <Pop
          main={'Payment Received. Thank you'}
          modal={modalVisible}
        />
    

     
      {modalVisible && <Blur />}
      </>
  
  
)

};
const styles2 = StyleSheet.create({
   text: {
      textAlign:'center',
      fontFamily:FontFamily.sourceSansProSemibold,
      fontSize:18,
      marginBottom:100,
      width:'80%'
    },
    cont:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})
export default Processing

