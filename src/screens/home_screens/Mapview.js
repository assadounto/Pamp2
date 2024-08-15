import { makeStyles } from '@rneui/themed';
import { useTheme } from '@rneui/themed';
import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Icon } from '@rneui/base';
import VendorMapPin from '../../../components/VendorMapin';

const Mapview = ({ route, navigation }) => {
  const { data } = route.params;
  const useStyles = makeStyles((theme) => ({
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  }));
  const { theme } = useTheme();
  const styles = useStyles();

  const lightMapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#333333"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#ffffff"
        },
        {
          "weight": 2
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#d6d6d6"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#cccccc"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "building",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#d4d4d4"
        }
      ]
    },
  ];

  const darkMapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        },
        {
          "weight": 2
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#fff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#fff"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#5a5a5a"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "red"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "building",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3a3a3a"
        }
      ]
    },
  ];

  return (
    <>
      <MapView
        initialRegion={{
          latitude: data.lat ? parseFloat(data.lat) : 5.614818,
          longitude: data.lon ? parseFloat(data.lon) : -0.205874,
          latitudeDelta: 0.00122,
          longitudeDelta: 0.00121,
        }}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
       // customMapStyle={theme.mode === 'dark' ? darkMapStyle : lightMapStyle}
      >
        <Marker
          coordinate={{ latitude: data.lat ? parseFloat(data.lat) : 5.614818, longitude: data.lon ? parseFloat(data.lon) : -0.205874 }}
          pinColor="red"
        />
      </MapView>
      <Pressable onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 60, left: 20 }}>
        <Icon
          name='chevron-back-outline'
          type='ionicon'
          size={30}
        />
      </Pressable>
      <VendorMapPin data={data} />
    </>
  );
};

export default Mapview;
