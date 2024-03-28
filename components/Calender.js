
import React, {useState,useEffect, useRef} from 'react';
import {View, Text, Pressable, ScrollView, FlatList,Dimensions,PanResponder, Alert, ActivityIndicator} from 'react-native';
import {styles, colors} from '../src/Common_styles';
import {FontFamily} from '../src/GlobalStyles';
import {Icon} from '@rneui/base';
import {navigate} from '@react-navigation/routers/lib/typescript/src/CommonActions';
import {Image} from '@rneui/base';
import { backendURL } from '../src/services/http';
import axios from 'axios';
import { verticalScale } from '../src/Dimensions';
import {format, addMonths, subMonths} from 'date-fns';
import {useDispatch} from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import Time from './Time';
import Swipeable from 'react-native-gesture-handler/Swipeable';
const DAY_IN_MILLIS = 24 * 60 * 60 * 1000;
const defaultLocalizationOptions = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
};
let myLocOpts = {dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']};
let currDate = new Date().getMonth();
//let currentmonth = defaultLocalizationOptions.monthNames[currDate]
//console.log(getCalendar(2023, myLocOpts)); // Get a calendar for the year 2 020

function getCalendar(localizationOptions, currentMonth) {
  // Merge default and custom localization options.
  let locOpts = Object.assign(
    {},
    defaultLocalizationOptions,
    localizationOptions,
  );
  let currDate = new Date(Date.UTC(2023, 0, 0, 0, 0, 0));
  addDay(currDate); // Add a day
  let calendar = {};
  while (currDate.getUTCFullYear() < 2023 + 1) {
    let month = locOpts.monthNames[currDate.getUTCMonth()];
    let daysOfMonth = calendar[month] || [];
    daysOfMonth.push({
      aday: currDate.getUTCDate(),
      day: locOpts.dayNames[currDate.getUTCDay()],
    });
    calendar[month] = daysOfMonth;
    addDay(currDate);
  }
  return calendar[defaultLocalizationOptions.monthNames[currentMonth]];
}

function addDay(date) {
  date.setTime(date.getTime() + DAY_IN_MILLIS); // Add a day
  return date;
}


export default function Calender({onSelect, navigation,rebooked,rebook,vendor}) {
  const vendor_id= useSelector((state)=>state.user.userInfo?.id)
    const windowWidth= Dimensions.get('window').width
    const desiredWidth= Math.min(52,windowWidth)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  //const [currentmonth,set_current_month]=useState(defaultLocalizationOptions.monthNames[currentMonth])
  const [isLoading, setIsLoading] = useState(true); // State to manage loading spinner
  console.log(currentMonth);
  const finditem = day => {
    const index = data.findIndex(date => date.aday === day);
    return index !== -1 ? index : data.length;
  };
  

const weekdays=['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  useFocusEffect(
    React.useCallback(() => {
    const vendorId = 1;
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    getDatesForMonth(year, month, vendor_id);
  }, [])
  );


  const monthMap = {
    January: '01',
    February: '02',
    March: '03',
    April: '04',
    May: '05',
    June: '06',
    July: '07',
    August: '08',
    September: '09',
    October: '10',
    November: '11',
    December: '12'
  };
  let current_day = new Date().getUTCDate();

  //let dates = getCalendar(myLocOpts, currentMonth);
  //let caldate = dates
  //console.log(dates)
  // .slice(
  //   current_day<=5 ?  finditem(current_day):
  //   finditem(current_day) - 2,
  //   current_day<=5 ?  finditem(current_day)+5:finditem(current_day+3),
  // );
  const currentDate = new Date();
  const currentDay = currentDate.getDate();

  const [data, useData] = useState([]);
  const [currentMonthName, setCurrentMonthName] = useState('');
  const [userOption, setUserOption] = useState({aday:currentDay});
  const [currentIndex, setcurrentIndex] = useState('');
  const [prev, setPrev] = useState('');
   const [prevDates,setPrevDates]= useState([])

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Check the horizontal distance of the gesture
        const { dx } = gestureState;
        if (Math.abs(dx) > 50) {
          // If the horizontal distance is greater than 50, determine swipe direction
          if (dx > 0) {
            // Swipe right: Go to previous month
            PrevMonth();
          } else {
            // Swipe left: Go to next month
            NextMonth();
          }
        }
      },
    })
  ).current;

  const getMonthName = (month) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month - 1];
  };

  const fetchDates = async (year, month, vendorId) => {
    setIsLoading(true); 
    const response = await axios.get(`${backendURL}/dates?year=${year}&month=${month}&vendor_id=${1}`);
    setIsLoading(false); 
    return response.data;
  };

  const getDatesForMonth = async (year, month, vendorId) => {
    const data = await fetchDates(year, month, vendorId);
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const weekDay = currentDate.getDay();
if (currentIndex=='Month'){
     useData(data)   
} else{
  let slicedDates= sliceData(data)
 
  setPrevDates(data)
  setUserOption({aday:currentDay,day:weekdays[weekDay],date:data[0].year  +'-' +monthMap[getMonthName(month)]+'-'+userOption.aday})

  useData(slicedDates);
}
console.log(weekdays[weekDay],'jjjjj',weekDay)
    setCurrentMonthName(data[0].year  +'-' +monthMap[getMonthName(month)]+'-'+userOption.aday);
  
  };

 
  //setUserOption(data[1].day)


  const sliceData=(data)=>{
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
  
    let start;
    let end;
    if (data.length <= 5) {
      start = 0;
      end = data.length;
    } else if (currentDay <= 2) {
      start = 0;
      end = 5;
    } else if (currentDay >= data.length - 2) {
      start = data.length - 5;
      end = data.length;
    } else {
      start = currentDay - 3;
      end = currentDay + 2;
    }
  
  
    const slicedDates = data.slice(start, end);
    return slicedDates
  }
  
  const handleNextMonth = async () => {
    const currentYear = data[0].year;
    const currentMonth = data[0].month;
    let year = currentYear;
    let month = currentMonth + 1;
    if (month > 12) {
      year += 1;
      month = 1;
    }
    await getDatesForMonth(year, month, vendor_id);
  };

  const handlePreviousMonth = async () => {
    const currentYear = data[0].year;
    const currentMonth = data[0].month;
    let year = currentYear;
    let month = currentMonth - 1;
    if (month < 1) {
      year -= 1;
      month = 12;
    }
    await getDatesForMonth(year, month, vendor_id);
  };

  const SelectHandler = (value, index) => {
    ///setTimeout(()=>  refFlatList.scrollToIndex({animated:true,index:currentIndex}),2000)
    setcurrentIndex(index);
    const date= currentMonthName.split('-')[0]+'-'+currentMonthName.split('-')[1]+'-'+ value.aday
    console.log(value)
    onSelect(
         date
      );
      // currentMonthName.split('-')[0]+'-'+currentMonthName.split('-')[1]+'-'+ value.aday

      console.log(currentMonthName.split('-')[0]+'-'+currentMonthName.split('-')[1]+'-'+ value.aday)
    setUserOption({...value,date});
    handleDateSelect(value.aday)
    // useData(data.slice(finditem(value.aday) - 2, finditem(value.aday) + 3));

  };



  const handleDateSelect = (selectedDate) => {
    const index = data.findIndex((date) => date.aday === selectedDate);
    let start = index - 2;
    let end = index + 2;

    if (start < 0) {
      start = 0;
      end = Math.min(4, data.length - 1);
    }

    if (end > data.length - 1) {
      end = data.length - 1;
      start = Math.max(0, end - 4);
    }

    const slicedDates = data.slice(start, end + 1);
    useData(slicedDates);
  };



  const set_dates = value => {
    if (prev === value) {
      setcurrentIndex('')
      let  newdata= sliceData(data)
      useData(newdata)
      setPrev('');
      return;
    } else {
      setcurrentIndex('Month')
      setPrev(value);
     useData(prevDates)
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <Pressable
        style={
          item.aday === userOption.aday
            ? [
                styles.selected,
                {width:  desiredWidth, height: 55, borderRadius: 15},
              ]
            : [
                styles.unselected,
                {borderRadius: 15, width:  desiredWidth, height: 55},
              ]
        }
        onPress={() => {
          SelectHandler({day: item.day, aday: item.aday}, index);
        }}>
        <Text
          style={[
            styles.option,
            item.aday == userOption.aday ? colors.w : colors.dg,
          ]}>
         
          {item.day}
        </Text>
        <Text
          style={[
            styles.option,
            item.aday == userOption.aday ? colors.w : colors.dg,
          ]}>
          {' '}
          {item.aday} 
        </Text>
       
      </Pressable>
    );
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{marginTop: verticalScale(100)}}>
     <LottieView
              source={require('../assets/lottie/calender.json')}
              style={{ width:209, height: 150 }}
              autoPlay
              loop={false}
            />
            </View>
      </View>
    );
  }
  return (
    <>
      <Pressable {...panResponder.panHandlers} onPress={() =>{set_dates('Month')}}>
        <Text
          style={{
            
            marginBottom: 30,
            fontFamily: FontFamily.sourceSansProBold,
            fontSize: 20,
            color: colors.dg.color,
            textAlign:'center'
          }}>{userOption.aday} {getMonthName(currentMonthName.split('-')[1])}  {currentMonthName.split('-')[0]}
        </Text>
      </Pressable>

      {/* <ScrollView horizontal={userOption ==='Month' ?null :true} contentContainerStyle={{ marginLeft: 10,display:'flex',flexDirection:'row',flexWrap:'wrap'}} showsHorizontalScrollIndicator={false}> */}
     
      <View
        style={{
          
          height:  data.length>6 ? '45%':undefined,
          width: '90%',
          alignSelf: 'center',
          justifyContent: 'space-between',
          paddingTop: 20,
          alignItems: 'center',
          shadowColor: '#707070',
          shadowOpacity: 0.2,
          shadowRadius: 10,
          elevation: 2,
          shadowOffset: {width: 5, height: 0},
          backgroundColor: 'white',
          borderRadius: 20,
          marginBottom:20
        }}>

          { data ?
  <FlatList
  data={data}
  key={Date.now()}
  renderItem={renderItem}
  keyExtractor={item => item.aday}
  numColumns={currentIndex === 'Month' ? 5 : null}
  horizontal={currentIndex === 'Month' ? false : true}
  showsHorizontalScrollIndicator={false}
  showsVerticalScrollIndicator={false}
/>
      : <Text>hjhbvhjavbxjhavxbhjavxbja</Text>  }
      {
        data.length>6 &&
        <View style={{display:'flex', justifyContent:'center',alignContent:'center',alignItems:'center', flexDirection:'row',height:50,padding:10,}}>
        <TouchableOpacity style={{marginHorizontal:20,}} onPress={handlePreviousMonth}><Image resizeMode='contain' style={{width:20,height:20}} source={require('../assets/chevronright63.png')}/></TouchableOpacity>
       <TouchableOpacity onPress={handleNextMonth}><Image resizeMode='contain' style={{width:20,height:20}} source={require('../assets/chevronright64.png')}/></TouchableOpacity>
        </View>
      }
    
   
      </View>
      <Time rebook={rebook} _vendor={vendor} rebooked={rebooked} navigation={navigation} userOption={userOption}/>

     
    </>
  );
}

