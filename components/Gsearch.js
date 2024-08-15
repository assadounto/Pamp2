import { useTheme } from '@rneui/themed';
import { makeStyles } from '@rneui/themed';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, TextInput, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { Icon } from '@rneui/base';
import Geolocation from 'react-native-geolocation-service';
import { useSelector } from 'react-redux';
import { colors } from '../src/Common_styles';
import { FontFamily } from '../GlobalStyles';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Location_pop from './Location_pop';
import SendIcon from './icons/Send';
import HomeIcon from './icons/Home';
import { Platform } from 'react-native';
import Location2 from './icons/location2';

const Gsearch = ({ setLoc, handleS, show, setShow }) => {
  const apiKey = "AIzaSyBC14OiKIMS0t6EHuCMi7NGpm8Hn8I6QE0";

  const user = useSelector(state => state.user);
  const refInput = useRef(null);
  const [prev, setPrev] = useState(user.location.name);
  const [searchQuery, setSearchQuery] = useState(user.location.name || '');
  const [searchResults, setSearchResults] = useState([]);
  const [start, setStart] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    coordinates: {
      lat: user.location.lat,
      lng: user.location.lon,
    },
    name: user.location.name,
  });
  const [showInfoModal, setShowInfoModal] = useState(false);

  const s_style = useStyles();
  const { theme } = useTheme();

  const requestLo = () => {

    request(Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          setmodal(!modal)
          console.log(
            "This feature is not available (on this device / in this context)"
          );
          break;
        case RESULTS.DENIED:
          showBlockedModal()
          console.log(
            "The permission has not been requested / is denied but requestable"
          );
          break;
        case RESULTS.LIMITED:
          setmodal(!modal)
          console.log("The permission is limited: some actions are possible");
          break;
        case RESULTS.GRANTED:
          console.log("The permission is granted");
          // Permission has been granted - app can request location coordinates
          getUserLocation();
          setmodal(!modal)
          break;
        case RESULTS.BLOCKED:
          setmodal(!modal)
          console.log("The permission is denied and not requestable anymore");
          break;
      }
    })
  }
  const showBlockedModal = () => {
    // Show your blocked modal with more information
    Alert.alert(
      'Location Permission Blocked',
      'Location permission has been blocked. Enable it in settings to use this feature.',
      [
        { text: 'OK', onPress: () => setmodal(!modal) },
      ],
    );
  };


  useEffect(() => {
    setLoc(selectedLocation.coordinates.lat, selectedLocation.coordinates.lng, selectedLocation.name);

    if (start) {
      const delaySearch = setTimeout(() => {
        handleSearch();
      }, 500);

      return () => clearTimeout(delaySearch);
    }
  }, [searchQuery, start]);

  const handleSelectLocation = useCallback((location) => {
    setSelectedLocation(location);
    setLoc(location.coordinates.lat, location.coordinates.lng, location.name);
  }, [setLoc]);

  const reverseGeocode = useCallback(async (lat, lng) => {

setLoading(true)
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`);
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const address = data.results[0].formatted_address;
        setSearchQuery(address);
      } else {
        setLoading(false)
        throw new Error('Unable to retrieve address');
      }
    } catch (error) {
      setLoading(false)
      console.error(error);
      throw new Error('Error occurred during reverse geocoding');
    }
  }, []);

  const checkAndShowInfoModal = useCallback(async () => {
    setLoading(true)
    try {
      const result = Platform.OS === 'android' ? check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION): await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (result === RESULTS.DENIED) {
        setShowInfoModal(true);
      } else if (result === RESULTS.GRANTED) {
        getUserLocation();
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('Error checking location permission:', error);
    }
  }, []);

  const getUserLocation = useCallback(() => {
    setLoading(true)
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await reverseGeocode(latitude, longitude);
        handleSearch();
        setLoading(false)
      },
      (error) => {
        setLoading(false)
        console.error(error);
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );
    setShow(false);
  }, [reverseGeocode, handleSearch]);

  const handleSearch = useCallback(async () => {
    if (!searchQuery) return;

    setLoading(true);

    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchQuery}&key=${apiKey}`);
      const data = await response.json();
      const results = data.results || [];
     
      setSearchResults(results);
      console.log(searchResults, 'jhs')
    } catch (error) {
      console.error('Error occurred while searching:', error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  const clearSearch = useCallback(() => {
    setStart(true);
    setShow(true);
    setSearchQuery('');
    setSearchResults([]);
    refInput.current.focus();
  }, []);

  const hideSearchResults = useCallback(() => {
    setShow(false);
    if (!searchQuery) {
      setSearchQuery(prev);
    }
  }, [searchQuery, prev]);

  return (
    <><TouchableWithoutFeedback onPress={hideSearchResults}>
      <View>
        <TextInput
          ref={refInput}
          onFocus={clearSearch}
          style={s_style.text_input}
          placeholder="Search location"
          value={searchQuery}
          placeholderTextColor={theme.colors.placeholder}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          keyboardType="web-search" />
        <View style={s_style.icon}>
          <Icon name="map-pin" type="feather" size={25} color="#BCC4CC" />
        </View>
        <View style={s_style.icon2}>
   {loading ?<ActivityIndicator color={theme.colors.dg} size={'small'}/>    :  <Icon name="x" type="feather" size={30} color="#BCC4CC" onPress={clearSearch} />}
       </View>

        {show ? (
          <ScrollView  showsVerticalScrollIndicator={false} style={s_style.box}>
            <TouchableOpacity style={s_style.button} onPress={checkAndShowInfoModal}>
              <View style={{ display: 'flex', gap: 20, marginHorizontal: 20, flexDirection: 'row' }}>
                <Location2 color={theme.colors.othergreen} />
                <Text style={{ fontSize: 15, marginTop: 3, color: theme.colors.othergreen, fontFamily: FontFamily.sourceSansProBold }}> Use Current Location</Text>
              </View>
            </TouchableOpacity>
          
            {
              searchResults.map((result) => {

            return(

              <TouchableOpacity
                  style={s_style.button}
                  key={result.place_id}
                  onPress={() => {
                    handleSelectLocation({
                      name: result.name,
                      coordinates: result.geometry.location,
                    });
                    setSearchQuery(result.formatted_address);
                    setStart(false);
                    setSearchResults([]);
                    setShow(false);
                  }}
                >
                  <View style={{ display: 'flex', gap: 20, marginHorizontal: 20,alignItems:'center', flexDirection: 'row' }}>
                    <Icon name='map-pin' type='feather' color={theme.colors.othergreen} />
                    <Text style={{ fontSize: 15,maxWidth:250, marginTop: 3, color: theme.colors.othergreen, fontFamily: FontFamily.sourceSansProBold }}>{result.formatted_address}</Text>
                  </View>
                </TouchableOpacity>
              )})
            }
          </ScrollView>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
      <Location_pop setmodal={setShowInfoModal} modal={showInfoModal} getUserLocation={getUserLocation} />

    </>
  );
};





const useStyles = makeStyles((theme) => ({
  column: {
    height: 35,
    alignContent: 'center',
    justifyContent: 'center',


  }
  ,
  text_input: {

    backgroundColor: theme.colors.slate,
    borderRadius: 23,
    height: 63,
    color:theme.colors.dg,
    width: '90%',
    paddingHorizontal: 70,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },
  icon: {
    margin: 15,
    position: 'absolute',
    top: 23,
    left: 30

  },
  box: {

  
    width: '90%',
    height: '70%',

    padding: 10,
    overflow: 'scroll',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10
  },
  icon2: {
    marginTop: 15,
    top: 23,
    right: 40,
    position: 'absolute',
  },
  text: {
    width: '70%',
    marginTop: 20

  },
  centeredView: {

    width: '100%',
    top: '50%',
    marginTop: 82,
    height: '50%'

  },

  modalView: {
    margin: 20,
    backgroundColor: 'red',
    width: '100%',
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
  mb_20: {
    marginBottom: 20
  },
  button: {
    paddingVertical:20,

    justifyContent:'center',
    borderBottomColor: theme.colors.tabColor,
    borderBottomWidth:0.2
  }

}))


export default Gsearch;
