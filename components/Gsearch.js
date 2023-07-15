import React, { useState } from 'react';
import { View, TextInput,StyleSheet,ScrollView ,Text,TouchableOpacity} from 'react-native';
import { Icon } from '@rneui/base';
import Geolocation from 'react-native-geolocation-service';
import { useSelector } from 'react-redux';
import { colors } from '../src/Common_styles';
const Gsearch = ({setLoc}) => {
  const user=useSelector(state=>state.user)
  const refInput = React.useRef(null);
  const [searchQuery, setSearchQuery] = useState(user.location.name);
  const [searchResults, setSearchResults] = useState([]);
  const[start,setstart]=useState(true)
  const [selectedLocation, setSelectedLocation] = useState(
    {
    coordinates: {
      lat: user.location.lat,
      lng: user.location.lon,
    },
    name: user.location.name
  }
  );
 
  React.useEffect(() => {
    setLoc(selectedLocation)
   
    if (start) {
      const delaySearch = setTimeout(() => {
        handleSearch();
      }, 500); // Delay of 500 milliseconds before triggering the search
  
      return () => clearTimeout(delaySearch);
    }
  }, [searchQuery, start]);
 
  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setLoc(location)
   
    // Do something with the selected location, such as updating state or triggering an action
  };

  const  reverseGeocode=async (lat, lng)=> {
    const apiKey = 'AIzaSyBC14OiKIMS0t6EHuCMi7NGpm8Hn8I6QE0'; // Replace with your actual Google API key
    
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`);
      const data = await response.json();
  
      if (data.status === 'OK' && data.results.length > 0) {
        const address = data.results[0].formatted_address;
        setSearchQuery(address)

        
      } else {
        throw new Error('Unable to retrieve address');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error occurred during reverse geocoding');
    }
  }

  function getUserLocation() {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        reverseGeocode(latitude,longitude)
        handleSearch();
  
    
      },
      (error) => {
       
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );
  }
   

  const handleSearch = async () => {
    try {
      const apiKey = 'AIzaSyBC14OiKIMS0t6EHuCMi7NGpm8Hn8I6QE0';
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchQuery}&key=${apiKey}`
      );
      const data = await response.json();
     
      // Extract the search results from the API response
      const results = data.results || [];
      setSearchResults(results);
    } catch (error) {
      console.error('Error occurred while searching:', error);
    }
  };

  const clearSearch = () => {
    setstart(true)
    setSearchQuery('');
    setSearchResults([]);
  };
  

  return (
    <View >
      <TextInput
        style={s_style.text_input}
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
        //editable={edit} 
       //ref={refInput}
      />
      <View style={s_style.icon}>
      <Icon
     name= 'map-pin'
        type="feather"
        size={25}
        color="#BCC4CC"
      />
      </View>
  <View style={s_style.icon2}>
  <Icon
        
        name="x"
        type="feather"
        size={30}
        color="#BCC4CC"
        onPress={clearSearch}
      />
  </View>      

      

      {/* Render search results */}
      {
        searchResults.length==0?null:
        <ScrollView style={s_style.box}>
        
      
        <TouchableOpacity
          style={s_style.button}
          onPress={getUserLocation}
        >
          <Text>Use Current Location</Text>
        </TouchableOpacity>
        {searchResults.map((result) => (
          <TouchableOpacity
          style={s_style.column}
          key={result.place_id}
          onPress={() =>{
            handleSelectLocation({
              name: result.name,
              coordinates: result.geometry.location,
            })
            setSearchQuery(result.name)
            setstart(false)
            setSearchResults([])
          }}
        >
          <View>
            {/* Render each search result */}
            {/* Customize the rendering based on your needs */}
            <Text>{result.name}</Text>
            
          </View>
        </TouchableOpacity>
        ))}
        </ScrollView>
      }
     
    </View>
  );
};

const s_style= StyleSheet.create({
  column:{
  height:40,
 alignContent:'center',
 justifyContent:'center',
  borderTopWidth:1,
  borderColor:colors.lg.color

  }
  ,
  text_input: {
    
    backgroundColor: '#EFEFEF',
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    height: 63,
    width:'90%',
    paddingHorizontal:70,
    alignSelf:'center',
    display:'flex',
    flexDirection:'row',
    marginTop:20,

  },
  icon:{
    margin:15,
    position: 'absolute',
    top:23,
    left:30

  },
  box:{
width:'90%',
height:'30%',
backgroundColor: '#EFEFEF',
padding:10,
overflow:'scroll',
borderRadius:10,
alignSelf:'center',
marginTop:10
  },
  icon2:{
    marginTop:15,
    top:23,
    right:40,
    position: 'absolute',
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
  },
  button:{
    marginVertical:10
  }
  
})


export default Gsearch;
