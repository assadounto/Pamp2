import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, Modal, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Button } from '@rneui/base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { colors } from '../src/Common_styles';
import MapView,{Marker} from 'react-native-maps';
const GooglePlacesSearchModal = ({ visible,setVisible, onClose,setLocation }) => {
 
    const [selectedPlace, setSelectedPlace] = useState({
    
    name: 'adu',
    latitude: 5.703291,

    longitude: -0.299065,
  });

  const renderListItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.description}</Text>
    </View>
  );

  const onSelectPlace = (data, details) => {
    setLocation({
        name: data.description,
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      })
    setSelectedPlace({
      name: data.description,
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
  };

  const clearSelectedPlace = () => {
  
    setSelectedPlace(null);
  };

  const setAndClose=()=>{
    setLocation(selectedPlace)
    setVisible(false)

  }

  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Pressable onPress={()=> setVisible(false)}><Text style={styles.closeButtonText}>Close</Text></Pressable>
        </TouchableOpacity>
        <GooglePlacesAutocomplete
        currentLocation={true}
          placeholder="Search"
          fetchDetails={true}
          onPress={onSelectPlace}
          query={{
            key: 'AIzaSyBC14OiKIMS0t6EHuCMi7NGpm8Hn8I6QE0',
            language: 'en',
          }}
          styles={{
            textInputContainer: styles.textInputContainer,
            textInput: styles.textInput,
            listView: styles.listView,
          }}
        />
        {selectedPlace &&
       <MapView
        style={styles.map}
       initialRegion={{
         latitude: selectedPlace.latitude,
         longitude: selectedPlace.longitude,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421,
       }}
     >
       <Marker
         coordinate={{ latitude: selectedPlace.latitude, longitude: selectedPlace.longitude }}
       />
     </MapView> 
    }
         
        {selectedPlace ? (
          <View style={styles.selectedPlaceContainer}>
            <Text style={styles.selectedPlaceName}>{selectedPlace.name}</Text>
            <Text style={styles.selectedPlaceLatLng}>
              Latitude: {selectedPlace.latitude}, Longitude: {selectedPlace.longitude}
            </Text>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 10, marginVertical: 20 }}>
                        <Button onPress={clearSelectedPlace} buttonStyle={{ borderRadius: 40, backgroundColor: 'red', width: 120, height: 40 }} title='clear'>

                        </Button>
                        <Button onPress={setAndClose} buttonStyle={{ borderRadius: 40, backgroundColor: colors.lg.color, width: 120, height: 40 }} title='Use'>

                        </Button>
                    </View>
          </View>
        ) : null}
      </View>
    </Modal>
  );
};

export default GooglePlacesSearchModal

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
      },
  modalContainer: {
    height:300,
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInputContainer: {
 
    backgroundColor: '#fff',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  listView: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 5,
  },
  itemContainer: {
    padding: 10,
  },
  selectedPlaceContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  selectedPlaceName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  selectedPlaceLatLng: {
    fontSize: 14,
  },
  clearButton: {
    marginTop: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  }
}
)