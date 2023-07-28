import React, { useState } from 'react';
import { Alert, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Input, Button,Icon } from '@rneui/base';
import { styles } from '../../Common_styles';
import axios from 'axios';
import { backendURL } from '../../services/http';
import BHeader from '../../../components/BHeader';
import Blur from '../start_screens/Blur';
import Pop2 from '../start_screens/pop2';
import { useSelector } from 'react-redux';
const Change_pass = ({ navigation }) => {
  const user =useSelector((state)=>state.user.userInfo)
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModal] = useState(false);
  const [formData, setFormData] = useState({
    current_password: '', // Current Password field
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
    const { current_password, new_password, confirm_password } = formData;

    if (!current_password || !new_password || !confirm_password) {
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
      const { data } = await axios.post(`${backendURL}/user/password/reset`, {
        id: 3,
        current_password,
        new_password,
      });

      if (data === 'ok') {
        // Password change successful
        // Perform any necessary actions here

        setFormData((prevData) => ({
          ...prevData,
          isLoading: false,
        }));
        setModal(true);
        setTimeout(() => {
            setModal(false);
            navigation.navigate('main')
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
    <SafeAreaView style={{ flex: 1 }}>
     
      <BHeader title={'Change Password'} />

      <View style={{ alignSelf: 'center', marginTop: 40 }}>
        <Input
          placeholder="Current Password"
          inputContainerStyle={[styles.textInput]}
          secureTextEntry={!showPassword}
          rightIcon={
            <Icon
              name={showPassword ? 'eye' : 'eye-off'}
              type="ionicon"
              onPress={() => setShowPassword(!showPassword)}
              color="#BBB9BC"
            />
          }
          onChangeText={(value) => handleChange('current_password', value)}
        />

        <Input
          placeholder="New Password"
          inputContainerStyle={[styles.textInput]}
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

        <Input
          placeholder="Confirm Password"
          inputContainerStyle={[styles.textInput]}
          secureTextEntry={!showPassword}
          rightIcon={
            <Icon
              name={showPassword ? 'eye' : 'eye-off'}
              type="ionicon"
              onPress={() => setShowPassword(!showPassword)}
              color="#BBB9BC"
            />
          }
          onChangeText={(value) => handleChange('confirm_password', value)}
        />

        <TouchableOpacity>
          <Button
            title="Save"
            onPress={handleSubmit}
            buttonStyle={styles.button}
            loading={formData.isLoading}
          />
        </TouchableOpacity>
      </View>
      <Pop2
          main={'You have Successfully verified your Email'}
          modal={modalVisible}
        />
        
    </SafeAreaView>

     {modalVisible && <Blur />}
     </>
  );
};

export default Change_pass;
