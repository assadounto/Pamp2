import React, {Fragment} from 'react';
import {View, Text} from 'react-native-animatable';
import {Input, Icon,TouchableOpacity} from '@rneui/base';
import {styles, colors} from '../../Common_styles';
import UHeader from '../../../components/UHeader';
import {useGetcategoriesQuery} from '../../redux/authapi';
import {Pressable, FlatList, Image, Platform} from 'react-native';
import RadioButton from '../../../components/RadioButton';
import Geolocation from 'react-native-geolocation-service';
import {useSelector} from 'react-redux';

import { request, PERMISSIONS, RESULT, RESULTS } from "react-native-permissions";
import { FontFamily } from '../../GlobalStyles';
import img from '../../../assets/s.png'
import * as Animatable from 'react-native-animatable';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MyTabBar from '../../../components/Topnav';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Favourites from './favourites';
import { NavigationContainer } from '@react-navigation/native';

import VendorSearchCon from '../../../components/VendorSearchCont';
import { TextInput } from 'react-native-gesture-handler';
const Tab = createMaterialTopTabNavigator();



const Home = ({navigation}) => {
  const [option, setOption] = React.useState('Popular');


  function getUserLocation() {
    Geolocation.getCurrentPosition(
      (position) => {
     console.log(position)
      },
      (error) => {
        console.log(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );
  }
   
    
  React.useEffect(()=>{
    request(Platform.OS==='ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            "This feature is not available (on this device / in this context)"
          );
          break;
        case RESULTS.DENIED:
          console.log(
            "The permission has not been requested / is denied but requestable"
          );
          break;
        case RESULTS.LIMITED:
          console.log("The permission is limited: some actions are possible");
          break;
        case RESULTS.GRANTED:
          console.log("The permission is granted");
          // Permission has been granted - app can request location coordinates
          getUserLocation();
          break;
        case RESULTS.BLOCKED:
          console.log("The permission is denied and not requestable anymore");
          break;
      }
    });
  })

 
  // const data = useGetCategoriesQuery();
 
  const data2 = [
    { value: 'Popular' },
    { value: 'Recently viewed' },
    { value: 'Top Rated Hail salons' },
    {value: 'Top Rated Beauty Salons'},
    { value: 'Top Rated Spa' },
  ];

  const selectHandler=(value)=>{
     getlo()
    setOption(value)
    console.log(value)

  }
  
  
  return (
    <Fragment >
     <UHeader navigation={navigation} />
  <Text>dddddduu</Text>
    <Pressable onPress={()=>navigation.navigate("Search")}>
     <Image
       
          source={img}
          style={{ width: 344, height: 63, paddingTop: 8, alignSelf: 'center', marginBottom: 15 }} 
          
          />
    </Pressable>
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: 'white' }}
      tabBar={props => <MyTabBar {...props} />}>
  


        <Tab.Screen name="Popular" component={Popular} />
        <Tab.Screen name="Recent viewed" component={Others} />
        <Tab.Screen name="Top Rated Hair Salons" component={Favourites } />

        <Tab.Screen name="Settingrgs" component={Favourites} />

        <Tab.Screen name="Settingrhs" component={Favourites} />

        <Tab.Screen name="Settingrrs" component={Favourites} />
    </Tab.Navigator></Fragment>
  );
};

const Popular=({navigation})=>{
  const {data,isLoading,isSuccess} = useGetcategoriesQuery('Popular')
  const Item = ({title, id, source}) => (
    <Pressable onPress={()=>navigation.navigate('Searches1')} style={{borderRadius:20,marginTop:20,padding:10,backgroundColor:'white',width:'90%',alignSelf:'center',shadowColor:'#707070',shadowOpacity:0.2,shadowRadius: 10,shadowOffset:{width:5,height:0},elevation:4}} >
    <View >
      <View style={{backgroundColor: '#ffff',alignItems:'center'}}>
        <Image
          source={source}
          style={{width: '95%', height: 300, borderRadius: 20}}
        />
        
      </View>
    </View>
    <Text style={[colors.dg,{marginLeft:20,marginTop:10,fontFamily:FontFamily.sourceSansProSemibold,fontSize:24,marginBottom:10}]}>{title}</Text>
    </Pressable>
  );

  return (
    <FlatList style={{}}
    showsVerticalScrollIndicator={false}
    data={data}
    renderItem={({ item }) => (
      <Item title={item.name} id={item.id} source={{ uri: item.photo_url }} />
    )}
    keyExtractor={item => item.id} />
  )
}


const Others=()=>{
  const data=[
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
  <VendorSearchCon data={data}/>
 )
}
export default Home;
