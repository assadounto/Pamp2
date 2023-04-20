import React from 'react';
import {Text, View, SafeAreaView, Image, Modal, TextInput,ImageBackground} from 'react-native';
import {styles, colors} from '../../Common_styles';
import {CheckBox, Button} from '@rneui/base';
import {Border} from '../../GlobalStyles';
import img from '../assets/success.png'
const Success = () => {
  return (
    <View>
        <ImageBackground  style={{width: '100%', height: '100%' }} source={require('../assets/success.png')}/>
    </View>
    
  );
};

export default Success;
