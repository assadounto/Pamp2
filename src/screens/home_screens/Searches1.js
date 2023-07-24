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
  
  const { location, category,data } = route.params;
  
  const [option, setOption] = React.useState('Recommended');

  const vendors= data.map((vendor)=>{
    return{
      id: vendor.id,
      image: vendor.cover_url,
      logo: vendor.avatar_url,
      name:vendor.username,
      rating:'4.5',
      location: vendor.name,
      dist: vendor.distance,
      items: vendor.top_services.split(",").map((item)=>{
     return {
        value: item
      }
    }
      )
    }
      
   })
   const screenOptions = ({ route }) => {
    // Pass the required props to the screens based on the route name
    switch (route.name) {
      case "Popular":
      case "Recent viewed":
      case "Top Rated Hair Salons":
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
        <Text style={{ fontFamily: FontFamily.sourceSansProBold, fontSize: 24, color: colors.dgb.color, marginLeft: 40, fontWeight: 'bold' ,}}>{data.length} result For {category}</Text><Text style={{marginBottom:20, fontFamily: FontFamily.sourceSansProBold, fontSize: 24, color: colors.dgb.color, marginLeft: 40, fontWeight: 'bold' }}>near you </Text>
         <Tab.Navigator
         screenOptions={screenOptions}
sceneContainerStyle={{ backgroundColor: 'white' ,marginBottom:50 }}
      tabBar={props => <MyTabBar {...props} />}>
  


        <Tab.Screen name="Popular"  >{(props) => <Item {...props} data={vendors} />}</Tab.Screen>
        <Tab.Screen name="Recent viewed" component={Item} />
        <Tab.Screen name="Top Rated Hair Salons" component={Item} />

        
    </Tab.Navigator>
       
        </>

  )
}
const Item=({data,navigation})=>{
  //const { data, navigation } = ScreenProps;
console.log(data&&data)
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
    <VendorSearchCon data={data&&data} navigation={navigation}/>
  )
}
export default Searches1
