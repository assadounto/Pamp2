import React, {Fragment, useEffect, useState} from 'react';
import {View, Text,} from 'react-native-animatable';
import {Input, Icon,TouchableOpacity} from '@rneui/base';
import {styles, colors} from '../../Common_styles';
import UHeader from '../../../components/UHeader';
import { useInternet } from '../../../components/Internetcontext';
import { useGetcategoriesQuery } from '../../redux/authapi';
import {Pressable, FlatList, Image, Platform, Alert} from 'react-native';
import RadioButton from '../../../components/RadioButton';
import Geolocation from 'react-native-geolocation-service';
import {useSelector,useDispatch} from 'react-redux';
import { backendURL } from '../../services/http';
import { setExistingRating, setImage, showBottom } from '../../redux/user';
import { request,check, PERMISSIONS, RESULT, RESULTS } from "react-native-permissions";
import { FontFamily } from '../../GlobalStyles';
import img from '../../../assets/s.png'
import Pop2 from '../start_screens/pop2';
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
import { userLogout } from '../../redux/user';
import Skeleton from '../../../components/LoadingSketon';
import LoadingSkeleton from '../../../components/LoadingSketon';
import { horizontalScale, moderateScale, verticalScale } from '../../Dimensions';
import Location_pop from '../../../components/Location_pop';
import NoInternetComponent from '../../../components/NoInternet';
const Tab = createMaterialTopTabNavigator();

const Home = ({navigation}) => {
  const isInternetConnected = useInternet();

const user =useSelector((state)=>state.user.userInfo)
const userstate =useSelector((state)=>state.user)
const [unread,setunread]= useState(false)
const [showInfoModal, setShowInfoModal] = useState(false);

const dispatch= useDispatch()
const [ name,setName]=useState('')
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
  const showAlert = () => {
    Alert.alert(
      'No Internet Connection',
      'Please check your internet connection and try again.',
      [
        {
          text: 'OK',
        //  onPress: handleRefresh, // Call the handleRefresh function on OK press
        },
      ]
    );
  };



  function getUserLocation() {
    Geolocation.getCurrentPosition(
      async (position) => {
    const get=  await reverseGeocode(position.coords.latitude,position.coords.longitude)
    if (user?.id){
      const {data}=  await axios.post(backendURL+'/user/location',{lat:position.coords.latitude,lon:position.coords.longitude,id: user?.id})

    }
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

     const getUpdates = async () => {
     if (user?.id){
      try {
        const { data } = await axios.get(`${backendURL}/has_unread?id=${user?.id}&scope=user`);
        setunread(data.has_unread);
        dispatch(setExistingRating(data.unrated));
        dispatch(setImage(data.image));
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Navigate to the login page
          // You can use the navigation library you are using (e.g., React Navigation)
          // Replace 'LoginScreen' with the actual screen or route name for your login page
          confirmQuitApp()
        } else {
          // Handle other errors as needed
          console.error('Error:', error);
        }
      }
     }
    };


    const contactSupport = () => {
      const supportEmail = 'partners@trypamp.com';
      const subject = 'I cannot Access App';
    
      const url = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}`;
    
      Linking.openURL(url).catch((err) =>
        console.error('Error opening email client:', err)
      );
    };
    async function handleSignOut() {
      try {
      
  
        setTimeout(() => {
       
          dispatch(userLogout());
        }, 1000);
      } catch (error) {
        console.error('Error signing out:', error);
        // Handle error if needed
      }
    }
    // Function to prompt before quitting the app
    const confirmQuitApp = () => {
      Alert.alert(
        'Your account has been restricted',
        'Please contact pamp support',
        [
          {
            text: 'Contact',
            style: 'cancel',
            onPress: contactSupport
          },
          {
            text: 'Quit',
            onPress: handleSignOut
          },
        ],
        { cancelable: true }
      );
    };

 



console.log(userstate.location)
    useFocusEffect(
    
      React.useCallback(() => {
       
       
    user?.id&& getUpdates()  
        getUserLocation();
        checkAndShowInfoModal();
      }, []) // Include user.id in the dependency array
    );

  React.useEffect(()=>{
   
    dispatch(showBottom(true))
   user?.id && fetchData()
 
 
  
  },[])

  const checkAndShowInfoModal = async () => {
    try {
      const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (result === RESULTS.DENIED) {
        // Permission hasn't been granted yet, show info modal
        setShowInfoModal(true);
      }
    } catch (error) {
      console.error('Error checking location permission:', error);
    }
  };

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
          style={{ width: horizontalScale(330), borderRadius:20, height: verticalScale(60), paddingTop: verticalScale(8), alignSelf: 'center', marginBottom: 15 }} 
          
          />
    </Pressable>
  
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: 'white' }}
      tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen name="Popular" component={Popular} />
        <Tab.Screen name="Recently viewed" component={Recent } />
        <Tab.Screen name="Top Rated Vendors" component={Top} />
       {user?.role=='admin'? <Tab.Screen name="Extra Vendors" component={Others} />: <></>}
    </Tab.Navigator>
    <Location_pop setmodal={setShowInfoModal} modal={showInfoModal} getUserLocation={getUserLocation}/>
    </Fragment>
  );
};

const Popular=({navigation})=>{
  const isInternetConnected = useInternet();
const dispatch=useDispatch()
const[loading,setLoading]= React.useState(false)
const [error,setError]= React.useState()
  const userstate =useSelector((state)=>state.user)

  console.log(userstate.userInfo)

  

  const {data,isLoading,refetch,isError}=useGetcategoriesQuery('Popular')
  useFocusEffect(
  
    React.useCallback(() => {
  if (!data){
    refetch()

  } 

    }, []) // Include user.id in the dependency array
  );
 console.log(isLoading)
    const a= async()=>{
      setLoading(true)
      try{
        const {data}= await getcategories('Popular')
        data&& dispatch(setCat(data))
        setLoading(false)
        setError(false)
      }
      
      catch(e) {
        Alert.alert('Error', 'Network error. Please check your internet connection and try again.');
        setError(true)
        setLoading(false)
      }
     
    }
 

  
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
  const item = ({item}) => (
    <Pressable key={item.id} onPress={()=>handleSearch(item.id,item.name)} style={{paddingTop:13,paddingHorizontal:6, borderRadius:20,marginTop:verticalScale(20),backgroundColor:'white',width:'90%',alignSelf:'center',shadowColor:'#707070',shadowOpacity:0.2,shadowRadius: 10,shadowOffset:{width:5,height:0},elevation:4}} >
   

   
        <ImageCont uri={item.photo_url} styles={{width: '95%',alignSelf:'center', height: verticalScale(300), borderRadius: 20}}/>


  
    <Text style={[colors.dg,{marginLeft:20,marginTop:verticalScale(15),fontFamily:FontFamily.sourceSansProSemibold,fontSize:moderateScale(24),marginBottom:verticalScale(20)}]}>{item.name}</Text>
    {imageLoading&& <ActivityIndicator color={colors.dg2.color} style={{position:"absolute", alignSelf:'center',top:'50%'}} size={'small'}/>}
    </Pressable>
  );
 
  return (
    <>
   
{
      isLoading? <LoadingSkeleton/>
      :
    <FlatList contentContainerStyle={{paddingBottom:30}}
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={ item}
      

refreshing={false}
      keyExtractor={item => item.id}
      ListEmptyComponent={  <NoInternetComponent retry={()=>refetch()}/>}
      onRefresh={refetch}
      />
      
      
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
    
    loading ?  <LoadingSkeleton/> :
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
    
    loading ?  <LoadingSkeleton/> :
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
    
    loading ? <LoadingSkeleton/> :

         <VendorSearchCon notext={true} navigation={navigation} datas={datas}/>


  }
  </> )
}
export default Home;
