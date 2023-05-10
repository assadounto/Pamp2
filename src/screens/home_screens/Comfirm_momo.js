import React, { useState } from 'react';
import {Text, View, SafeAreaView, Image, Modal, TextInput,StyleSheet} from 'react-native';
import {styles, colors} from '../../Common_styles';
import {CheckBox, Button} from '@rneui/base';
import {Border, FontFamily} from '../../GlobalStyles';
import Lottie from 'lottie-react-native';
import axios from 'axios';
import Blur from '../start_screens/Blur';
import Pop from '../start_screens/pop';

const Processing = ({route}) => {
    const { ref} = route.params;
    const [modalVisible, setModal] = React.useState(false);
    const [verificationResult, setVerificationResult] = React.useState(null);
   const [info,setinfo]= useState('Please approve payment and verify')
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
        if (verificationResult.data.status!=='success') {
            setModal(true);
            setTimeout(() => {
              setModal(false);
              //navigation.navigate('VerifyNumber');
            }, 4000);
          } else {
            setinfo('Payment is still pending. Please go to approvals and approve pament')
          } 
    }
    return (
        <>
        <SafeAreaView style={styles2.cont}>

       
          <Text style={styles2.text}>{info}</Text>
        
  
          <Button
            title="Verify Payment"
            onPress={verifyTransaction}
            //loading={isLoading}
            buttonStyle={styles.button}
          />
          <Pop
          main={'Payment Received. Thank you'}
          modal={modalVisible}
        />
    

      </SafeAreaView>
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

