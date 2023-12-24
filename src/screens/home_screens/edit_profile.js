import React, { useState } from 'react';
import BHeader from '../../../components/BHeader';
import { colors, styles } from '../../Common_styles';
import { View, TextInput, Text, ScrollView, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { Button } from '@rneui/base';
import axios from 'axios';
import { backendURL } from '../../services/http';
import { useSelector } from 'react-redux';
import { State } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import {setUser } from '../../redux/user';
import Pop2 from '../start_screens/pop2';
import Blur from '../start_screens/Blur';
const Edit_profile = ({navigation}) => {
  const user= useSelector(state=>state.user.userInfo)
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [dateOfBirth, setDateOfBirth] = useState(user.date_of_birth);
  const [gender, setGender] = useState(user.gender);
  const [address, setAddress] = useState(user.address);
  const [isEmailDisabled, setIsEmailDisabled] = useState(true); // Set to true to disable email input initially
  const [modal,setModal]=useState(false)
   const dispatch= useDispatch()
  const handleSave = () => {
    // Construct the data to be sent in the PATCH request
    const userData = {
      name,
      username,
     // phone,
      date_of_birth: dateOfBirth,
      gender,
      address,
      id: user.id
    };

 

    // Send the PATCH request to the /user endpoint with updated data
    axios
      .patch(`${backendURL}/user`, userData)
      .then((response) => {
        // Handle the response from the server, e.g., show a success message, update state, etc.
       dispatch(setUser(response.data))
       setModal(true)
       setTimeout(() => {
        setModal(false);
        navigation.navigate('Profile')
      }, 4000);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error updating user data:', error);
      });
  };

  return (
    <><SafeAreaView style={[styles.EP]}>
      <BHeader title="Edit info" color={colors.dg2.color} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust behavior for iOS and Android
      >
      <ScrollView
     // contentContainerStyle= {{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
         <View style={{flex:1,marginBottom:120}}>
        <Text style={[styles.P1, { paddingHorizontal: 40, marginBottom: 10 }]}>First name</Text>
        <TextInput
        
          style={[styles.EI]}
          value={username}
          onChangeText={setUsername} />
        <Text style={[styles.P1, { paddingHorizontal: 40, marginBottom: 10 }]}>Last name</Text>
        <TextInput
          style={[styles.EI]}
          value={name}
          onChangeText={setName} />
        <Text style={[styles.P1, { paddingHorizontal: 40, marginBottom: 10 }]}>Phone number</Text>
        <TextInput
          style={[styles.EI]}
          value={phone}
          onChangeText={setPhone} />
        <Text style={[styles.P1, { paddingHorizontal: 40, marginBottom: 10 }]}>Email Address</Text>
        <TextInput
          style={[styles.EI]}
          value={email}
          onChangeText={setEmail}
          disabled={isEmailDisabled} // Disable email input
        />
        <Text style={[styles.P1, { paddingHorizontal: 40, marginBottom: 10 }]}>Date of birth</Text>
        <TextInput
         placeholder={'dd/mm/yyyy'}
          style={[styles.EI]}
          value={dateOfBirth}
          onChangeText={setDateOfBirth} />
        <Text style={[styles.P1, { paddingHorizontal: 40, marginBottom: 10 }]}>Gender</Text>
        <TextInput
          style={[styles.EI]}
          value={gender}
          onChangeText={setGender} />
        <Text style={[styles.P1, { paddingHorizontal: 40, marginBottom: 10 }]}>Address</Text>
        <TextInput
          style={[styles.EI]}
          value={address}
         
          onChangeText={setAddress} />
        <Button
          title="Save"
          buttonStyle={{
            backgroundColor: '#86D694',
            width: '50%',
            borderRadius: 20,
            marginBottom:30,
            alignSelf: 'center',
            height: 50,
          }}
          onPress={handleSave} />
          </View> 
      </ScrollView>
</KeyboardAvoidingView>
    </SafeAreaView><Pop2  modal={modal} main='Profile updated successfully' />
    {modal&&<Blur/>}
    </>
  );
};

export default Edit_profile;
