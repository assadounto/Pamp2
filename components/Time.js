import React, { useState } from 'react';
import { View, Text, Image, FlatList,ScrollView, Pressable } from 'react-native';
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
import { da } from 'date-fns/locale';
import EmptyStateNoti from './EmptyNoti';
import Emptyfav from './EmptyFav';
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
function isCurrentTimeGreaterOrEqual(targetTime, targetDate) {
  const currentTime = new Date();
  const itemTime = new Date(targetDate.year, getMonthNumber(targetDate.month), targetDate.day);
  const timeParts = targetTime.split(':');
  const hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);
  itemTime.setHours(hours, minutes, 0, 0);

  return currentTime >= itemTime;
}

function isDateToday(date) {
  const today = new Date();
  const tdate= new Date(date)

  // Remove time component for both dates
 if (tdate){
  today.setHours(0, 0, 0, 0);
  tdate.setHours(0, 0, 0, 0);
  return tdate.getTime() === today.getTime();
 }


}


function getMonthNumber(monthName) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months.indexOf(monthName);
}
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
                  <View>
                  <Icon
                  style={{ width: 30, marginTop: 30 }}
                  name={'chevron-forward'}
                  type="ionicon"
                  onPress={() => setShowPassword(!showPassword)}
                  color={colors.dg.color}
                />  
                  </View>
                              
                
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
    const intervalMinutes = 30;
  
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
  
    // Extract hours and minutes from opening and closing time
    const [openingHours, openingMinutes] = openingTime.split(":").map(Number);
    const [closingHours, closingMinutes] = closingTime.split(":").map(Number);
  
    // Calculate the starting time (2 hours ahead of the current time)
    let startTime = new Date(currentTime);
   startTime.setHours(currentHour + 2, Math.ceil(currentMinute / intervalMinutes) * intervalMinutes, 0);
  
    // Create a closing time object
    const closingTimeObj = new Date();
    closingTimeObj.setHours(closingHours, closingMinutes, 0);
  
    while (startTime <= closingTimeObj) {
      const hours = startTime.getHours() > 12 ? startTime.getHours() - 12 : startTime.getHours();
      const minutes = startTime.getMinutes().toString().padStart(2, "0");
      const period = startTime.getHours() >= 12 ? "PM" : "AM";
      const timeSlot = `${hours}:${minutes} ${period}`;
  
      timeSlots.push(timeSlot);
  
      startTime.setMinutes(startTime.getMinutes() + intervalMinutes);
    }
    console.log(timeSlots)
    return timeSlots;
  };
  
  
  
  const generateTimeSlots2 = (openingTime, closingTime) => {
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
  const timeSlots = openingTime && closingTime ? isDateToday(userOption.date)? generateTimeSlots(openingTime, closingTime) :generateTimeSlots2(openingTime, closingTime) : [];
  return (
    <ScrollView 
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
     //contentContainerStyle={{ marginBottom: 700 }}
     >
      {isVendorOpen() ? (
        <>
          <Text style={{ marginVertical: 20, fontFamily: FontFamily.sourceSansProBold, fontSize: 20, color: colors.dg.color, marginLeft: 30 }}>Time</Text>
         
         { timeSlots.length==0 ?
          <Emptyfav title={"Vendor is not accepting bookings at this time"} />
          :<View  style={{
                 marginBottom: 300,
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
               
               }}>
          {timeSlots.map((item, index) => (
            <Pressable
              key={item}
              style={{ }}
              onPress={() => {
              
                dispatch(set_time(item));
                rebooked ? rebook(item) : navigation.navigate('Confirm');
              }}
            >
              <ListItem style={{ borderBottomColor: index === timeSlots.length - 1 ? 'transparent' : colors.lg.color, borderBottomWidth: index === timeSlots.length - 1 ? 0 : 1 }}>
                <Text
                  style={{
                    marginVertical: 10,
                    fontFamily: FontFamily.sourceSansProBold,
                    fontSize: 20,
                    color: colors.dg.color,
                  }}
                >
                  {item}
                </Text>
                <ListItem.Content></ListItem.Content>
                <View>
                  <Icon
                    style={{ width: 30, marginVertical: 10 }}
                    name={'chevron-forward'}
                    type="ionicon"
                    onPress={() => setShowPassword(!showPassword)}
                    color={colors.dg.color}
                  />
                </View>
              </ListItem>
            </Pressable>
          ))}
          </View>
                   }
        </>

      ) : (
        <Closed name={name} />
      )}
    </ScrollView>
  
  );
      }
export default Time;
