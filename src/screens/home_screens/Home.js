import React, {Fragment, useEffect, useState} from 'react';
import {View, Text,} from 'react-native-animatable';
import {Input, Icon,TouchableOpacity} from '@rneui/base';
import {styles, colors} from '../../Common_styles';
import UHeader from '../../../components/UHeader';
import { useLazyGetcategoriesQuery } from '../../redux/authapi';
import {Pressable, FlatList, Image, Platform, Alert} from 'react-native';
import RadioButton from '../../../components/RadioButton';
import Geolocation from 'react-native-geolocation-service';
import {useSelector,useDispatch} from 'react-redux';
import { backendURL } from '../../services/http';
import { setExistingRating, setImage, showBottom } from '../../redux/user';
import { request, PERMISSIONS, RESULT, RESULTS } from "react-native-permissions";
import { FontFamily } from '../../GlobalStyles';
import img from '../../../assets/s.png'
import { ActivityIndicator } from 'react-native';
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
import notifee from '@notifee/react-native';
import { useFocusEffect } from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet';
import ImageCont from '../../../components/Image';
import Bottom from '../../../components/bottomsheet';
const Tab = createMaterialTopTabNavigator();



const Home = ({navigation}) => {
const user =useSelector((state)=>state.user.userInfo)
const userstate =useSelector((state)=>state.user)
const [unread,setunread]= useState(false)

  const dispatch= useDispatch()
  const [ name,setName]=useState('')
  const [option, setOption] = React.useState('Popular');
   const [modal,setmodal]= React.useState(false)
   const [vendor,setVendor]= React.useState({})
console.log(user.image,'here')
const  reverseGeocode=async (lat, lng)=> {
    const apiKey = 'AIzaSyBC14OiKIMS0t6EHuCMi7NGpm8Hn8I6QE0'; // Replace with your actual Google API key
    
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`);
      const data = await response.json();
  
      if (data.status === 'OK' && data.results.length > 0) {
        const address = data.results[0].formatted_address;
        return address
        
      } else {
        throw new Error('Unable to retrieve address');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error occurred during reverse geocoding');
    }
  }
  Linking.addEventListener('url', (event) => {
    notifee.setBadgeCount(0).then(() => console.log('Badge count removed!'));
    handleDeepLink(event.url);
  });

  const handleDeepLink = (url) => {
    const route = url.replace(/.*?:\/\//g, '');
    const id = route.match(/\/([^\/]+)\/?$/)[1];
    const routeName = route.split('/')[0];

    switch(routeName){
      case 'vendor':
        navigation.navigate('VendorDetail',{id})    
        break;
      case 'booking_detail':
        navigation.navigate('Booking_detail',{id})    
        break;     
    }
  };


  function getUserLocation() {
    Geolocation.getCurrentPosition(
      async (position) => {
    const get=  await reverseGeocode(position.coords.latitude,position.coords.longitude)
    
    const {data}=  await axios.post(backendURL+'/user/location',{lat:position.coords.latitude,lon:position.coords.longitude,id: user.id})
    dispatch(setLocation(
      {
        name:get ||'',
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
   


    const [token, setToken] = React.useState('');
    async function fetchData() {
      const generatedToken = await messaging().getToken()
       setToken(generatedToken);
       if(generatedToken){
        try{
          await  axios.get(`${backendURL}/token?token=${generatedToken}&user_id=${user.id}`)

        }
        catch{
          Alert.alert('Error', 'Network error. Please check your internet connection and try again.');

        }
       }
     }

    const getUdates=async()=>{
      const {data}= await axios.get(`${backendURL}/has_unread?id=${user.id}&scope=user`)
      setunread(data.has_unread)
      dispatch(setExistingRating(data.unrated))
      dispatch(setImage(data.image))
    }
console.log(userstate.location)
    useFocusEffect(
    
      React.useCallback(() => {
        getUdates()  
        getUserLocation();

        userstate.location.name=='' &&
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
      }, []) // Include user.id in the dependency array
    );

  React.useEffect(()=>{
   
    dispatch(showBottom(true))
    fetchData()
 
 
  
  },[])

 
  // const data = useGetCategoriesQuery();
 

  const selectHandler=(value)=>{
     getlo()
    setOption(value)
   

  }
  
  
  return (
    <Fragment >
     <UHeader newnoti={unread}  navigation={navigation} />

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
        <Tab.Screen name="Recent viewed" component={Recent } />
        <Tab.Screen name="Top Rated Vendors" component={Top} />
       {user.role=='admin'? <Tab.Screen name="Extra Vendors" component={Others} />: <></>}
    </Tab.Navigator>
    </Fragment>
  );
};

const Popular=({navigation})=>{
const dispatch=useDispatch()
const[loading,setLoading]= React.useState(false)

  const userstate =useSelector((state)=>state.user)
  const [getcategories,{data,isLoadig}]=useLazyGetcategoriesQuery()
  useEffect(()=>{
    const a= async()=>{
      setLoading(true)
      try{
        const {data}= await getcategories('Popular')
        data&& dispatch(setCat(data))
        setLoading(false)
      }
      
      catch(e) {
        Alert.alert('Error', 'Network error. Please check your internet connection and try again.');
        setLoading(false)
      }
     
    }
   a()
 

  },[])
  const handleSearch = async (id, title) => {
    setImageLoading(true)
    try {
      const { data } = await axios.get(`${backendURL}/search?category=${title}&lat=${userstate.location.lat}&lon=${userstate.location.lon}`);
      
      if (data) {
        setImageLoading(false)
        navigation.navigate('Searches1', { location: userstate.location, category: title, data });
      } else {
        setImageLoading(false)
        // Handle the case when data is empty or falsy
        Alert.alert('Error', 'Failed to fetch data. Please try again.');
      }
    } catch (error) {
      setImageLoading(false)
      // Handle network errors
      Alert.alert('Error', 'Network error. Please check your internet connection and try again.');
    }
  };
  const [imageLoading, setImageLoading] = useState(false);
  const location= useSelector(state=>state.user)
  const Item = ({title, id, source}) => (
    <Pressable key={id} onPress={()=>handleSearch(id,title)} style={{padding:8, borderRadius:20,marginTop:20,backgroundColor:'white',width:'90%',alignSelf:'center',shadowColor:'#707070',shadowOpacity:0.2,shadowRadius: 10,shadowOffset:{width:5,height:0},elevation:4}} >
      <View style={{borderRadius:20,marginTop:5, backgroundColor: '#ffff',alignItems:'center'}}>
        <ImageCont uri={source} styles={{width: '95%', height: 300, borderRadius: 20}}/>

      </View>
  
    <Text style={[colors.dg,{marginLeft:20,marginTop:15,fontFamily:FontFamily.sourceSansProSemibold,fontSize:24,marginBottom:20}]}>{title}</Text>
    {imageLoading&& <ActivityIndicator color={colors.dg2.color} style={{position:"absolute", alignSelf:'center',top:'50%'}} size={'small'}/>}
    </Pressable>
  );

  return (
    <>
{
      loading? <ActivityIndicator style={{alignSelf:'center',marginTop:'50%'}}  size={'small'}/>:
    <FlatList contentContainerStyle={{paddingBottom:30}}
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={({ item }) => (
        <Item title={item.name} id={item.id} source={item.photo_url} />
      )}
      keyExtractor={item => item.id} />
      
      
}
      </>
  )
}


const Recent=({scope})=>{
  const user =useSelector((state)=>state.user)
  const navigation=useNavigation()
  const[loading,setLoading]= React.useState(false)
  const[datas,setData]= useState([])

  const get=async()=>{ 
    setLoading(true)
try{
  const {data}= await axios.get(`${backendURL}/categories?scope=recent&lat=${user.location.lat}&lon=${user.location.lon}&vendor_ids=${JSON.stringify(user.recent_vendors)}`)
  const vendors= data.map((vendor)=>{
    return {
      id: vendor.id,
      image: vendor.cover_url,
      logo: vendor.avatar_url,
      name:vendor.username,
      ratings:vendor.ratings,
      badge: vendor.badge,
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
  setLoading(false)
}
catch{
  setLoading(false) 
  Alert.alert('Error', 'Network error. Please check your internet connection and try again.');

}
  
  }
  
  useFocusEffect(
  
    React.useCallback(() => {
      get()

    }, []) // Include user.id in the dependency array
  );
  

 return(
<>
  {
    
    loading ? <ActivityIndicator style={{alignSelf:'center',marginTop:'50%'}}  size={'small'}/> :
  <VendorSearchCon notext={true} navigation={navigation} datas={datas}/>
  }
  </>
 )
}



const Top=({scope})=>{
  const user =useSelector((state)=>state.user)
  const navigation=useNavigation()
  const[loading,setLoading]= React.useState(false)

  const[datas,setData]= useState([])
  const get=async()=>{ 

    try{
      setLoading(true)
    const {data}= await axios.get(`${backendURL}/categories?scope=top&lat=${user.location.lat}&lon=${user.location.lon}&vendor_ids=[1,8]`)
    const vendors= data.map((vendor)=>{
      return {
        id: vendor.id,
        image: vendor.cover_url,
        logo: vendor.avatar_url,
        name:vendor.username,
        ratings:vendor.ratings,
        badge: vendor.badge,
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
    setLoading(false) 
    }
    catch{
      setLoading(false) 
      Alert.alert('Error', 'Network error. Please check your internet connection and try again.');

    }
   
  }
  
  useFocusEffect(
  
    React.useCallback(() => {
      get()
    }, []) // Include user.id in the dependency array
  );
  

 return(
<>
  {
    
    loading ? <ActivityIndicator style={{alignSelf:'center',marginTop:'50%'}}  size={'small'}/> :
  <VendorSearchCon notext={true} navigation={navigation} datas={datas}/>
  }
  </> )
}






const Others=({scope})=>{
  const user =useSelector((state)=>state.user)
  const navigation=useNavigation()
  const[loading,setLoading]= React.useState(false)

  const[datas,setData]= useState([])
  const get=async()=>{ 

    try{
      setLoading(true)
    const {data}= await axios.get(`${backendURL}/categories?scope=extra&lat=${user.location.lat}&lon=${user.location.lon}`)
    const vendors= data.map((vendor)=>{
      return {
        id: vendor.id,
        image: vendor.cover_url,
        logo: vendor.avatar_url,
        name:vendor.username,
        ratings:vendor.ratings,
        badge: vendor.badge,
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
    setLoading(false) 
    }
    catch{
      setLoading(false) 
      Alert.alert('Error', 'Network error. Please check your internet connection and try again.');

    }
   
  }
  
  useFocusEffect(
  
    React.useCallback(() => {
      get()
    }, []) // Include user.id in the dependency array
  );
  

 return(
<>
  {
    
    loading ? <ActivityIndicator style={{alignSelf:'center',marginTop:'50%'}}  size={'small'}/> :

         <VendorSearchCon notext={true} navigation={navigation} datas={datas}/>


  }
  </> )
}
export default Home;
