import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Icon} from '@rneui/base';
import Home from '../screens/home_screens/Home';
import Profile from '../screens/home_screens/VendorDetail';
import Settings from '../screens/home_screens/Settings';
import Favourites from '../screens/home_screens/favourites';
import AppointmentsContainer from '../../components/AppointmentsContainer';
import Bookings from '../../screens/Bookings';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Success from '../screens/home_screens/Sucess';
const Tab = createBottomTabNavigator();

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View
      style={[
        {flexDirection: 'row'},
        
        {
          shadowColor: '#707070',
          shadowOpacity: 0.2,
          shadowRadius: 10,
          elevation: 2,
          shadowOffset: {width: 5, height: 0},
          backgroundColor: 'white',
          height: 90,
          justifyContent: 'space-evenly',
          //marginBottom:20
        },
      ]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const iconName = () => {
          switch (index) {
            case 0:
              return {name: 'home', type: 'antdesign'};
            case 1:
              return {name: 'calendar', type: 'feather'};
            case 2:
              return {name: 'hearto', type: 'antdesign'};
            case 3:
              return {name: 'sound-mix', type: 'entypo'};

            default:
              return {name: 'home', type: 'feather'};
          }
        };

        return (
          <Animatable.View
            style={[
              {flexDirection: 'row',marginBottom:20},
              isFocused
                ? {
                    backgroundColor: '#86D694',
                    borderRadius: 20,
                    width: 122,
                    height: 44,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  }
                : {},
            ]}
            key={index}
            // animation={isFocused ? 'slideInRight' : undefined}
            // duration={250}
            >
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                {
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}
              activeOpacity={0.8}
              disabled={isFocused}>
              <Icon
                {...iconName()}
                size={isFocused ? 20 : 25}
                color={isFocused ? '#FFFFFF' : '#B0EBBD'}
              />

              {isFocused && (
                <Text
                  style={{
                    color: '#FFFFFF',
                    marginLeft: 5,
                  }}>
                  {label}
                </Text>
              )}
            </TouchableOpacity>
          </Animatable.View>
        );
      })}
    </View>
  );
}

const MainNavigator = () => {
  return (
    <Tab.Navigator
    sceneContainerStyle={{ backgroundColor: 'white' }}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        unmountOnBlur: true,
      }}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen   options={{
    //  title: "HomePage",
    //  unmountOnBlur: true,
  }} name="Home" component={Home} />
      <Tab.Screen name="Bookings" component={Bookings} />
      <Tab.Screen name="Favorites" component={Favourites} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
