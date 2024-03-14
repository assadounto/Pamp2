import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, ScrollView,Platform, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Icon } from '@rneui/base';
import Geolocation from 'react-native-geolocation-service';
import { useSelector } from 'react-redux';
import { colors } from '../src/Common_styles';
import { FontFamily } from '../GlobalStyles';
import { request, PERMISSIONS, RESULT, RESULTS, check } from "react-native-permissions";
import Location_pop from './Location_pop';
const Gsearch = ({ setLoc, handleS }) => {
  const user = useSelector(state => state.user);
  const refInput = useRef(null);
  const [prev,setPrev]= useState(user.location.name)
  const [searchQuery, setSearchQuery] = useState(user.location.name &&user.location.name);
  const [searchResults, setSearchResults] = useState([]);
  const [start, setStart] = useState(true);
  const [show, setShow] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    coordinates: {
      lat: user.location.lat,
      lng: user.location.lon,
    },
    name: user.location.name,
  });
  const [showInfoModal, setShowInfoModal]= useState(false)
console.log(user.location.name)
  useEffect(() => {
    setLoc(selectedLocation.coordinates.lat,selectedLocation.coordinates.lng,selectedLocation.name);

    if (start) {
      const delaySearch = setTimeout(() => {
        handleSearch();
      }, 500);

      return () => clearTimeout(delaySearch);
    }
  }, [searchQuery, start]);

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setLoc(location.coordinates.lat,location.coordinates.lng,location.name);
  };

  const reverseGeocode = async (lat, lng) => {
    const apiKey = 'AIzaSyBC14OiKIMS0t6EHuCMi7NGpm8Hn8I6QE0';

    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`);
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const address = data.results[0].formatted_address;
        setSearchQuery(address);
      } else {
        throw new Error('Unable to retrieve address');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error occurred during reverse geocoding');
    }
  };



  const checkAndShowInfoModal = async () => {
    try {
      const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (result === RESULTS.DENIED) {
        // Permission hasn't been granted yet, show info modal
        setShowInfoModal(!showInfoModal)      }

        else if(result === RESULTS.GRANTED){
          getUserLocation();
        }
    } catch (error) {
      console.error('Error checking location permission:', error);
    }
  };


  function getUserLocation() {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        reverseGeocode(latitude, longitude);
        handleSearch();
      },
      (error) => {
        console.error(error);
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );
 setShow(false)
  }

  const handleSearch = async () => {
    try {
      const apiKey = 'AIzaSyBC14OiKIMS0t6EHuCMi7NGpm8Hn8I6QE0';
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchQuery}&key=${apiKey}`
      );
      const data = await response.json();

      const results = data.results || [];
      setSearchResults(results);
    } catch (error) {
      console.error('Error occurred while searching:', error);
    }
  };

  const clearSearch = () => {
    setStart(true);
    setShow(true);
    setSearchQuery('');
    setSearchResults([]);
    refInput.current.focus();
  };

  const hideSearchResults = () => {
    setShow(false);
    searchQuery== '' && setSearchQuery(prev)
  };



  return (
    <><TouchableWithoutFeedback onPress={hideSearchResults}>
      <View>
        <TextInput
          ref={refInput}
          style={s_style.text_input}
          placeholder={searchQuery}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          keyboardType="web-search" />
        <View style={s_style.icon}>
          <Icon name="map-pin" type="feather" size={25} color="#BCC4CC" />
        </View>
        <View style={s_style.icon2}>
          <Icon name="x" type="feather" size={30} color="#BCC4CC" onPress={clearSearch} />
        </View>

        {show ? (
          <ScrollView showsVerticalScrollIndicator={false} style={s_style.box}>
            <TouchableOpacity style={s_style.button} onPress={checkAndShowInfoModal}>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Icon name="locate-outline" type="ionicon" />
                <Text style={{ fontSize: 14, marginTop: 3, color: colors.dg.color, fontFamily: FontFamily.sourceSansProBold }}> Use Current Location</Text>
              </View>
            </TouchableOpacity>
            {searchResults.map((result) => (
              <TouchableOpacity
                style={s_style.column}
                key={result.place_id}
                onPress={() => {
                  handleSelectLocation({
                    name: result.name,
                    coordinates: result.geometry.location,
                  });
                  setSearchQuery(result.name);
                  setStart(false);
                  setSearchResults([]);
                  setShow(false);
                } }
              >
                <View style={{ marginLeft: 20 }}>
                  <Text style={{ color: colors.dg.color, fontFamily: FontFamily.sourceSansProSemibold }}>{result.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
    <Location_pop setmodal={setShowInfoModal} modal={showInfoModal} getUserLocation={getUserLocation}/>

  </>
  );
};


const s_style= StyleSheet.create({
  column:{
  height:35,
 alignContent:'center',
 justifyContent:'center',


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

    borderColor:'#EFEFEF',
    borderWidth:2,
width:'90%',
height:'30%',
backgroundColor: colors.w.color,
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
