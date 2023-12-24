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
import ResetAccount from '../screens/start_screens/ResetAccount';
import PassReset from '../screens/start_screens/PaswordReset';
import { TransitionPresets} from '@react-navigation/stack';

import { login } from '../redux/user';

const Stack = createStackNavigator();
const forFade2 = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

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
          <Stack.Screen options={{ cardStyleInterpolator: forFade2 }}  name="GettingStarted" component={Getting_started} />
        ) : (
          
          <Stack.Screen options={{ cardStyleInterpolator: forFade2 }}  name="login" component={Login} />
        )}
        <Stack.Screen options={{ cardStyleInterpolator: forFade2 }}  name="login2" component={Login} />
        <Stack.Screen  name="Register" component={Register} />
        <Stack.Screen options={{ cardStyleInterpolator: forFade2 }}  name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen options={{ cardStyleInterpolator: forFade2 }}  name="ResetPassword" component={ResetPassword} />
        <Stack.Screen options={{ cardStyleInterpolator: forFade2 }}  name="VerifyEmail" component={VerifyEmail} />
        <Stack.Screen options={{ cardStyleInterpolator: forFade2 }}  name="VerifyNumber" component={VerifyNumber} />
        <Stack.Screen options={{ cardStyleInterpolator: forFade2 }}  name="noti" component={Turnon} />
        <Stack.Screen options={{ cardStyleInterpolator: forFade2 }}  name="ResetAccount" component={ResetAccount} />
        <Stack.Screen options={{ cardStyleInterpolator: forFade2 }}  name="PassReset" component={PassReset} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
