import * as React from "react";
import { StyleSheet, View, Text,ActivityIndicator, Pressable, Image,TextInput, SafeAreaView,Modal,TouchableOpacity, Alert } from "react-native";
import { Styles } from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";
import { useLazyGetcategoriesQuery } from "../src/redux/authapi";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView ,{PROVIDER_GOOGLE,Marker} from "react-native-maps";
import Categories from "../components/Categories";
import { addRecent } from "../src/redux/user";
navigator.geolocation = require('react-native-geolocation-service');
import {
  Margin,
  Border,
  FontSize,
  Color,
  FontFamily,
  Padding,
} from "../GlobalStyles";
import {useDispatch, useSelector} from 'react-redux';
import { Icon } from "@rneui/base";
import { colors, styles } from "../src/Common_styles";
import GooglePlacesSearchModal from "../components/Gsearch";
import Gsearch from "../components/Gsearch";
import axios from "axios";
import { backendURL } from "../src/services/http";
import { da } from "date-fns/locale";


const initData= [
  { value: 'All categories' },
  // { value: 'Beauty Salon' },
  // { valxue: 'Hair Salon' },
  // { value: 'Eyebrows & Lashes' },
  // { value: 'Massage' },
  // { value: 'Barbershop' },
  // { value: 'Massage' },
  // { value: 'Barbershop' },
  // { value: 'Massage' },
  // { value: 'Spa' },
  // { value: 'Aesthetics' },
  // { value: 'Waxi' },
];


const Search2 = () => {
  const dispatch= useDispatch()
  const [loc,setLoc]= React.useState()
  const inputRef =  React.useRef(null);
  const userstate =useSelector((state)=>state.user)
  const [getcategories,{data,isLoadig}]=useLazyGetcategoriesQuery()
  const navigation=useNavigation()
  const [modalVisible, setModalVisible] = React.useState(false);
  const [option,setoption]=React.useState('')
 
  const [location, setLocation] = React.useState({
    name: 'amasaman'
  });

  const setNewLocation=(lat,lon,name)=>{
setLoc({
  lat,
  lon,
  name
})
  }



  const [query, setQuery] = React.useState('');
  const handleSearch = async () => {
    
    setImageLoading(true)
    try{
      const {data}= await axios.get(`${backendURL}/search?query=${query}&lat=${loc.lat}&lon=${loc.lon}`)
      //setData(data)
      dispatch(addRecent({cat: 'query',search: query}))
  
       data    &&   navigation.navigate('Searches1', { location: loc, category: query,data});
    } catch{
      Alert.alert('Error', 'Network error. Please check your internet connection and try again.');
      setImageLoading(false)
    }
   
    
  };
  const handleContainerPress = () => {
    inputRef.current.focus();
  };

  const data1=  initData.concat( userstate.categories.map((cat)=>{
    return {
      value: cat.name
    }
  })
  )

  const searchRecent=async()=>{
    if (userstate.recent_view.cat=='cat'){
      setImageLoading(true)
      try{
        const {data}= await axios.get(`${backendURL}/search?category=${userstate.recent_view.search}&lat=${loc.lat}&lon=${loc.lon}`)
        navigation.navigate('Searches1', { location: loc, category:  userstate.recent_view.search,data});
      }
      catch(e){
        setImageLoading(false)
        Alert.alert('Error', 'Network error. Please check your internet connection and try again.');

      }
    
    } else {
      setQuery(userstate.recent_view.search);
      handleSearch()
    }
  }
  const [imageLoading, setImageLoading] = React.useState(false);

  return(
    <SafeAreaView>
      <TouchableOpacity
        onPress={handleContainerPress}
        activeOpacity={1} // To prevent highlighting when pressed
       style={[s_style.text_input]}>
        
        <Icon
        style={s_style.icon}
         name= 'search'
         type="feather"
        size={25}
        color='#BCC4CC'
        />

      <TextInput 
       ref={inputRef}
      style={{ flex: 1 }}
      
       autoFocus={true}
        placeholder='Search for a service or venue'
        onChangeText={setQuery}
        keyboardType="web-search"
        onSubmitEditing={handleSearch}
        />
          {imageLoading&& <ActivityIndicator color={colors.dg2.color} style={{position:"absolute", right:20, alignSelf:'center',}} size={'small'}/>}

      </TouchableOpacity>
       <Gsearch  handleS={ handleSearch} setLoc={setNewLocation}/>
      {/* <View style={{ flex: 1 }}>
      <GooglePlacesSearchModal setLocation={setLocation} location={location} setVisible={setModalVisible} visible={modalVisible}/>
    </View> */}

 <Categories data={data1} onSelect={async(val) => {
  setoption(val);
  dispatch(addRecent({cat: 'cat',search: val}))
  try{
    const {data}= await axios.get(`${backendURL}/search?category=${val}&lat=${loc.lat}&lon=${loc.lon}`)
    navigation.navigate('Searches1', { location: loc, category: val ,data});
  }
  catch{
    Alert.alert('Error', 'Network error. Please check your internet connection and try again.');

  }
 
}}/> 
{ userstate.recent_view.search&&
  <View style={{marginHorizontal:30}}>
  <Text style={s_style.recent_view}>Recent Searches</Text>
 <View style={{display:'flex',
flexDirection:'row'}}>
  <TouchableOpacity onPress={searchRecent} style={s_style.recent_cont}>
  <Image source={require('../assets/search1.png')} />
  </TouchableOpacity>
  <View style={s_style.text_cont}>
  <Text style={{fontFamily:FontFamily.sourceSansProRegular,fontSize:17}}>{userstate.recent_view.search}</Text>
  </View>
  </View>

</View>
} 

    </SafeAreaView>
  )
}
export default Search2;


const s_style= StyleSheet.create({
  text_cont:{
    justifyContent:'center',
    alignItems:'center',
    marginLeft:20,
    height:56,borderRadius:20, 
  },
  recent_cont:{
    justifyContent:'center',
    alignItems:'center',
    width:56,
    height:56,borderRadius:20,
    backgroundColor: colors.dg2.color
  },
  recent_view:{
    fontFamily:FontFamily.sourceSansProSemibold,
    fontSize: 26,
    color:colors.dg2.color,
    marginVertical:30
  },
  text_input: {
    
    backgroundColor: '#EFEFEF',
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    height: 63,
    width:'90%',
    paddingHorizontal:10,
    alignSelf:'center',
    display:'flex',
    flexDirection:'row',
    marginTop:20,

  },
  icon:{
    margin:15,
    marginTop:18

  },
  icon2:{
    marginTop:15,
    alignSelf:'flex-start'
  },
  text:{
   width:'70%',
   marginTop:20
   
  },
  centeredView: {
    
    width:'100%',
    top:'50%',
    marginTop: 82,
    height:'50%'
   
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalView: {
    margin: 20,
    backgroundColor:'red',
    width:'100%',
    top: '30%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  mb_20:{
    marginBottom:20
  }
  
})

