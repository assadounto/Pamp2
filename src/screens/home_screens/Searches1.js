import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView,StyleSheet,Image ,Pressable,FlatList} from 'react-native'
import LikkleSalonContainer from '../../../components/LikkleSalonContainer'
import { Icon,Input } from '@rneui/base'
import { colors } from '../../Common_styles'
import { FontFamily } from '../../GlobalStyles'
import { styles } from '../../Common_styles'
import RadioButton from '../../../components/RadioButton'
import MyTabBar from '../../../components/Topnav'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import VendorSearchCon from '../../../components/VendorSearchCont'
import { connect } from 'formik'
import { useRoute } from '@react-navigation/core'
import { ScreenProps } from 'react-native-screens'
const Searches1 = ({navigation,route}) => {
  const thedata=(dat)=>{
    let info=[]
    dat.map((vendor)=>{
         info.push({
           id: vendor.id,
           image: vendor.cover_url,
           logo: vendor.avatar_url,
           name:vendor.username,
           location: vendor.name,
           dist: vendor.distance,
           ratings: vendor.ratings,
           items: vendor.top_services.split(",").map((item)=>{
          return {
             value: item
           }
         }
           )
         }
         )  
        })
        return info  
     }
  const { location, category,data } = route.params;
  
  const [option, setOption] = React.useState('Recommended');
  const numberOfWeeks = 4; // Adjust the number of weeks as needed
  const now = new Date(); // Current date and time
  const cutoffDate = new Date(now.getTime() - (numberOfWeeks * 7 * 24 * 60 * 60 * 1000)); // Calculate the cutoff date
  
  const newData = data.filter(item => new Date(item.created_at) >= cutoffDate);
 
  const rec_vendors= thedata(data)

  const new_vendors= thedata(newData)

  const maxDistance = 500; // Maximum distance in meters
  const nearData= data.filter(item => item.distance <= maxDistance);
  const near_vendors = thedata(nearData)
   const screenOptions = ({ route }) => {
    // Pass the required props to the screens based on the route name
    switch (route.name) {
      case "Recommended":
      case "Nearest":
      case "Newest":
        return {
          screenProps: {
            data: data,
            navigation: navigation,
          },
        };
      default:
        return null;
    }
  };
  

const data1 =[
  {
    image: '../../../assets/rectangle-9764.png',
    logo:'../../../assets/group-1820.png',
    name:'Likke Salon',
    items:[
      { value: 'Make up' },
    { value: 'Hair' },
    { value: 'Nails' },
    ],
    rating: '4.5',
    location:'Airport Resddf',
    dist: '2000m from you'
  },

]

  return (
     <>
 <Pressable onPress={()=>navigation.navigate("Search")}>
      <Input
   
        placeholder="Search for a service"
        inputContainerStyle={[styles.textInput, styles.tc, { marginTop: 80, width:'90%', paddingTop: 10 }]}
        leftIcon={<Icon name="chevron-back" type="ionicon" color={'#BCC4CC'} size={30} />}
        onFocus={() => navigation.navigate("Search")}
        
        value={location.name} />
        </Pressable>
         <Tab.Navigator
         style={{marginTop:-30}}
         screenOptions={screenOptions}
sceneContainerStyle={{ backgroundColor: 'white' ,marginBottom:50 }}
      tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen name="Recommended"  >{(props) => <Item {...props} data={rec_vendors} category={category}/>}</Tab.Screen>
        <Tab.Screen name="Nearest" >{(props) => <Item {...props} data={ near_vendors} />}</Tab.Screen>
        <Tab.Screen name="Newest"  >{(props) => <Item {...props} data={new_vendors} />}</Tab.Screen>

        
    </Tab.Navigator>
       
        </>

  )
}
const Item=({data,category,navigation})=>{
  //const { data, navigation } = ScreenProps;
console.log(data&&data,'kk')
  const data1 =[
    {
      image: '../../../assets/rectangle-9764.png',
      logo:'../../../assets/group-1820.png',
      name:'Likke Salon',
      items:[
        { value: 'Make up' },
      { value: 'Hair' },
      { value: 'Nails' },
      ],
      rating: '4.5',
      location:'Airport Resddf',
      dist: '2000m from you'
    },
  
  ]
  return(
    <VendorSearchCon category={category} datas={data&&data} navigation={navigation}/>
  )
}
export default Searches1
