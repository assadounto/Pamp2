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
const Searches1 = ({navigation}) => {
  const [option, setOption] = React.useState('Recommended');
  const data2 = [
    { value: 'Recommended' },
    { value: 'Nearest' },
    { value: 'Newest' },
  ];
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

      <Input
        placeholder="Search for a service"
        inputContainerStyle={[styles.textInput, styles.tc, { marginTop: 50, paddingTop: 10 }]}
        leftIcon={<Icon name="chevron-back" type="ionicon" color={'#BCC4CC'} size={30} />}
        //onFocus={() => }
        value={'East Legon'} />
        <Text style={{ fontFamily: FontFamily.sourceSansProBold, fontSize: 24, color: colors.dgb.color, marginLeft: 40, fontWeight: 'bold' }}>{data1.length} result For Hair Salon </Text><Text style={{ fontFamily: FontFamily.sourceSansProBold, fontSize: 24, color: colors.dgb.color, marginLeft: 40, fontWeight: 'bold' }}>near you </Text>
         <Tab.Navigator
sceneContainerStyle={{ backgroundColor: 'white' }}
      tabBar={props => <MyTabBar {...props} />}>
  


        <Tab.Screen name="Popular" component={Item} />
        <Tab.Screen name="Recent viewed" component={Item} />
        <Tab.Screen name="Top Rated Hair Salons" component={Item} />

        
    </Tab.Navigator>
       
        </>

  )
}
const Item=()=>{
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
    <VendorSearchCon data={data1} />
  )
}
export default Searches1
