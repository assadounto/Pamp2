import React, { useState } from 'react';
import { View, Text, Image, FlatList, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { set_time } from '../src/redux/booking';
import { FontFamily } from '../src/GlobalStyles';
import { colors } from '../src/Common_styles';
import { Icon } from '@rneui/base';
import closed from '../src/screens/assets/closed2.png';
import Closed from './closed';
import { ListItem } from '@rneui/base';
import Blur from '../src/screens/start_screens/Blur';
import Pop2 from '../src/screens/start_screens/pop2';
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

const Time = ({ navigation, userOption,rebooked,rebook}) => {
  const dispatch = useDispatch();
 const openingHours = useSelector((state) => state.booking.vendor);

  const name = useSelector((state) => state.booking.vendor_name);
  const date = useSelector((state) => state.booking.date);
   
 
  const renderItem = ({ item,index }) => {
    const isLastItem = index === timeSlots.length - 1;
    return (
      <Pressable
        style={{}}
        onPress={() => {
          dispatch(set_time(item));
          rebooked? rebook(item):
          navigation.navigate('Confirm');
        }}
        
      >
       
       <ListItem style={{ borderBottomColor: isLastItem ? 'transparent' : colors.lg.color,
            borderBottomWidth: isLastItem ? 0 : 1}}>
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
                  <ListItem.Content>
                  
                  </ListItem.Content>
                  <Icon
                  style={{ width: 30, marginTop: 30, marginLeft: 190 }}
                  name={'chevron-forward'}
                  type="ionicon"
                  onPress={() => setShowPassword(!showPassword)}
                  color={colors.dg.color}
                />              
                
                </ListItem> 
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
    
    // Extract hours and minutes from opening and closing time
    const [openingHours, openingMinutes] = openingTime.split(":").map(Number);
    const [closingHours, closingMinutes] = closingTime.split(":").map(Number);
    
    let currentTime = new Date();
    currentTime.setHours(openingHours);
    currentTime.setMinutes(openingMinutes);
    
    const closingTimeObj = new Date();
    closingTimeObj.setHours(closingHours);
    closingTimeObj.setMinutes(closingMinutes);
    
    while (currentTime <= closingTimeObj) {
      const hours = currentTime.getHours() > 12 ? currentTime.getHours() - 12 : currentTime.getHours();
      const minutes = currentTime.getMinutes().toString().padStart(2, "0");
      const period = currentTime.getHours() >= 12 ? "PM" : "AM";
      const timeSlot = `${hours}:${minutes} ${period}`;
    
      timeSlots.push(timeSlot);
    
      currentTime.setMinutes(currentTime.getMinutes() + 30);
    }
    
    return timeSlots;
  };
  
  // Example usage:

  
  
    
  
  

  const vendor = openingHours.find((item) => item.day === getLongDayName(userOption.day));
  
  const openingTime = vendor ? vendor.opening_time : null;
  const closingTime = vendor ? vendor.closing_time : null;
  const timeSlots = openingTime && closingTime ? generateTimeSlots(openingTime, closingTime) : [];
 
  return (
    <View        style={{marginBottom:700}} >
      {isVendorOpen() ? (
        <>
          <Text style={{ marginVertical: 20, fontFamily: FontFamily.sourceSansProBold, fontSize: 20, color: colors.dg.color, marginLeft: 30 }}>Time</Text>
          <FlatList
            data={timeSlots}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
             
              marginVertical: 15,
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
