import React, { useState } from 'react';
import { View, Text, Pressable,ScrollView,FlatList} from 'react-native';
import { styles ,colors} from '../src/Common_styles';
import { FontFamily } from '../src/GlobalStyles';
import { Icon } from '@rneui/base';
import { navigate } from '@react-navigation/routers/lib/typescript/src/CommonActions';
import { Image } from '@rneui/base';
import closed from '../src/screens/assets/closed2.png'


const DAY_IN_MILLIS = 24 * 60 * 60 * 1000;
const defaultLocalizationOptions = {
  monthNames : [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ],
  dayNames : [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ]
};
let myLocOpts = { dayNames : [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ] };
let currDate = new Date().getMonth();
let currentmonth = defaultLocalizationOptions.monthNames[currDate] 
//console.log(getCalendar(2023, myLocOpts)); // Get a calendar for the year 2 020

function getCalendar(localizationOptions) {
  // Merge default and custom localization options.
  let locOpts = Object.assign({}, defaultLocalizationOptions, localizationOptions);
  let currDate = new Date(Date.UTC(2023, 0, 0, 0, 0, 0));
  addDay(currDate); // Add a day
  let calendar = {};
  while (currDate.getUTCFullYear() < 2023 + 1) {
    let month = locOpts['monthNames'][currDate.getUTCMonth()];
    let daysOfMonth = calendar[month] || [];
    daysOfMonth.push({
      aday : currDate.getUTCDate(),
      day : locOpts['dayNames'][currDate.getUTCDay()],
    });
    calendar[month] = daysOfMonth;
    addDay(currDate);
  }
  return calendar['April'];
}

function addDay(date) {
  date.setTime(date.getTime() + DAY_IN_MILLIS); // Add a day
  return date;
}


export default function Calender({ onSelect,navigation }) {
  const finditem=(day)=>{
    return dates.findIndex((date)=>date.aday==day)
   } 
  let current_day = new Date().getUTCDate()

  let dates= getCalendar(myLocOpts)
  let caldate= dates.slice(finditem(current_day)-2,finditem(current_day)+3)
 
  
  const  [data,useData]= useState(caldate)
  
  const [userOption, setUserOption] = useState(data[2]);
   const [currentIndex,setcurrentIndex]= useState();
   
   //setUserOption(data[1].day)

  

  const selectHandler = (value,index) => {
  ///setTimeout(()=>  refFlatList.scrollToIndex({animated:true,index:currentIndex}),2000)
    setcurrentIndex(index)
    onSelect(value);
    setUserOption(value);
     useData(dates.slice(finditem(value.aday)-2,finditem(value.aday)+3))
    console.log(userOption)
  };

  const set_dates=(value)=>{
    value=='Month' && useData(dates)
    setcurrentIndex('Month')
  }
 
   getItemLayout=(data,index)=>{
    return {length : 50,offset:50*index,index}
   }

   renderItem=({item,index})=>{
    return (

      <Pressable
          style={item.aday === userOption.aday ? [styles.selected, { width: 56, height: 55,marginLeft:10 ,borderRadius:15}] : [styles.unselected, {borderRadius:15,marginLeft:10, width: 56, height: 55 }]}
          onPress={() => {
            selectHandler({day:item.day, aday: item.aday},index)
            }}>
          <Text style={[styles.option, item.aday == userOption.aday ? colors.w : colors.dg]}> {item.day}</Text>
          <Text style={[styles.option, item.aday == userOption.aday ? colors.w : colors.dg]}> {item.aday}</Text>
      </Pressable>

  );
  }
  return (
    <>
    <Pressable   onPress={() => set_dates('Month')} >
    <Text style={{marginLeft:30,marginBottom:30,fontFamily:FontFamily.sourceSansProBold,fontSize:20,color:colors.dg.color}}>
     {currentmonth}
    </Text>
    </Pressable>

   
 {/* <ScrollView horizontal={userOption ==='Month' ?null :true} contentContainerStyle={{ marginLeft: 10,display:'flex',flexDirection:'row',flexWrap:'wrap'}} showsHorizontalScrollIndicator={false}> */}
<View style={{ width: '90%',alignSelf:'center',paddingTop:20, paddingHorizontal:10,shadowColor:'#707070',shadowOpacity:0.2,shadowRadius: 10,shadowOffset:{width:5,height:0},backgroundColor:'white', borderRadius:20}}> 
<FlatList

data={data}
key={Date.now()}
renderItem={renderItem}
keyExtractor={item => item.aday}
getItemLayout={getItemLayout}
 numColumns={currentIndex==='Month' ? 5 : null}
horizontal={currentIndex==='Month' ? false: true} 

showsHorizontalScrollIndicator={false}

/>
</View>

<Time navigation={navigation} userOption={userOption}/>
        </>
  );
}

const Time=({navigation,userOption})=>{ 
   renderItem=({item,index})=>{
  return (
  
    <Pressable
        style={{}}
        onPress={() => {
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
      <Image source={closed} style={{marginTop:40,height:500,width: '100%'}}/> : 
      <><Text style={{ marginTop: 50, fontFamily: FontFamily.sourceSansProBold, fontSize: 20, color: colors.dg.color, marginLeft: 30 }}>Time</Text><FlatList

          data={['09:00am', '09:30am', '10:00am','10:30am','11:00am']}
          contentContainerStyle={{
            marginVertical: 10, shadowColor: '#707070', shadowOpacity: 0.2, shadowRadius: 10, shadowOffset: { width: 5, height: 0 }, backgroundColor: 'white', borderRadius: 20, width: '90%',
            alignSelf: 'center', paddingHorizontal: 10
          }}
          renderItem={renderItem}
          keyExtractor={item => item.id} /></>
      }      
    </View>
  )
}