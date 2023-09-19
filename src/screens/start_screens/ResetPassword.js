import React, {useState, useEffect} from 'react';
import BHeader from '../../../components/BHeader';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Input, Button, CheckBox,ListItem,Icon} from '@rneui/base';
import CheckBoxComponent from '../../../components/Checkbox';
import { colors} from '../../Common_styles';
import Save from '../../../components/Save';
import { styles as styles2 } from '../../Common_styles';
import { useLazyForgotAccountQuery } from '../../redux/authapi';
const ResetPassword = ({route,navigation}) => {
  const[ forgotAccount,{data,isError}]= useLazyForgotAccountQuery()
const {info} = route.params

  const[email,setEmail]= useState(false)
  const[phone,setPhone]= useState(false)
  const[option,SetOption]=useState('')
  const handleEmailCheckboxChange = () => {
    setEmail(!email);
    setPhone(false);
    if(email==false){
      SetOption('email')
    } else{
      SetOption('')
    }

  };

  const handlePhoneCheckboxChange = () => {
    setPhone(!phone);
    setEmail(false);
   
    if(phone==false){
      SetOption('phone')
    } else{
      SetOption('')
    }
  };

  const handlePress=()=>{
    console.log({
      method: option,
      email: info.email
    })
    // forgotAccount({
    //   method: option,
    //   email: info.email
    // })
    navigation.navigate('VerifyEmail',{scope: 'reset'})
  
  }
  return (
    <>
      <BHeader
      color={colors.dg}
        title={'How do you want to reset password?'} subtitle={'We found the following information associated with your account'}
      />
      <View style={styles.mt50}>
    <ListItem
              containerStyle={[styles.cont]}
              onPress={() => {
                navigation.navigate('Business_setting');
              }}>

              <CheckBoxComponent onPress={handleEmailCheckboxChange} state={email} />
              <ListItem.Content>
                <ListItem.Title style={colors.lg}>Email a confirmation code to 
</ListItem.Title>
                <ListItem.Title style={colors.lg}>{info.email}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            { info.phone &&
              <ListItem
              containerStyle={[styles.cont,styles.none]}
              onPress={() => {
                navigation.navigate('Business_setting');
              }}>

              <CheckBoxComponent onPress={handlePhoneCheckboxChange} state={phone}/>
              <ListItem.Content>
                <ListItem.Title style={colors.lg}>Text a confirmation code to 
 </ListItem.Title>
                <ListItem.Title style={colors.lg}>phone number ending with 50 </ListItem.Title>
              </ListItem.Content>
            </ListItem>
            }
            <Button
                title="Send"
                onPress={handlePress}
                buttonStyle={[styles2.button,{marginTop:80}]}
               />
            </View>
    </>
  );
};
export default ResetPassword;
const styles= StyleSheet.create({
  cont:{
    
    width:'90%',
    alignSelf:'center',
    borderColor:'#B0EBBD',
    borderBottomWidth:1,
    borderTopWidth:1
  },
  text1:{
    color: '#B0EBBD'
  },
  none:{
    borderTopWidth:0
  },
  mt50:{
    marginTop:50
  }
})