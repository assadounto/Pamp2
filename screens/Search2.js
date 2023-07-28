import * as React from "react";
import { StyleSheet, View, Text, Pressable, Image,TextInput, SafeAreaView,Modal,TouchableOpacity } from "react-native";
import { Styles } from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView ,{PROVIDER_GOOGLE,Marker} from "react-native-maps";
import Categories from "../components/Categories";
navigator.geolocation = require('react-native-geolocation-service');
import {
  Margin,
  Border,
  FontSize,
  Color,
  FontFamily,
  Padding,
} from "../GlobalStyles";
import { Icon } from "@rneui/base";
import { styles } from "../src/Common_styles";
import GooglePlacesSearchModal from "../components/Gsearch";
import Gsearch from "../components/Gsearch";
import axios from "axios";
import { backendURL } from "../src/services/http";
import { da } from "date-fns/locale";
const data= [
  { value: 'All categories' },
  { value: 'Beauty Salon' },
  { value: 'Hair Salon' },
  { value: 'Eyebrows & Lashes' },
  { value: 'Massage' },
  { value: 'Barbershop' },
  
];




const Search2 = () => {
  const [loc,setLoc]= React.useState()
  const inputRef =  React.useRef(null);

  const navigation=useNavigation()
  const [modalVisible, setModalVisible] = React.useState(false);
  const [option,setoption]=React.useState('')
 
  const [location, setLocation] = React.useState({
    name: 'amasaman'
  });
  const [query, setQuery] = React.useState('');
  const handleSearch = async () => {
    const {data}= await axios.get(`${backendURL}/search?query=${query}&lat=${loc.coordinates.lat}&lon=${loc.coordinates.lng}]`)
    //setData(data)
     data    &&   navigation.navigate('Searches1', { location: loc, category: query,data});
     data && console.log(data[0].distance)
  };
  const handleContainerPress = () => {
    inputRef.current.focus();
  };
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
      </TouchableOpacity>
       <Gsearch setLoc={setLoc}/>
      {/* <View style={{ flex: 1 }}>
      <GooglePlacesSearchModal setLocation={setLocation} location={location} setVisible={setModalVisible} visible={modalVisible}/>
    </View> */}

 <Categories data={data} onSelect={(val) => {
  setoption(val);
  navigation.navigate('Searches1', { location: loc, category: val });
}}/> 
    </SafeAreaView>
  )
}
export default Search2;


const s_style= StyleSheet.create({
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

