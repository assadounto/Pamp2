import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../screens/start_screens/Login';
import Register from '../screens/start_screens/Create_account';
import {useSelector} from 'react-redux';
import Getting_started from '../screens/start_screens/Getting_started';
import ForgotPassword from '../screens/start_screens/forgot_password';
import ResetPassword from '../screens/start_screens/ResetPassword';
import VerifyEmail from '../screens/start_screens/VerifyYourEmail';
import VerifyNumber from '../screens/start_screens/VerifyNumber';
import Turnon from '../screens/start_screens/TurnonNotifications';
import { login } from '../redux/user';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const {first_time} = useSelector(state => state.user);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: '#fff',
          },
        }}>
        {first_time ? (
          <Stack.Screen name="GettingStarted" component={Getting_started} />
        ) : (
          
          <Stack.Screen name="login" component={Login} />
        )}
        <Stack.Screen name="login2" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
        <Stack.Screen name="VerifyNumber" component={VerifyNumber} />
        <Stack.Screen name="noti" component={Turnon} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
