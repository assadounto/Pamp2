import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  Switch,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import THeader from '../../../components/THeader';
import {Avatar, Icon, ListItem} from '@rneui/base';
import SwitchToggle from 'react-native-switch-toggle';
import {Text} from 'react-native-animatable';
import {colors, styles} from '../../Common_styles';
import {userLogout} from '../../redux/user';

const menuOne = [
  {
    title: 'Change Email',
    icon: 'user',
    route: 'change_email',
  },
  {
    title: 'Change Password',
    icon: 'lock',
    route: 'ChangePassword',
  },
  {
    title: 'Payment Methods',
    icon: 'credit-card',
    route: 'PaymentMethods',
  },
  {
    title: 'Discount Code',
    icon: 'gift',
    route: 'PaymentMethods',
  },
  {
    title: 'Invite Friends',
    icon: 'mail',
    route: 'PaymentMethods',
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
    route: 'PaymentMethods',
  },
  {
    title: 'About Pamp',
    icon: 'lock',
    route: 'ChangePassword',
  },
];

const menuThree = [
  {
    title: 'Privacy policy',
    icon: 'lock',
    route: 'privacy',
  },
  {
    title: 'Terms of Use',
    icon: 'headphones',
    route: 'PaymentMethods',
  },
  {
    title: 'Terms of Service',
    icon: 'lock',
    route: 'ChangePassword',
  },
];
const Settings = ({navigation}) => {
  const image = useSelector(state => state.user.image1);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (error) {
  //     displayError(error);
  //   }
  // }, [error]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.w.color,
      }}>
      <ScrollView
        style={{width: '90%', alignSelf: 'center'}}
        refreshControl={
          <RefreshControl
            //refreshing={isFetching || isLoading}
            onRefresh={() => {}}
          />
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Text style={styles.St1}>Settings</Text>
        <View
          style={{
            alignSelf: 'center',
          }}>
        </View>
        <View
        // style={
        //   //[Gutters.smallTMargin, Gutters.largeBMargin]
        // }
        >
          <View
            style={[
              {
                borderRadius: 15,
                padding: 6,
                backgroundColor: '#F9F9F9',

                marginTop: 50,
              },
            ]}>
            <ListItem
              containerStyle={[{borderRadius: 15, backgroundColor: '#F9F9F9'}]}
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <Icon name="user" type="feather" color={colors.lg.color} />
              <ListItem.Content>
                <ListItem.Title style={colors.dgb}>Profile </ListItem.Title>
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
                  containerStyle={[{backgroundColor: '#F9F9F9'}]}
                  onPress={() => {
                    navigation.navigate(item.route);
                  }}>
                  <Icon
                    name={item.icon}
                    type="feather"
                    color={colors.lg.color}
                  />
                  <ListItem.Content>
                    <ListItem.Title style={colors.dgb}>
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
                  containerStyle={[{backgroundColor: '#F9F9F9'}]}
                  key={index}
                  onPress={() => {
                    item.icon === 'bell'
                      ? toggleSwitch()
                      : navigation.navigate(item.route);
                  }}>
                  <Icon
                    name={item.icon}
                    type="feather"
                    color={colors.lg.color}
                  />
                  <ListItem.Content>
                    <ListItem.Title style={colors.dgb}>
                      {item.title}{' '}
                    </ListItem.Title>
                  </ListItem.Content>
                  {item.icon === 'bell' ? (
                    <Pressable onPress={() => console.log('h')}>
                      <SwitchToggle
                        switchOn={isEnabled}
                        onPress={() => toggleSwitch()}
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
                  <Icon
                    name={item.icon}
                    type="feather"
                    color={colors.lg.color}
                  />
                  <ListItem.Content>
                    <ListItem.Title style={colors.dgb}>
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
              onPress={() => {
                dispatch(userLogout());
              }}>
              <Icon name="log-out" type="feather" color={'#CD3D49'} />
              <ListItem.Content>
                <ListItem.Title style={colors.dgb}>Logout </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron style={colors.dgb} size={25} />
            </ListItem>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
