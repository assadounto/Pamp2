import { Overlay, useTheme } from '@rneui/themed';
import { makeStyles } from '@rneui/themed';
import { Platform } from 'react-native';
import React from 'react';
import { Text, Alert, View, Pressable,Modal } from 'react-native';
import { colors } from '../src/Common_styles';
import { FontFamily } from '../GlobalStyles';
import { verticalScale,horizontalScale } from '../src/Dimensions';

import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
import LocationIcon from './icons/Location';
import Blur from '../src/screens/start_screens/Blur';

const Location_pop = ({ setmodal, getUserLocation, modal }) => {
  const requestLo = () => {
    request(Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          setmodal(false);
          console.log("This feature is not available (on this device / in this context)");
          break;
        case RESULTS.DENIED:
          showBlockedModal();
          console.log("The permission has not been requested / is denied but requestable");
          break;
        case RESULTS.LIMITED:
          setmodal(false);
          console.log("The permission is limited: some actions are possible");
          break;
        case RESULTS.GRANTED:
          console.log("The permission is granted");
          getUserLocation();
          setmodal(false);
          break;
        case RESULTS.BLOCKED:
          setmodal(false);
          console.log("The permission is denied and not requestable anymore");
          break;
      }
    });
  };

  const showBlockedModal = () => {
    Alert.alert(
      'Location Permission Blocked',
      'Location permission has been blocked. Enable it in settings to use this feature.',
      [{ text: 'OK', onPress: () => setmodal(false) }]
    );
  };

  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <>

      <Modal  animationType='fade' transparent={true} visible={modal}>

      <View style={styles.pop2}>
        <Text style={styles.title}>Turn on location</Text>
        <Text style={styles.description}>
          Pamp collects location data while the app is in use to help find vendors near you. We do not share your location with anyone.
        </Text>
        <Pressable style={styles.button} onPress={requestLo}>
          <Text style={styles.buttonText}>Yes</Text>
        </Pressable>
        <Pressable onPress={() => setmodal(false)}>
          <Text style={styles.cancelText}>No</Text>
        </Pressable>
      </View>

      </Modal>
      {
        modal && <Blur/>
      }
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  pop2: {
    position: 'absolute',
    bottom: verticalScale(30),
    backgroundColor: theme.colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: horizontalScale(20),
    alignSelf: 'center',
    padding: horizontalScale(40),
    alignContent: 'center',

    width: '100%',
    
  },
  container: {
    alignItems: 'center',
  },
  title: {
    fontFamily: FontFamily.sourceSansProSemibold,
    fontSize: 31,
    alignSelf: 'center',
    marginTop: 0,
    color: theme.colors.dg,
  },
  description: {
    alignSelf: 'center',
    width: '90%',
    textAlign: 'center',
    color: '#BBB9BC',
    padding: 10,
    fontFamily: FontFamily.sourceSansProSemibold,
    fontSize: 15,
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 30,
    backgroundColor: '#86D694',
    width: 120,
    height: 40,
    marginTop: 20,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 20,
    color: '#FFFFFF',
  },
  cancelText: {
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
    fontFamily: FontFamily.sourceSansProRegular,
    color: theme.colors.dg,
  },
}));

export default Location_pop;
