import React, {useState} from 'react';
import {View, ImageBackground,PermissionsAndroid ,Platform, Text, StyleSheet, Pressable,ActivityIndicator, Alert} from 'react-native';
import {FontFamily} from '../../../GlobalStyles';
import {loginUser, setnotifications} from '../../redux/user';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../redux/user';
import pop2 from './pop';
import Blur from './Blur';
import Pop2 from './pop2';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import { backendURL } from '../../services/http';


import {useGetCategoriesQuery} from '../../redux/authapi';
import {request, PERMISSIONS} from 'react-native-permissions';
import { horizontalScale, moderateScale, verticalScale } from '../../Dimensions';
const Turnon = ({navigation}) => {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.user.notifications);
  const user= useSelector((state)=>state.user.userInfo)
  const [modalVisible, setModal] = useState(false);
  const [loading,setLoading]= useState(false)
  const next= useSelector(state=>state.user.next)

  const notify = () => {
    
    setModal(true);
    setTimeout(() => {
      setModal(false);
       login( user);
    }, 4000);
   
  };
  const maybe=()=>{
    login(user);
    if(next && next=='Favourites'){
     
      // navigation.goBack()
        navigation.navigate('main')
      
     }

     
     else{

       navigation.replace(next)
     }
  }

  const login=async(values)=>{
    setLoading(true)
      try {
        
        const {data} = await axios.post(backendURL+'/user/login', {user:values});
          // Handle success
          console.log(data)
          dispatch(loginUser(data))
          setLoading(false)
          if(next && next=='Favourites'){
     
            // navigation.goBack()
              navigation.navigate('main')
            
           }

           
           else{

             navigation.replace(next)
           }
        } catch (error) {
          // Handle error
          setLoading(false)
          Alert.alert("Error",'Something went wrong.Try again')
        }
    }
  
  const request = async() => {
    if(Platform.OS ==="android"){
      try {
        PermissionsAndroid.check('android.permission.POST_NOTIFICATIONS').then(
          response => {
            if(!response){
              PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS',{
                  title: 'Notification',
                  message:
                    'Pamp needs access to your notification ' +
                    'so you can get Updates',
                  buttonNeutral: 'Ask Me Later',
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK',
              })
            }
          }
        ).catch(
          err => {
            console.log("Notification Error=====>",err);
          }
        )
      } catch (err){
        console.log(err);
      }
    }
    const authorizationStatus = await messaging().requestPermission({ providesAppNotificationSettings: true });
  
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      notify()
    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      login(user);
    } else {
      login(user);    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Group2.png')}
        style={styles.c1}>
        <ImageBackground
          source={require('../../../assets/notification-bell1.png')}
          style={styles.c3}
        />
        <View style={styles.c2}>
          <Text
            style={[
              {
                fontFamily: FontFamily.sourceSansProSemibold,
                fontSize: 31,
                alignSelf: 'center',
                marginTop: 40,
                color: '#00463C',
              },
            ]}>
            Turn on notifications
          </Text>
          <Text style={styles.c5}>
            Don't miss appointments, promos and exclusive offers.{' '}
          </Text>
{
  loading? <View style={styles.activity}><ActivityIndicator size="large" color="#00ff00" /></View>
  
  :   <><Pressable style={styles.c6} onPress={request}>
                <Text style={styles.c7}>Turn on</Text>
              </Pressable><Pressable onPress={maybe}>
                  <Text style={styles.cl}>Maybe later</Text>
                </Pressable></>
}
         
        </View>
      </ImageBackground>
    
      {modalVisible && (
        <Pop2 main={'Notification successfully turned on'} modal={modalVisible} />
      )}
      {modalVisible && <Blur />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: horizontalScale(300),
    height: verticalScale(200),
    alignSelf: 'center',
    position: 'absolute',
    top: 100,
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
export default Turnon;
