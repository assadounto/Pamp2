import React from 'react';
import {Text, View,SafeAreaView} from 'react-native';
import {styles, colors} from '../../Common_styles';
import Normal from './Normal';
import Late from './late';
import Discount from './discount';
import Canceled from './canceled';
import Completed from './completed';
import Booked from './booked';

const Notifications= () => {
  return (
    <SafeAreaView
      style={{
       backgroundColor:'#F9F9F9',gap: 30,
      }}>
       <Normal/>
       <Booked/>
       <Late/>
       <Canceled/>
       <Completed/>
       <Discount/>
    </SafeAreaView>
  );
};

export default Notifications;
