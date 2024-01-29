import * as React from 'react';
import {StatusBar,Animated} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Profile from '../screens/home_screens/Profile';
import Edit_profile from '../screens/home_screens/edit_profile';
import MainNavigator from './Main';
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
import VerifyEmail from '../screens/start_screens/VerifyYourEmail';
import Change_pass from '../screens/home_screens/Change_pass';
import Ratings from '../screens/home_screens/Ratings';
import Discount from '../screens/home_screens/Discount';
import DiscountFullInfo from '../screens/home_screens/DiscountInfoFull';
import { TransitionPresets} from '@react-navigation/stack';
const Stack = createStackNavigator();

const forFade2 = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});



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
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator
      
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: '#fff',

          },
        }}>
        <Stack.Screen options={{ cardStyleInterpolator: forFade2 }}  name="main" component={MainNavigator} />
        <Stack.Screen name="Profile" options={{    ...TransitionPresets.ScaleFromCenterAndroid}} component={Profile} />
        <Stack.Screen name="edit_profile"  options={{ cardStyleInterpolator: forFade2 }}   component={Edit_profile} />
        <Stack.Screen name="change_email"  options={{    ...TransitionPresets.ScaleFromCenterAndroid}} component={Change_email} /> 
        <Stack.Screen name="change_pass" options={{    ...TransitionPresets.ScaleFromCenterAndroid}}  component={Change_pass} /> 
        <Stack.Screen 
             options={{presentation:'modal'}}
          name="Search" component={Search2} 
       /> 
          
        <Stack.Screen name="Searches1" options={{ cardStyleInterpolator: forFade2 }} component={Searches1} /> 
        <Stack.Screen name="VendorDetail"  options={{ cardStyleInterpolator: forFade2 }}  component={VendorDetail} /> 
        <Stack.Screen name="SelectDate" options={{    ...TransitionPresets.ScaleFromCenterAndroid}} component={SelectDate} /> 
        <Stack.Screen name="All_notifications" options={{    ...TransitionPresets.ScaleFromCenterAndroid}}  component={Notifications} /> 
        <Stack.Screen name='Mapview'  options={{ cardStyleInterpolator: forFade2 }}  component={Mapview}/> 
        <Stack.Screen name={'Confirm'} options={{ cardStyleInterpolator: forFade2 }} component={Confirm_payment}/> 
        <Stack.Screen name={'Success'}  options={{    ...TransitionPresets.ScaleFromCenterAndroid}}  component={Success}/> 
        <Stack.Screen name={'Select_payment'}  options={{    ...TransitionPresets.ScaleFromCenterAndroid}} component={Select_payment}/> 
        <Stack.Screen name={'Add_payment'} options={{    ...TransitionPresets.ScaleFromCenterAndroid}} component={Add_payment}/> 
        <Stack.Screen name={'Booking_detail'} options={{    ...TransitionPresets.ScaleFromCenterAndroid}} component={Booking_detail}/>
        <Stack.Screen name={'Processing'} options={{    ...TransitionPresets.ScaleFromCenterAndroid}} component={Processing}/>
        <Stack.Screen name={'Invite'} options={{    ...TransitionPresets.ScaleFromCenterAndroid}} component={Invite}/>
        <Stack.Screen name={'Help'} options={{    ...TransitionPresets.ScaleFromCenterAndroid}} component={Help}/>
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
        <Stack.Screen name="Reviews" options={{    ...TransitionPresets.ScaleFromCenterAndroid}} component={Ratings} />
        <Stack.Screen name="discount" options={{    ...TransitionPresets.ScaleFromCenterAndroid}} component={Discount} />
        <Stack.Screen name="discountfull" options={{ cardStyleInterpolator: forFade2 }}  component={DiscountFullInfo} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
