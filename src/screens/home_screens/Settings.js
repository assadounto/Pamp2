import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  Switch,
  Pressable,
  Alert,
  StyleSheet,
  Linking
} from 'react-native';
import { Image } from 'react-native';

import { showBottom } from '../../redux/user';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import THeader from '../../../components/THeader';
import {Avatar, Icon, ListItem} from '@rneui/base';
import SwitchToggle from 'react-native-switch-toggle';
import {Text} from 'react-native-animatable';
import {colors, styles} from '../../Common_styles';
import {userLogout} from '../../redux/user';
import messaging from '@react-native-firebase/messaging';
import {checkNotifications} from 'react-native-permissions';
import { FontFamily } from '../../GlobalStyles';
import Discount_pop from '../../../components/Discount_pop';
import Blur from '../start_screens/Blur';
import Socials from '../../../components/Socials';
import { GoogleSignin } from '@react-native-google-signin/google-signin';



const menuOne = [
  {
    title: 'Change Email',
    icon: 'mail',
    route: 'change_email',
  },
  {
    title: 'Change Password',
    icon: 'lock',
    route: 'change_pass',
  },
  {
    title: 'Payment Methods',
    icon: 'credit-card',
    route: 'Select_payment',
  },
  {
    title: 'Discount Code',
    icon: 'gift',
    route: 'discount',
  },
  {
    title: 'Invite Friends',
    icon: 'send',
    route: 'Invite',
  },
];

const menuTwo = [
  {
    title: 'Push Notifications',
    icon: 'bell',
    route: 'ChangePassword',
  },
  {
    title: 'Help & Support',
    icon: 'headphones',
    route: 'Help',
  },
  {
    title: 'About Pamp',
    icon: require('../../../assets/pamp-logo.png'),
    route: 'ChangePassword',
  },
];


const menuThree = [
  {
    title: 'Privacy policy',
    icon: require('../../../assets/Path660.png'),
    route: 'privacy',
  },
  {
    title: 'Terms of Use',
    icon: require('../../../assets/group-1892.png'),
    route: 'PaymentMethods',
  },
  {
    title: 'Terms of Service',
    icon: require('../../../assets/group-1892.png'),
    route: 'ChangePassword',
  },
];
const Settings = ({navigation}) => {


   
  const [isEnabled, setIsEnabled] = useState();
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const dispatch = useDispatch();
  async function checkApplicationPermission() {
    const authorizationStatus = await messaging().requestPermission({ providesAppNotificationSettings: true });
  
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      setIsEnabled(true)
    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      console.log('User has provisional notification permissions.');
    } else {
      console.log('User has notification permissions disabled');
    }
  }
  const openNotificationSettings = () => {
    Linking.openSettings();
  };

  const [prevScrollY, setPrevScrollY] = useState(0);

 

  useEffect(() => {
    checkApplicationPermission()
  }, []);
const [modal,setmodal]=useState(false)
  return (
    
      <><ScrollView
  
     
      contentContainerStyle={{ width: '90%', alignSelf: 'center' }}
      refreshControl={<RefreshControl
        //refreshing={isFetching || isLoading}
        onRefresh={() => { } } />}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <Text style={styles.St1}>Settings</Text>


      <View
        style={[
          {
            borderRadius: 15,
            padding: 6,
            backgroundColor: '#F9F9F9',

            marginTop: 20,
          },
        ]}>
        <ListItem
          containerStyle={[{ borderRadius: 15, backgroundColor: '#F9F9F9' }]}
          onPress={() => {
            navigation.navigate('Profile');
          } }>
          <Icon name="user" type="feather" color={colors.lg.color} />
          <ListItem.Content>
            <ListItem.Title style={[colors.dgb, styles2.title]}>Profile </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron style={colors.dgb} size={25} />
        </ListItem>
      </View>

      <View
        style={[
          {
            borderRadius: 15,
            padding: 6,
            backgroundColor: '#F9F9F9',

            marginTop: 50,
          },
        ]}>
        {menuOne.map((item, index) => {
          return (
            <ListItem
              containerStyle={[{ backgroundColor: '#F9F9F9' }]}
              onPress={() => {
                if (item.route == 'discount') {
                  dispatch(showBottom(false))
                  setmodal(true);
                } else {
                  navigation.navigate(item.route);
                }

              } }>
              <Icon
                name={item.icon}
                size={18}
                type="feather"
                color={colors.lg.color} />
              <ListItem.Content>
                <ListItem.Title style={[colors.dgb, styles2.title]}>
                  {item.title}{' '}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron style={colors.dgb} size={25} />
            </ListItem>
          );
        })}
      </View>

      <View
        style={[
          {
            borderRadius: 15,
            padding: 6,
            backgroundColor: 'red',
            backgroundColor: '#F9F9F9',
            marginTop: 50,
          },
        ]}>
        {menuTwo.map((item, index) => {
          return (
            <ListItem
              containerStyle={[{ backgroundColor: '#F9F9F9' }]}
              key={index}
              onPress={() => {
                item.icon === 'bell'
                  ? toggleSwitch()
                  : navigation.navigate(item.route);
              } }>
              {item.title !== 'About Pamp' ?
                <Icon
                  name={item.icon}
                  size={18}
                  type="feather"
                  color={colors.lg.color} /> :
                <Image
                  style={{ marginLeft: 4 }}
                  source={item.icon} />}
              <ListItem.Content>
                <ListItem.Title style={[colors.dgb, styles2.title]}>
                  {item.title}{' '}
                </ListItem.Title>
              </ListItem.Content>
              {item.icon === 'bell' ? (
                <Pressable onPress={() => console.log('h')}>
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
                      circleColorOff={colors.w.color}
                      backgroundColorOn={colors.lg.color}
                      backgroundColorOff="#fff"
                      containerStyle={{
                        width: 55,
                        height: 30,
                        borderWidth: 1.5,
                        borderColor: colors.lg.color,
                        borderRadius: 25,
                        padding: 5,
                        backgroundColor: 'white',
                      }}
                      circleStyle={{
                        borderWidth: 1.5,
                        borderColor: colors.lg.color,
                        width: 20,
                        height: 20,
                        borderRadius: 20,
                      }}
                    />
                </Pressable>
              ) : (
                <ListItem.Chevron style={colors.dgb} size={25} />
              )}
            </ListItem>
          );
        })}
      </View>

      <View
        style={[
          {
            borderRadius: 15,
            padding: 6,
            backgroundColor: '#F9F9F9',
            marginTop: 50,
          },
        ]}>
        {menuThree.map((item, index) => {
              return (
                <ListItem
                  containerStyle={[{backgroundColor: '#F9F9F9'}]}
                  onPress={() => {
                    navigation.navigate(item.route);
                  }}>
                   <Image
                    source={item.icon}
                    />
                  <ListItem.Content>
                    <ListItem.Title style={[colors.dgb,styles2.title]}>
                      {item.title}{' '}
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron style={colors.dgb} size={25} />
                </ListItem>
              );
            })}
      </View>

      <View
        style={[
          {
            borderRadius: 15,
            backgroundColor: '#F9F9F9',
            marginVertical: 50,
          },
        ]}>
        <ListItem
          containerStyle={[
            {
              borderRadius: 15,

              borderRadius: 15,
              backgroundColor: '#F9F9F9',
            },
          ]}
          onPress={async() => {
            await GoogleSignin.signOut().then((result)=>{
              dispatch(userLogout());
            }
            
            )
           
          } }>
          <Icon name="log-out" type="feather" color={'#CD3D49'} />
          <ListItem.Content>
            <ListItem.Title style={[{fontFamily:FontFamily.sourceSansProSemibold},colors.dgb]}>Logout </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron style={colors.dgb} size={25} />
        </ListItem>
      </View>
<Socials/>
    </ScrollView>
    <Discount_pop setmodal={setmodal} modal={modal}/>
    {modal&& <Blur/>}
    </>

  );
};

export default Settings;

const styles2= StyleSheet.create({
  title:{
    fontFamily: FontFamily.sourceSansProSemibold
  }
})
