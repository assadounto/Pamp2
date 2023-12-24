import React, { useState } from 'react';
import { Alert, Text, TextInput, View, TouchableOpacity, SafeAreaView } from 'react-native';
import BHeader from '../../../components/BHeader';
import { Input, Button } from '@rneui/base';
import { styles } from '../../Common_styles';
import axios from 'axios';
import { backendURL } from '../../services/http';
import { useSelector } from 'react-redux';
import { FontFamily } from '../../GlobalStyles';
import { useDispatch } from 'react-redux';
const Change_email = ({ navigation }) => {
  const user =useSelector((state)=>state.user.userInfo)
  const [formData, setFormData] = useState({
    old_email: '',
    new_email: '',
    confirm_email: '',
    isLoading: false
  });

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isValidEmail = (email) => {
    // A simple email validation pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async() => {
    if (!formData.old_email || !formData.new_email || !formData.confirm_email) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (!isValidEmail(formData.new_email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    if (formData.new_email !== formData.confirm_email) {
      Alert.alert('Error', 'New email and confirm email must match.');
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      isLoading: true,
    }));
    // Form submission successful
    // console.log('Form Values:', formData);
      const {data}= await axios.get(`${backendURL}/change_email?scope=user&email=${formData.new_email}&id=${user.id}`)
       if (data==='ok'){
       //alert('yes')
       setFormData((prevData) => ({
        ...prevData,
        isLoading: false,
      }));
      
        navigation.navigate('VerifyEmail',{
          scope: 'ce',
        });
       }
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <BHeader title={'Change Email'} />

      <View style={{ alignSelf: 'center',marginTop:40}}>
        <TextInput
           placeholderTextColor={'#BBB9BC'}
          placeholder="Current Email Address"
          style={[styles.textInput]}
          onChangeText={(value) => handleChange('old_email', value)}
          value={formData.old_email}
        />

        <TextInput
           placeholderTextColor={'#BBB9BC'}
          placeholder="New Email Address"
          style={[styles.textInput]}
          onChangeText={(value) => handleChange('new_email', value)}
          value={formData.new_email}
        />

        <TextInput
           placeholderTextColor={'#BBB9BC'}
          placeholder="Confirm Email Address"
          style={[styles.textInput]}
          onChangeText={(value) => handleChange('confirm_email', value)}
          value={formData.confirm_email}
        />

        <TouchableOpacity>
          <Button
            title="Save"
            titleStyle={{fontFamily:FontFamily.sourceSansProBold}}
            onPress={handleSubmit}
            buttonStyle={[styles.button,{marginTop:'30%'}]}
            loading={formData.isLoading}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Change_email;
