import React, { useState } from 'react';
import { Text,Alert, View,Pressable, SafeAreaView,ImageBackground, Modal, StyleSheet} from 'react-native';
import {  colors } from '../src/Common_styles';
import { FontFamily } from '../GlobalStyles';
import { Button,Rating } from '@rneui/base';
import { Image } from 'react-native-animatable';
import { useNavigation } from '@react-navigation/core';
import { horizontalScale, moderateScale, verticalScale } from '../src/Dimensions';
import { useDispatch } from 'react-redux';
import { showBottom, show_training } from '../src/redux/user';
import { request,Platform, PERMISSIONS, RESULT, RESULTS } from "react-native-permissions";
import { SvgUri } from 'react-native-svg';

const Location_pop = ({ setmodal,getUserLocation, scope, modal }) => {

  const requestLo=()=>{

    request(Platform.OS==='ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
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

  const navigation = useNavigation();
  return (
    <Modal  onRequestClose={()=>setmodal(!modal)} animationType="slide" transparent={true} visible={modal}>
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Group2.png')}
        style={styles.c1}>
       
        <Image
          source={require('../assets/Locationcon.png')}
          style={styles.c3}
        />
        <View style={styles.c2}>
          <Text
            style={[
              {
                fontFamily: FontFamily.sourceSansProBold,
                fontSize: 31,
                alignSelf: 'center',
                marginTop: 40,
                color: '#00463C',
              },
            ]}>
            Turn on location
          </Text>
          <Text style={styles.c5}>
            Pamp collects location data when appp is in use to enable pamp get vendors near you. We do not share location with anyone.
          </Text>
 <><Pressable style={styles.c6} onPress={requestLo}>
                <Text style={styles.c7}>Yes</Text>
              </Pressable><Pressable onPress={() => setmodal(!modal)}>
                  <Text style={styles.cl}>No</Text>
                </Pressable></>

         
        </View>
      </ImageBackground>
    
      
    </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activity:{
alignSelf: 'center'
  },
  text: {
    fontSize: moderateScale(30),
  },
  c1: {width: '100%', height: '100%'},
  c2: {
    width: '90%',
paddingBottom:20,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    alignSelf: 'center',
    bottom:verticalScale(148),
    borderRadius: 20,
  },
  c3: {
   
    alignSelf: 'center',
    position: 'absolute',
    top: verticalScale(130),
  },
  c4: {
    marginTop: verticalScale(20),
    width: horizontalScale(170),
    height: verticalScale(100),
    alignSelf: 'center',
  },
  c5: {
    alignSelf: 'center',
    width: horizontalScale(220),
    textAlign: 'center',
    color: '#00463C',
    padding: 10,
    fontFamily:FontFamily.sourceSansProSemibold,
    fontSize: moderateScale(15),
  },
  c6: {
    justifyContent:'center',
  alignSelf:'center',
    borderRadius: 30,
    backgroundColor: '#86D694',
    width: horizontalScale(150),
    height: verticalScale(50),
    marginTop: verticalScale(30),
  },
  c7: {
  alignSelf:'center',

    fontSize: moderateScale(20),
    color: '#FFFFFF',

  },
  cl: {
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 20,
    fontSize: moderateScale(20),
    fontFamily: FontFamily.sourceSansProRegular,

    color: '#00463C',
  },
});

export default Location_pop ;


