import React from 'react';
import {Text, View, SafeAreaView, Image, Modal, TextInput,ImageBackground, Pressable} from 'react-native';
import {styles, colors} from '../../Common_styles';
import {CheckBox, Button} from '@rneui/base';
import {Border} from '../../GlobalStyles';
import img from '../assets/success.png'
import { useNavigation } from '@react-navigation/core';
import SucessPop from '../../../components/SuccessPop';
const Success = () => {
  const navigation=useNavigation()
  return (
    
        <><ImageBackground style={{ width: '100%', height: '100%' }} source={require('../../../assets/success.png')} /><SucessPop /></>
 
    
  );
};

export default Success;
