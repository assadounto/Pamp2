import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Icon} from '@rneui/base';
import Home from '../screens/home_screens/Home';
import Profile from '../screens/home_screens/VendorDetail';
import Settings from '../screens/home_screens/Settings';
import Favourites from '../screens/start_screens/favourites';

const Tab = createBottomTabNavigator();

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View
      style={[
        {flexDirection: 'row'},
        {
          height: 70,
          justifyContent: 'space-evenly',
          marginBottom:20
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
              return {name: 'calendar', type: 'antdesign'};
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
              {flexDirection: 'row'},
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
            animation={isFocused ? 'zoomIn' : undefined}
            duration={250}>
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
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        cardStyle: {
          backgroundColor: '#ffff',
        },
      }}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Bookings" component={Profile} />
      <Tab.Screen name="Favorites" component={Favourites} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
