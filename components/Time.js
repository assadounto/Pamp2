import React from 'react';
import { View, Text, Image, FlatList, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { set_time } from '../src/redux/booking';
import { FontFamily } from '../src/GlobalStyles';
import { colors } from '../src/Common_styles';
import { Icon } from '@rneui/base';
import closed from '../src/screens/assets/closed2.png';
import Closed from './closed';

const getLongDayName = (day) => {
  switch (day) {
    case 'Mon':
      return 'Monday';
    case 'Tue':
      return 'Tuesday';
    case 'Wed':
      return 'Wednesday';
    case 'Thu':
      return 'Thursday';
    case 'Fri':
      return 'Friday';
    case 'Sat':
      return 'Saturday';
    case 'Sun':
      return 'Sunday';
    default:
      return '';
  }
};

const Time = ({ navigation, userOption }) => {
  const dispatch = useDispatch();
  const openingHours = useSelector((state) => state.booking.vendor);
  const name = useSelector((state) => state.booking.vendor_name);
  
  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={{}}
        onPress={() => {
          dispatch(set_time(item));
          console.log(item);
          navigation.navigate('Confirm');
        }}
      >
        <View
          style={{
            alignSelf: 'center',
            width: '90%',
            height: 85,
            borderBottomColor: colors.lg.color,
            borderBottomWidth: 0.9,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              marginTop: 30,
              fontFamily: FontFamily.sourceSansProBold,
              fontSize: 20,
              color: colors.dg.color,
            }}
          >
            {item}
          </Text>
          <Icon
            style={{ width: 30, marginTop: 30, marginLeft: 190 }}
            name={'chevron-forward'}
            type="ionicon"
            onPress={() => setShowPassword(!showPassword)}
            color={colors.dg.color}
          />
        </View>
      </Pressable>
    );
  };

  const isVendorOpen = () => {
    const currentDay = userOption.day;
    const vendor = openingHours.find((item) => item.day === getLongDayName(currentDay));
    
    if (!vendor || !vendor.opening_time || !vendor.closing_time || !vendor.opened) {
      return false;
    }

    const openingTime = vendor.opening_time;
    const closingTime = vendor.closing_time;
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    return true;
  };
  const generateTimeSlots = (openingTime, closingTime) => {
    const timeSlots = [];
    
    // Add "AM" to opening time and "PM" to closing time
    const openingTimeAmPm = openingTime.endsWith("AM") ? openingTime : openingTime + " AM";
    const closingTimeAmPm = closingTime.endsWith("PM") ? closingTime : closingTime + " PM";
  
    const openingTimeRegex = /(\d{1,2}):(\d{2}) (AM|PM)/;
    const [, openingHours, openingMinutes, openingPeriod] = openingTimeAmPm.match(openingTimeRegex);
    const [, closingHours, closingMinutes, closingPeriod] = closingTimeAmPm.match(openingTimeRegex);
  
    let currentTime = new Date();
    currentTime.setHours(parseInt(openingHours) + (openingPeriod === "PM" ? 12 : 0));
    currentTime.setMinutes(parseInt(openingMinutes));
  
    const closingTimeObj = new Date();
    closingTimeObj.setHours(parseInt(closingHours) + (closingPeriod === "PM" ? 12 : 0));
    closingTimeObj.setMinutes(parseInt(closingMinutes));
  
    while (currentTime <= closingTimeObj) {
      const hours = currentTime.getHours() > 12 ? (currentTime.getHours() - 12) : currentTime.getHours();
      const minutes = currentTime.getMinutes().toString().padStart(2, '0');
      const period = currentTime.getHours() >= 12 ? "PM" : "AM";
      const timeSlot = `${hours}:${minutes} ${period}`;
  
      timeSlots.push(timeSlot);
  
      currentTime.setMinutes(currentTime.getMinutes() + 30);
  
      // Check if the current time exceeds the closing time
      if (currentTime > closingTimeObj) {
        break;
      }
    }
  
    return timeSlots;
  };
    
  
  

  const vendor = openingHours.find((item) => item.day === getLongDayName(userOption.day));
  
  const openingTime = vendor ? vendor.opening_time : null;
  const closingTime = vendor ? vendor.closing_time : null;
  const timeSlots = openingTime && closingTime ? generateTimeSlots(openingTime, closingTime) : [];
  console.log(openingTime,closingTime,timeSlots)
  return (
    <View        style={{marginBottom:700}} >
      {isVendorOpen() ? (
        <>
          <Text style={{ marginVertical: 20, fontFamily: FontFamily.sourceSansProBold, fontSize: 20, color: colors.dg.color, marginLeft: 30 }}>Time</Text>
          <FlatList
            data={timeSlots}
            contentContainerStyle={{
              marginVertical: 10,
              shadowColor: '#707070',
              shadowOpacity: 0.2,
              shadowRadius: 10,
              elevation: 2,
              shadowOffset: { width: 5, height: 0 },
              backgroundColor: 'white',
              borderRadius: 20,
              width: '90%',
              alignSelf: 'center',
              paddingHorizontal: 10,
            
            }}
     
            renderItem={renderItem}
            keyExtractor={(item) => item}
          />
        </>
      ) : (
        // <Image source={closed} style={{ marginTop: 40, height: 550, width: '100%' }} />
        <Closed name={name}/>
      )}
    </View>
  );
};

export default Time;
