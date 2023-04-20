import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import VerifyYourEmail from '../screens/start_screens/VerifyYourEmail';
import {NavigationContainer} from '@react-navigation/native';
import VerifyNumber from '../screens/start_screens/VerifyNumber';
import Home from '../screens/home_screens/Home';
const Stack = createStackNavigator();

const VerificationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="VerifyEmail" component={VerifyYourEmail} />
        <Stack.Screen name="VerifyPhone" component={VerifyNumber} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default VerificationStack;
