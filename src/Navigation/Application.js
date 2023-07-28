import * as React from 'react';
import {StatusBar} from 'react-native';
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
const Stack = createStackNavigator();

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
        <Stack.Screen name="main" component={MainNavigator} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="edit_profile" component={Edit_profile} />
        <Stack.Screen name="change_email" component={Change_email} /> 
        <Stack.Screen name="change_pass" component={Change_pass} /> 
        <Stack.Screen name="Search" component={Search2} /> 
        <Stack.Screen name="Searches1" component={Searches1} /> 
        <Stack.Screen name="VendorDetail" component={VendorDetail} /> 
        <Stack.Screen name="SelectDate" component={SelectDate} /> 
        <Stack.Screen name="All_notifications" component={Notifications} /> 
        <Stack.Screen name='Mapview' component={Mapview}/> 
        <Stack.Screen name={'Confirm'} component={Confirm_payment}/> 
        <Stack.Screen name={'Success'} component={Success}/> 
        <Stack.Screen name={'Select_payment'} component={Select_payment}/> 
        <Stack.Screen name={'Add_payment'} component={Add_payment}/> 
        <Stack.Screen name={'Booking_detail'} component={Booking_detail}/>
        <Stack.Screen name={'Processing'} component={Processing}/>
        <Stack.Screen name={'Invite'} component={Invite}/>
        <Stack.Screen name={'Help'} component={Help}/>
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
        <Stack.Screen name="Reviews" component={Ratings} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
