import { makeStyles } from '@rneui/themed';
import { useTheme } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import LogoIcon from '../../../components/icons/logo';
import {
  View,
  ScrollView,
  RefreshControl,
  Switch,
  Pressable,
  Alert,
  StyleSheet,
  Linking, ActivityIndicator
} from 'react-native';
import { Image } from 'react-native';
import MailIcon from '../../../components/icons/Mail';
import SafeAreaTop from '../../../components/SafeAreaTop';
import { showBottom } from '../../redux/user';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import THeader from '../../../components/THeader';
import { Avatar, Icon, ListItem, color } from '@rneui/base';
import SwitchToggle from 'react-native-switch-toggle';
import { Text } from 'react-native-animatable';
import { colors, styles } from '../../Common_styles';
import { userLogout } from '../../redux/user';
import messaging from '@react-native-firebase/messaging';
import { checkNotifications } from 'react-native-permissions';
import { FontFamily } from '../../GlobalStyles';
import Discount_pop from '../../../components/Discount_pop';
import Blur from '../start_screens/Blur';
import Socials from '../../../components/Socials';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import FastImage from 'react-native-fast-image';
import { request, check, PERMISSIONS, RESULT, RESULTS } from "react-native-permissions";
import Demo from '../../../components/Demo';
import LockIcon from '../../../components/icons/Lock';
import CardIcon from '../../../components/icons/Card';
import BellIcon from '../../../components/icons/Bell';
import SendIcon from '../../../components/icons/Send';
import FileIcon from '../../../components/icons/File';
import LogoutIcon from '../../../components/icons/Logout';
import SurfIcon from '../../../components/icons/surf';
import Appearance from '../../../components/Appearance';
import { tr } from 'date-fns/locale';
import SparkleIcon from '../../../components/icons/Sparkle';
import Lock2Icon from '../../../components/icons/lock-2';
import GiftIcon from '../../../components/icons/gift';
import { version } from '../../services/http';



const Settings = ({ navigation }) => {
  const { theme } = useTheme();


  const menuOne = [
    {
      title: 'Change Email',
      icon: <MailIcon color={theme.colors.lg} />,
      route: 'change_email',
    },
    {
      title: 'Change Password',
      icon: <LockIcon color={theme.colors.lg} />,
      route: 'change_pass',
    },
    {
      title: 'Payment Methods',
      icon: <CardIcon color={theme.colors.disabled2} />,
      route: 'Select_payment',
    },
    {
      title: 'Discount Code',
      icon: <GiftIcon color={theme.colors.lg} />,
      route: 'discount',
    },
    {
      title: 'Invite Friends',
      icon: <SendIcon color={theme.colors.lg} />,
      route: 'Invite',
    },
  ];

  const menuTwo = [
    {
      title: 'Push Notifications',
      icon: <BellIcon color={theme.colors.lg} />,
      route: 'ChangePassword',
    },
    {
      title: 'Help & Support',
      icon: <Icon name='headphones' type="feather" color={theme.colors.lg} />,
      route: 'Help',
    },
    {
      title: 'About Pamp',
      icon: <LogoIcon style={{marginLeft:4,marginHorizontal:4}} color={theme.colors.lg} />,
      route: 'https://www.trypamp.com',
    },
    {
      title: 'Appearance',
      icon: <SparkleIcon color={theme.colors.lg} />,
      route: 'https://www.trypamp.com',
    },
  ];


  const menuThree = [
    {
      title: 'Privacy policy',
      icon: <Lock2Icon color={theme.colors.lg} />,
      route: 'https://www.trypamp.com/privacy-policy',
    },
    {
      title: 'Terms of Use',
      icon: <FileIcon color={theme.colors.lg} />,
      route: 'https://www.trypamp.com/terms-of-use',
    },
    {
      title: 'Terms of Service',
      icon: <FileIcon color={theme.colors.lg} />,
      route: 'https://www.trypamp.com/terms-of-service',
    },

  ];



  const styles2 = useStyles();
  const [log, setLog] = useState(false)
  const user = useSelector(state => state.user.userInfo)
  const [appearModal, setAppearModal] = useState(false)

  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const dispatch = useDispatch();

  const disabled = user?.influencer_requested
  const requestNotificationPermission = async () => {
    const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    return result;
  };

  const checkNotificationPermission = async () => {
    const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    return result;
  };

  const requestPermissionAndroid = async () => {
    const checkPermission = await checkNotificationPermission();
    if (checkPermission !== RESULTS.GRANTED) {
      const request = await requestNotificationPermission();
      if (request !== RESULTS.GRANTED) {
        console.log(request, 'red')
      }
    }
  };


  async function checkApplicationPermission() {


    const authorizationStatus = await messaging().requestPermission({ providesAppNotificationSettings: true });

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      setIsEnabled(true)
    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      console.log('User has provisional notification permissions.');
    } else {
      setIsEnabled(false)
      console.log('User has notification permissions disabled');
    }
  }
  const openNotificationSettings = () => {
    Linking.openSettings();
  };

  const [prevScrollY, setPrevScrollY] = useState(0);

  async function handleSignOut() {
    try {

      setLog(true);
      setTimeout(() => {
        setLog(false);
        dispatch(userLogout());
        Alert.alert('Success', 'Successfully logged out')
      }, 1000);
    } catch (error) {
      console.error('Error signing out:', error);
      // Handle error if needed
    }
  }

  useEffect(() => {
    checkApplicationPermission()
  }, []);
  const [modal, setmodal] = useState(false)
  return (

    <SafeAreaTop >

      <Text style={[styles.St1, { color: theme.colors.othergreen }, Platform.OS === 'android' ? { marginVertical: 0, } : { marginTop: 20 }]}>Settings</Text>

      <ScrollView


        contentContainerStyle={{ width: '90%', alignSelf: 'center' }}

        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>

        {
          user && user?.id ? <View
            key={1}
            style={[
              {
                borderRadius: 15,
                padding: 6,
                backgroundColor: theme.colors.slate,

                marginTop: 20,
              },
            ]}>
            <ListItem
              containerStyle={[{ borderRadius: 15, backgroundColor: theme.colors.slate }]}

              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <FastImage
                source={
                  user?.id && user?.image
                    ? { uri: user.image, headers: { Authorization: 'someAuthToken' }, priority: FastImage.priority.high }

                    : require('../../../assets/place.png')
                }
                style={{
                  borderRadius: 50,
                  width: 35,
                  height: 35,
                }}
              />
              <ListItem.Content>

                <ListItem.Title style={[colors.dgb, styles2.title]}>Profile </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron color={theme.colors.dg} size={25} />
            </ListItem>
            <ListItem

              disabled={disabled}
              containerStyle={[{ borderRadius: 15, backgroundColor: theme.colors.slate }]}
              onPress={() => {
                user.role=='influencer'? navigation.navigate('activity'):
                navigation.navigate('joinInfluencer');
              }}>

              <SurfIcon color={disabled ? theme.colors.disabled2 : theme.colors.lg} />
              <ListItem.Content>
                <ListItem.Title style={[{ color: disabled ? theme.colors.disabled2 : theme.colors.dg },{fontFamily:FontFamily.sourceSansProSemibold}]}>Pamp Influencer Program</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron color={disabled ? theme.colors.disabled2 : theme.colors.dg} size={25} />
            </ListItem>
          </View> : <></>

        }


        {
          user && user?.id ? <View
            style={[
              {
                borderRadius: 15,
                padding: 6,
                backgroundColor: theme.colors.slate,

                marginTop: 50,
              },
            ]}>
            {menuOne.map((item, index) => {
              return (
                <ListItem
                  key={index}
                  disabled={item.title === 'Payment Methods'}
                  containerStyle={[{ backgroundColor: theme.colors.slate }]}
                  onPress={() => {

                    navigation.navigate(item.route);


                  }}>
                  {item.icon}
                  <ListItem.Content>
                    <ListItem.Title style={[colors.dgb, { fontFamily: FontFamily.sourceSansProSemibold, color: item.title === 'Payment Methods' ? theme.colors.disabled2 : theme.colors.dg }]}>
                      {item.title}{' '}
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron color={item.title === 'Payment Methods' ? theme.colors.disabled2 : theme.colors.dg} size={25} />
                </ListItem>
              );
            })}
          </View>
            : <></>

        }

        <View
          style={[
            {
              borderRadius: 15,
              padding: 6,
              backgroundColor: theme.colors.slate,
              marginTop: 50,
            },
          ]}>
          {menuTwo.map((item, index) => {
            // Check if the item is 'Push Notifications' and user is not authenticated
            const shouldRenderToggle = item.title !== 'Push Notifications' || (item.title === 'Push Notifications' && user && user.id);

            return (
              shouldRenderToggle && (
                <ListItem
                  key={index}
                  disabled={item.title === 'Payment Methods'}
                  containerStyle={[{ backgroundColor: theme.colors.slate }]}
                  onPress={() => {
                    item.title === 'Push Notifications'
                      ? toggleSwitch()
                      : item.title === 'About Pamp'
                        ? Linking.openURL(item.route)
                        : item.title === 'Appearance' ?
                          setAppearModal(true)
                          : navigation.navigate(item.route);
                  }}>
                  {item.icon}
                  <ListItem.Content>
                    <ListItem.Title style={[colors.dgb, styles2.title]}>{item.title} </ListItem.Title>
                  </ListItem.Content>
                  {item.title === 'Push Notifications' ? (
                    <Pressable>
                      <SwitchToggle
                        switchOn={isEnabled}
                        onPress={() => {
                          if (!isEnabled) {
                            // If notifications are not enabled, open settings to enable them
                            openNotificationSettings();
                          } else {
                            openNotificationSettings();
                            // If notifications are enabled, toggle the switch
                          }
                        }}
                        circleColorOff={theme.colors.background}
                        backgroundColorOn={theme.colors.background}
                        backgroundColorOff="#fff"
                        containerStyle={{
                          width: 55,
                          height: 30,
                          borderWidth: 1.5,
                          borderColor: theme.colors.lgb,
                          borderRadius: 25,
                          padding: 5,
                          backgroundColor: theme.colors.background,
                        }}
                        circleStyle={{
                          borderWidth: 1.5,
                          borderColor: theme.colors.lgb,
                          width: 20,
                          height: 20,
                          borderRadius: 20,
                        }}
                      />
                    </Pressable>
                  ) : (
                    <ListItem.Chevron color={theme.colors.dg} size={25} />
                  )}
                </ListItem>
              )
            );
          })}
        </View>




        <View
          style={[
            {
              borderRadius: 15,
              padding: 6,
              backgroundColor: theme.colors.slate,
              marginTop: 50,
            },
          ]}>
          {menuThree.map((item, index) => {

            return (
              <ListItem
                key={index}
                containerStyle={[{ backgroundColor: theme.colors.slate }]}
                onPress={() => {
                  Linking.openURL(item.route)
                }}>
                {item.icon}

                <ListItem.Content>
                  <ListItem.Title style={[colors.dgb, styles2.title]}>
                    {item.title}{' '}
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron color={theme.colors.dg} size={25} />
              </ListItem>
            );
          })}
        </View>

        {user?.id && <View
          style={[
            {
              borderRadius: 15,
              backgroundColor: theme.colors.slate,
              marginVertical: 50,
            },
          ]}>
          <ListItem

            containerStyle={[
              {
                borderRadius: 15,
                paddingHorizontal: 25,
                borderRadius: 15,
                backgroundColor: theme.colors.slate,
              },
            ]}
            onPress={handleSignOut}>
            <LogoutIcon color={'#CD3D49'} />
            <ListItem.Content>
              <ListItem.Title style={[{ fontFamily: FontFamily.sourceSansProSemibold, color: theme.colors.dg }]}>Logout </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron color={theme.colors.dg} size={25} />
          </ListItem>
        </View>}
        <View style={{ marginBottom: 100 }}>
          <Socials />
          <Text style={{
            color: "#707070",
            fontFamily: FontFamily.sourceSansProRegular,
            fontSize: 15,
            textAlign: "center",
            marginBottom: 30,
          }}>
            version {version}
          </Text>
        </View>

      </ScrollView>
      <Appearance setModal={setAppearModal} modal={appearModal} />
      <Discount_pop setmodal={setmodal} modal={modal} />
      {modal && <Blur />}

      {log && <ActivityIndicator style={{ position: 'absolute', alignSelf: 'center', top: '50%' }} size={'small'} />}
    </SafeAreaTop>

  );
};


export default Settings;

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: FontFamily.sourceSansProSemibold,
    color: theme.colors.dg
  }
}))
