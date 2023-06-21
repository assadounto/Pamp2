import React, { useState } from 'react';
import { View, Text, Pressable,ScrollView,FlatList,Dimensions} from 'react-native';
import { styles ,colors} from '../src/Common_styles';
import { FontFamily } from '../src/GlobalStyles';
import { Icon } from '@rneui/base';
import { navigate } from '@react-navigation/routers/lib/typescript/src/CommonActions';
import { Image } from '@rneui/base';
import closed from '../src/screens/assets/closed2.png'
import { format, addMonths, subMonths } from 'date-fns';
import { set_time } from '../src/redux/booking';
import { useDispatch } from 'react-redux';
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

export default function Calender({onSelect, navigation}) {
    const windowWidth= Dimensions.get('window').width
    const desiredWidth= Math.min(52,windowWidth)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  //const [currentmonth,set_current_month]=useState(defaultLocalizationOptions.monthNames[currentMonth])

  console.log(currentMonth);
  const finditem = day => {
    return dates.findIndex(date => date.aday == day);
  };
  let current_day = new Date().getUTCDate();

  let dates = getCalendar(myLocOpts, currentMonth);
  let caldate = dates.slice(
    current_day<=5 ?  finditem(current_day):
    finditem(current_day) - 2,
    current_day<=5 ?  finditem(current_day)+5:finditem(current_day+3),
  );

  const [data, useData] = useState(caldate);

  const [userOption, setUserOption] = useState(current_day <= 5? data[0]: data[2]);
  const [currentIndex, setcurrentIndex] = useState();
  const [prev, setPrev] = useState('');

  //setUserOption(data[1].day)

  const NextMonth = () => {
    setCurrentMonth(currentMonth + 1);
    dates = getCalendar(myLocOpts, currentMonth + 1);
    useData(dates);
    console.log(data);
  };

  const PrevMonth = () => {
    setCurrentMonth(currentMonth - 1);
    dates = getCalendar(myLocOpts, currentMonth - 1);
    useData(dates);
  };

  const SelectHandler = (value, index) => {
    ///setTimeout(()=>  refFlatList.scrollToIndex({animated:true,index:currentIndex}),2000)
    setcurrentIndex(index);
    onSelect({
      day: value.aday,
      month: defaultLocalizationOptions.monthNames[currentMonth],
      year: 2023,
    });
    setUserOption(value);
    useData(dates.slice(finditem(value.aday) - 2, finditem(value.aday) + 3));
    console.log(userOption);
  };

  const set_dates = value => {
    if (prev === value) {
      useData(caldate)
      setPrev('');
      return;
    } else {
      useData(dates)
      setPrev(value);
      setcurrentIndex('Month')
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
          {' '}
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
  return (
    <>
      <Pressable onPress={() => set_dates('Month')}>
        <Text
          style={{
            
            marginBottom: 30,
            fontFamily: FontFamily.sourceSansProBold,
            fontSize: 20,
            color: colors.dg.color,
            left: 30
          }}>{defaultLocalizationOptions.monthNames[currentMonth]}
        </Text>
      </Pressable>

      {/* <ScrollView horizontal={userOption ==='Month' ?null :true} contentContainerStyle={{ marginLeft: 10,display:'flex',flexDirection:'row',flexWrap:'wrap'}} showsHorizontalScrollIndicator={false}> */}
      <View
        style={{
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
        <FlatList
          data={data}
          key={Date.now()}
          renderItem={renderItem}
          keyExtractor={item => item.aday}
          numColumns={currentIndex === 'Month' ? 5 : null}
          horizontal={currentIndex === 'Month' ? false : true}
          showsHorizontalScrollIndicator={false}
        />
      </View>


<Time navigation={navigation} userOption={userOption}/>
        </>
  );
}

const Time=({navigation,userOption})=>{ 
  const dispatch=useDispatch()
   renderItem=({item,index})=>{
  return (
  
    <Pressable
        style={{}}
        onPress={() => {
         dispatch( set_time(item))
         console.log(item)
        navigation.navigate('Confirm')
          }}>
        <View style={{alignSelf:'center', width:'90%',height:85,borderBottomColor:colors.lg.color,borderBottomWidth:0.9,display:'flex',flexDirection:'row'}}>
          <Text style={{marginTop:30,fontFamily:FontFamily.sourceSansProBold,fontSize:20,color:colors.dg.color}}>{item}</Text>
          <Icon 
           style={{width:30,marginTop:30,marginLeft:190}}
                      name={'chevron-forward'}
                      type="ionicon"
                      onPress={() => setShowPassword(!showPassword)}
                      color={colors.dg.color}
                    />
        </View>
    </Pressable>

);
}

  return(
    <View>
      { userOption.day== 'Sun' ? 
      <Image source={closed} style={{marginTop:40,height:550,width: '100%'}}/> : 
      <><Text style={{ marginTop: 50, fontFamily: FontFamily.sourceSansProBold, fontSize: 20, color: colors.dg.color, marginLeft: 30 }}>Time</Text>
      <FlatList

          data={['09:00 am', '09:30 am', '10:00 am','10:30 am','11:00 am']}
          contentContainerStyle={{
            marginVertical: 10, shadowColor: '#707070', shadowOpacity: 0.2, shadowRadius: 10, elevation:2, shadowOffset: { width: 5, height: 0 }, backgroundColor: 'white', borderRadius: 20, width: '90%',
            alignSelf: 'center', paddingHorizontal: 10
          }}
          renderItem={renderItem}
          keyExtractor={item => item} /></>
      }      
    </View>
  )
}