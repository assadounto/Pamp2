import React, { useState } from 'react';
import { Alert, View,TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Input, Button,Icon } from '@rneui/base';
import { colors, styles } from '../../Common_styles';
import axios from 'axios';
import { backendURL } from '../../services/http';
import BHeader from '../../../components/BHeader';
import Blur from '../start_screens/Blur';
import Pop2 from '../start_screens/pop2';
import { useSelector } from 'react-redux';
import { FontFamily } from '../../GlobalStyles';
const PassReset = ({ navigation,route}) => {
    const { datas } = route?.params || {};
  const user =useSelector((state)=>state.user.userInfo)
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModal] = useState(false);
  const [formData, setFormData] = useState({ // Current Password field
    new_password: '', // New Password field (changed from new_email)
    confirm_password: '', // Confirm Password field (changed from confirm_email)
    isLoading: false,
  });

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const {  new_password, confirm_password } = formData;

    if ( !new_password || !confirm_password) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (new_password !== confirm_password) {
      Alert.alert('Error', 'New password and confirm password must match.');
      return;
    }

    // Form submission successful
    // console.log('Form Values:', formData);
    setFormData((prevData) => ({
      ...prevData,
      isLoading: true,
    }));

    try {
      // Assuming you are sending a POST request to change the password
      const { data } = await axios.post(`${backendURL}/user/password/reset`, {...datas,
      password:  new_password,
      });

      if (data.status === 'ok') {
        // Password change successful
        // Perform any necessary actions here

        setFormData((prevData) => ({
          ...prevData,
          isLoading: false,
        }));
        setModal(true);
        setTimeout(() => {
            setModal(false);
         navigation.navigate('login2')
          }, 4000);

        //navigation.navigate('PasswordChangedScreen'); // Navigate to a success screen
      } else {
        // Handle password change failure
        // This could be due to incorrect current password or other reasons
        Alert.alert('Error', 'Failed to change password. Please try again.');
        setFormData((prevData) => ({
          ...prevData,
          isLoading: false,
        }));
      }
    } catch (error) {
      // Handle API call error
      console.error('Password change error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
      setFormData((prevData) => ({
        ...prevData,
        isLoading: false,
      }));
    }
  };

  return (
    <>

     

      <View style={{ alignSelf: 'center', marginTop: 40 }}>
        
      <BHeader color={colors.dg.color} title={'Change Password'} />

        <TextInput
         placeholderTextColor={'#BBB9BC'}
          placeholder="New Password"
          style={[styles.textInput,{marginTop:40}]}
          secureTextEntry={!showPassword}
          rightIcon={
            <Icon
              name={showPassword ? 'eye' : 'eye-off'}
              type="ionicon"
              onPress={() => setShowPassword(!showPassword)}
              color="#BBB9BC"
            />
          }
          onChangeText={(value) => handleChange('new_password', value)}
        />
  <View  style={{position:'absolute',top:140,right:30}}>
                <Icon
                    
                      name={showPassword ? 'eye' : 'eye-off'}
                      type="ionicon"
                      onPress={() => setShowPassword(!showPassword)}
                      color='#BBB9BC'
                    />
                </View>
        <TextInput
         placeholderTextColor={'#BBB9BC'}
          placeholder="Confirm Password"
          style={[styles.textInput]}
          secureTextEntry={!showPassword}
          
          onChangeText={(value) => handleChange('confirm_password', value)}
        />

        <TouchableOpacity>
          <Button
          titleStyle={{fontFamily:FontFamily.sourceSansProBold}}
            title="Change password"
            onPress={handleSubmit}
            buttonStyle={[styles.button,{marginTop:'30%'}]}

            loading={formData.isLoading}
          />
        </TouchableOpacity>
      </View>
      <Pop2
          main={'You have Successfully Changed your Password'}
          modal={modalVisible}
        />
        

     {modalVisible && <Blur />}
     </>
  );
};

export default PassReset;
