import * as React from 'react';
import { StatusBar, Animated, useColorScheme } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Profile from '../screens/home_screens/Profile';
import Edit_profile from '../screens/home_screens/edit_profile';
import MainNavigator from './Main';
import { useSelector } from 'react-redux';
import { useTheme } from '@rneui/themed';
import Change_email from '../screens/home_screens/change_email';
import Search2 from '../../screens/Search2';
import Searches1 from '../screens/home_screens/Searches1';
import VendorDetail from '../screens/home_screens/VendorDetail';
import SelectDate from '../screens/home_screens/SelectDate';
import Notifications from '../screens/notifications/Notifications';
import Mapview from '../screens/home_screens/Mapview';
import Confirm_payment from '../screens/home_screens/Confirm_payment';
import Success from '../screens/home_screens/Sucess';
import Select_payment from '../screens/home_screens/Select_payment';
import Add_payment from '../screens/home_screens/Add_payment';
import Booking_detail from '../screens/home_screens/Booking_details';
import Processing from '../screens/home_screens/Comfirm_momo';
import Invite from '../screens/home_screens/Invite';
import Help from '../screens/home_screens/Help';
import Register from '../screens/start_screens/Create_account';
import { createNavigationContainerRef } from '@react-navigation/native';

import Change_pass from '../screens/home_screens/Change_pass';
import Ratings from '../screens/home_screens/Ratings';
import Discount from '../screens/home_screens/Discount';
import DiscountFullInfo from '../screens/home_screens/DiscountInfoFull';
import Login from '../screens/start_screens/Login';
import ForgotPassword from '../screens/start_screens/forgot_password';
import ResetPassword from '../screens/start_screens/ResetPassword';
import VerifyEmail from '../screens/start_screens/VerifyYourEmail';
import VerifyNumber from '../screens/start_screens/VerifyNumber';
import Turnon from '../screens/start_screens/TurnonNotifications';
import ResetAccount from '../screens/start_screens/ResetAccount';
import PassReset from '../screens/start_screens/PaswordReset';
import { TransitionPresets } from '@react-navigation/stack';
import Getting_started from '../screens/start_screens/Getting_started';
import Location_pop from '../../components/Location_pop';
import ChatScreen from '../screens/home_screens/ChatScreen';
import ChatListScreen from '../screens/home_screens/ChatList';
import NotiMessage from '../screens/home_screens/NotiMessage';
import Activity from '../screens/home_screens/Activity';
import Withdraw from '../screens/home_screens/Withdraw';
import Wallet from '../screens/home_screens/Wallet';
import WInfo from '../screens/home_screens/Withdrawalnfo';
import JoinInfluencer from '../screens/home_screens/JoinInfluencer';
import JoinNow from '../screens/home_screens/JoinNow';
import WhatsNew from '../screens/home_screens/WhatsNew';
import PayoutAndHistory from '../screens/home_screens/PayoutAndHistory';
import History from '../screens/home_screens/PayoutHistory';
import { useThemeMode } from '@rneui/themed';
const Stack = createStackNavigator();

const forFade2 = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});


export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}


const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity },
  };
};




const ApplicationNavigator = () => {
  const { theme } = useTheme();
  const { setMode } = useThemeMode();

  const { first_time } = useSelector(state => state.user);
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{
        colors: {
          primary: theme.colors.background,
          background: theme.colors.background,
          card: theme.colors.background,
          text: theme.colors.black,

        },
        //dark: theme.mode === 'dark',
      }}
    >
      <StatusBar />
      <Stack.Navigator

        screenOptions={{
          headerShown: false,
          cardStyle: {
            background: theme.colors.background,

          },
        }}>
        {first_time ? <Stack.Screen options={{ cardStyleInterpolator: forFade2 }} name="Getting_started" component={Getting_started} /> :
          <>
            <Stack.Screen options={{ cardStyleInterpolator: forFade2 }} name="main2" component={MainNavigator} />
          </>
        }

        <Stack.Screen options={{ cardStyleInterpolator: forFade2 }} name="main" component={MainNavigator} />
        <Stack.Screen name="Profile"  component={Profile} />
        <Stack.Screen name="edit_profile" component={Edit_profile} />
        <Stack.Screen name="change_email" component={Change_email} />
        <Stack.Screen name="change_pass"  component={Change_pass} />
        <Stack.Screen
          options={{ presentation: 'modal' }}
          name="Search" component={Search2}
        />
        <Stack.Screen options={{ presentation: 'modal' }} name="whatsnew" component={WhatsNew} />
        <Stack.Screen name="location" options={{ cardStyleInterpolator: forFade2 }} component={Location_pop} />
        <Stack.Screen name="Searches1" options={{ cardStyleInterpolator: forFade2 }} component={Searches1} />
        <Stack.Screen name="VendorDetail" options={{ cardStyleInterpolator: forFade2 }} component={VendorDetail} />
        <Stack.Screen name="SelectDate" options={{ ...TransitionPresets.ScaleFromCenterAndroid }} component={SelectDate} />
        <Stack.Screen name="notifications" options={{ cardStyleInterpolator: forFade2 }} component={NotiMessage} />
        <Stack.Screen name="Chat" options={{ presentation: 'modal' }} component={ChatScreen} />
        <Stack.Screen name='Mapview' options={{ cardStyleInterpolator: forFade2 }} component={Mapview} />
        <Stack.Screen name={'Confirm'} options={{ cardStyleInterpolator: forFade2 }} component={Confirm_payment} />
        <Stack.Screen name={'Success'} options={{ ...TransitionPresets.ScaleFromCenterAndroid }} component={Success} />
        <Stack.Screen name={'Select_payment'} options={{ ...TransitionPresets.ScaleFromCenterAndroid }} component={Select_payment} />
        <Stack.Screen name={'Add_payment'} options={{ ...TransitionPresets.ScaleFromCenterAndroid }} component={Add_payment} />
        <Stack.Screen name={'Booking_detail'} options={{ ...TransitionPresets.ScaleFromCenterAndroid }} component={Booking_detail} />
        <Stack.Screen name={'Processing'} options={{ ...TransitionPresets.ScaleFromCenterAndroid }} component={Processing} />
        <Stack.Screen name={'Invite'}  component={Invite} />
        <Stack.Screen name={'Help'}  component={Help} />
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
        <Stack.Screen name="Reviews"  component={Ratings} />
        <Stack.Screen name="discount"  component={Discount} />
        <Stack.Screen name="discountfull" options={{ cardStyleInterpolator: forFade2 }} component={DiscountFullInfo} />
        <Stack.Screen name="activity" options={{ cardStyleInterpolator: forFade2 }} component={Activity} />
        <Stack.Screen name="withdraw" options={{ cardStyleInterpolator: forFade2 }} component={Withdraw} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="WithdrawalInfo" component={WInfo} />
        <Stack.Screen name="joinInfluencer" component={JoinInfluencer} />
        <Stack.Screen name="payoutandhistory" component={PayoutAndHistory} />
        <Stack.Screen name="history" component={History} />

        <Stack.Screen options={{ presentation: 'modal' }} name="JoinNow" component={JoinNow} />


        <Stack.Screen options={{ presentation: 'modal' }} name="login" component={Login} />
        <Stack.Screen options={{ presentation: 'modal' }} name="Register" component={Register} />
        <Stack.Screen options={{ presentation: 'modal' }} name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen options={{ presentation: 'modal' }} name="ResetPassword" component={ResetPassword} />
        <Stack.Screen options={{ presentation: 'modal' }} name="VerifyEmailOne" component={VerifyEmail} />
        <Stack.Screen options={{ presentation: 'modal' }} name="VerifyNumber" component={VerifyNumber} />
        <Stack.Screen options={{ presentation: 'modal' }} name="noti" component={Turnon} />
        <Stack.Screen options={{ presentation: 'modal' }} name="ResetAccount" component={ResetAccount} />
        <Stack.Screen options={{ presentation: 'modal' }} name="PassReset" component={PassReset} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
