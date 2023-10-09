import React, {Fragment, useEffect, useState} from 'react';
import {View, Text} from 'react-native-animatable';
import {Input, Icon,TouchableOpacity} from '@rneui/base';
import {styles, colors} from '../../Common_styles';
import UHeader from '../../../components/UHeader';
import { useLazyGetcategoriesQuery } from '../../redux/authapi';
import {Pressable, FlatList, Image, Platform, Alert} from 'react-native';
import RadioButton from '../../../components/RadioButton';
import Geolocation from 'react-native-geolocation-service';
import {useSelector,useDispatch} from 'react-redux';
import { backendURL } from '../../services/http';
import { setExistingRating, showBottom } from '../../redux/user';
import { request, PERMISSIONS, RESULT, RESULTS } from "react-native-permissions";
import { FontFamily } from '../../GlobalStyles';
import img from '../../../assets/s.png'
import * as Animatable from 'react-native-animatable';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MyTabBar from '../../../components/Topnav';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Favourites from './favourites';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import user, { setLocation } from '../../redux/user';
import VendorSearchCon from '../../../components/VendorSearchCont';
import { TextInput } from 'react-native-gesture-handler';
import { use } from '../../redux/homeapi';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import { setnotifications_count,setCat } from '../../redux/user';
import FastImage from 'react-native-fast-image';
import Rating_pop from '../../../components/Rating_pop';
import Blur from '../start_screens/Blur';
import { da } from 'date-fns/locale';
import { Linking } from 'react-native';
const Tab = createMaterialTopTabNavigator();



const Home = ({navigation}) => {
const user =useSelector((state)=>state.user.userInfo)
const userstate =useSelector((state)=>state.user)


  const dispatch= useDispatch()
  const [ name,setName]=useState()
  const [option, setOption] = React.useState('Popular');
   const [modal,setmodal]= React.useState(false)
   const [vendor,setVendor]= React.useState({})

const  reverseGeocode=async (lat, lng)=> {
    const apiKey = 'AIzaSyBC14OiKIMS0t6EHuCMi7NGpm8Hn8I6QE0'; // Replace with your actual Google API key
    
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`);
      const data = await response.json();
  
      if (data.status === 'OK' && data.results.length > 0) {
        const address = data.results[0].formatted_address;
        setName(address)
        
      } else {
        throw new Error('Unable to retrieve address');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error occurred during reverse geocoding');
    }
  }
  Linking.addEventListener('url', (event) => {
  
    handleDeepLink(event.url);
  });
  
  const handleDeepLink = (url) => {
    const route = url.replace(/.*?:\/\//g, '');
    const id = route.match(/\/([^\/]+)\/?$/)[1];
    const routeName = route.split('/')[0];
    console.log(id,route)
    if (routeName === 'vendor') {
      navigation.navigate('VendorDetail',
      {
      id
      }
      )    };
  };
  function getUserLocation() {
    Geolocation.getCurrentPosition(
      async (position) => {
    const get=  await reverseGeocode(position.coords.latitude,position.coords.longitude)
    console.log(name)
    dispatch(setLocation(
      {
       name:name && name,
        lat: position.coords.latitude,
        lon: position.coords.longitude
    }))
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
   
  const onMessageReceived = async message => {
    console.log(message)
    };

    const [token, setToken] = React.useState('');
    async function fetchData() {
      const generatedToken = await messaging().getToken()
       setToken(generatedToken);
       if(generatedToken){
     await  axios.get(`${backendURL}/token?token=${generatedToken}&user_id=${user.id}`)
       }
     }

    const getUdates=async()=>{
const {data}= await axios.get(`${backendURL}/user/notifications?id=${user.id}`)
      dispatch(setnotifications_count(data.notifications.length))
      dispatch(setExistingRating(data.ratings))
    }

  React.useEffect(()=>{
    console.log(userstate.location,'jee')
    dispatch(showBottom(true))
    fetchData()
 
    getUdates()
    userstate.location.name==undefined&&
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
  },[])

 
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
   

  }
  
  
  return (
    <Fragment >
     <UHeader navigation={navigation} />
 
    <Pressable onPress={()=>navigation.navigate("Search")}>
     <Image
       
          source={img}
          style={{ width: '90%', borderRadius:20, height: 60, paddingTop: 8, alignSelf: 'center', marginBottom: 15 }} 
          
          />
    </Pressable>
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: 'white' }}
      tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen name="Popular" component={Popular} />
        <Tab.Screen name="Recent viewed" component={Others} />
        <Tab.Screen name="Top Rated Vendors" component={Others} />
    </Tab.Navigator>
    </Fragment>
  );
};

const Popular=({navigation})=>{
const dispatch=useDispatch()
  const userstate =useSelector((state)=>state.user)
  const [getcategories,{data,isLoadig}]=useLazyGetcategoriesQuery()
  useEffect(()=>{
    const a= async()=>{
      const {data}= await getcategories('Popular')
      data&& dispatch(setCat(data))
    }
   a()
 

  },[])
  const handleSearch = async (id,title) => {
     
    
    const {data}= await axios.get(`${backendURL}/search?category=${title}&lat=${userstate.location.lat}&lon=${userstate.location.lon}`)
    //setData(data)
     data    &&   navigation.navigate('Searches1', { location: userstate.location , category: title,data});

  };
  const location= useSelector(state=>state.user)
  const Item = ({title, id, source}) => (
    <Pressable key={id} onPress={()=>handleSearch(id,title)} style={{borderRadius:20,marginTop:20,padding:10,backgroundColor:'white',width:'90%',alignSelf:'center',shadowColor:'#707070',shadowOpacity:0.2,shadowRadius: 10,shadowOffset:{width:5,height:0},elevation:4}} >
    <View >
      <View style={{backgroundColor: '#ffff',alignItems:'center'}}>
      <FastImage
          source={{uri :source, headers: { Authorization: 'someAuthToken' },
          priority: FastImage.priority.high}}
          style={{width: '95%', height: 300, borderRadius: 20}}
        />
        
      </View>
    </View>
    <Text style={[colors.dg,{marginLeft:20,marginTop:10,fontFamily:FontFamily.sourceSansProSemibold,fontSize:24,marginBottom:10}]}>{title}</Text>
    </Pressable>
  );

  return (
    <><FlatList style={{}}
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={({ item }) => (
        <Item title={item.name} id={item.id} source={item.photo_url} />
      )}
      keyExtractor={item => item.id} />
      
      
      
      </>
  )
}


const Others=()=>{
  const user =useSelector((state)=>state.user)
  const navigation=useNavigation()
  const[datas,setData]= useState([])
  const get=async()=>{ 
    const {data}= await axios.get(`${backendURL}/search?query=${'hair'}&lat=${user.location.lat}&lon=${user.location.lon}]`)
    const vendors= data.map((vendor)=>{
      return {
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
    setData( vendors)

  }
  useEffect(()=>{

     get()
  },[])
  
  // const data=[
  //   {
  //     image: '../../../assets/rectangle-9764.png',
  //     logo:'../../../assets/group-1820.png',
  //     name:'Likke Salon',
  //     items:[
  //       { value: 'Make up' },
  //     { value: 'Hair' },
  //     { value: 'Nails' },
  //     ],
  //     rating: '4.5',
  //     location:'Airport Resddf',
  //     dist: '2000m from you'
  //   },
  //   {
  //     image: '../../../assets/rectangle-9764.png',
  //     logo:'../../../assets/group-1820.png',
  //     name:'Likke Salon',
  //     items:[
  //       { value: 'Make up' },
  //     { value: 'Hair' },
  //     { value: 'Nails' },
  //     ],
  //     rating: '4.5',
  //     location:'Airport Resddf',
  //     dist: '2000m from you'
  //   },
  //]
 return(
  <VendorSearchCon notext={true} navigation={navigation} data={datas}/>
 )
}
export default Home;
