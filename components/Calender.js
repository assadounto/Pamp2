import React, { useState } from 'react';
import { View, Text, Pressable,ScrollView,FlatList} from 'react-native';
import { styles ,colors} from '../src/Common_styles';
import { FontFamily } from '../src/GlobalStyles';
import { Icon } from '@rneui/base';
import { navigate } from '@react-navigation/routers/lib/typescript/src/CommonActions';
import { Image } from '@rneui/base';
import closed from '../src/screens/assets/closed2.png'
export default function Calender({ data, onSelect,navigation }) {
  const [userOption, setUserOption] = useState(data[3].aday);
   const [currentIndex,setcurrentIndex]= useState();
   const [refFlatList,setrefFlatList]= useState();
   //setUserOption(data[1].day)
  const selectHandler = (value,index) => {
  ///setTimeout(()=>  refFlatList.scrollToIndex({animated:true,index:currentIndex}),2000)
    setcurrentIndex(index)
    onSelect(value);
    setUserOption(value);
    console.log(userOption)
  };
 
   getItemLayout=(data,index)=>{
    return {length : 50,offset:50*index,index}
   }

   renderItem=({item,index})=>{
    return (

      <Pressable
          style={item.aday === userOption.aday ? [styles.selected, { width: 56, height: 55,marginLeft:10 ,borderRadius:15}] : [styles.unselected, {borderRadius:15,marginLeft:10, width: 56, height: 55 }]}
          onPress={() => {
            selectHandler({day:item.day,aday: item.aday},index)
            }}>
          <Text style={[styles.option, item.aday == userOption.aday ? colors.w : colors.dg]}> {item.day}</Text>
          <Text style={[styles.option, item.aday == userOption.aday ? colors.w : colors.dg]}> {item.aday}</Text>
      </Pressable>

  );
  }
  return (
    <>
    <Pressable   onPress={() => selectHandler('Month')} >
    <Text style={{marginLeft:30,marginBottom:30,fontFamily:FontFamily.sourceSansProBold,fontSize:20,color:colors.dg.color}}>
     April
    </Text>
    </Pressable>

   
 {/* <ScrollView horizontal={userOption ==='Month' ?null :true} contentContainerStyle={{ marginLeft: 10,display:'flex',flexDirection:'row',flexWrap:'wrap'}} showsHorizontalScrollIndicator={false}> */}
<View style={{ width: '90%',alignSelf:'center',paddingTop:20, paddingHorizontal:10,shadowColor:'#707070',shadowOpacity:0.2,shadowRadius: 10,shadowOffset:{width:5,height:0},backgroundColor:'white', borderRadius:20}}> 
<FlatList

data={data}
key={userOption=='Month' ? '_': 'zazaz'}
renderItem={renderItem}
keyExtractor={item => item.id}
getItemLayout={getItemLayout}
 numColumns={userOption==='Month' ? 5 : null}
horizontal={userOption ==='Month' ? false: true} 
 contentContainerStyle={userOption=='Month' && {display:'flex',flexDirection:'column',
}} 
showsHorizontalScrollIndicator={false}
ref={(ref)=>setrefFlatList(ref)}
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