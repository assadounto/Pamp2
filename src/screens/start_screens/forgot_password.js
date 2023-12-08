import React, { useState } from 'react';
import Header from './header';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import {Input, Button} from '@rneui/base';
import {Formik} from 'formik';
import {styles} from '../../Common_styles';
import { useLazySearchAccountQuery} from '../../redux/authapi';
const ForgotPassword = ({navigation}) => {
  const[searchAccount,{isLoading,isSuccess}]=useLazySearchAccountQuery()
  const [email,setEmail]= useState('')
  const onSubmit = async () => {

   let {status,data
}= await searchAccount(email.toLocaleLowerCase())
console.log(data)
  status== 'fulfilled'   &&
     navigation.navigate('ResetPassword',{info: data})
  };
  return (
    <>
      <Header main={'Find Your Pamp Account'} />
      
          <View style={styles.input2}>
            <TextInput 
           
              placeholder="try@pamp.com"
              style={[styles.textInput,styles.tc]}
              onChangeText={setEmail}
            />
            <TouchableOpacity style={{marginTop:30}}>
              <Button
                title="Search"
                onPress={ onSubmit}
                loading={isLoading}
                buttonStyle={styles.button}
              />
            </TouchableOpacity>
          </View>
    </>
  );
};

export default ForgotPassword;
