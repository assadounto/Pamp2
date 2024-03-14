import React, { useEffect, useState } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
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
import Ratings from '../screens/home_screens/Ratings';
import { useSelector } from 'react-redux';
import { set } from 'date-fns';
import Blur from '../screens/start_screens/Blur';
import Rating_pop from '../../components/Rating_pop';
import Pop2 from '../screens/start_screens/pop2';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import { colors } from '../Common_styles';
const Tab = AnimatedTabBarNavigator();

function MyTabBar({state, descriptors, navigation}) {
 
  return (
    <View
      style={[
        {},
        
        {
          shadowColor: '#707070',
          shadowOpacity: 0.2,
          shadowRadius: 10,
          elevation: 4,
          shadowOffset: {width: 5, height: 0},
          backgroundColor: 'white',
          
       
        },
      ]}>
        <SafeAreaView style={{marginVertical:10, justifyContent: 'space-evenly',flexDirection: 'row'}}>
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
              return {name: 'home', type: 'feather'};
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
              {flexDirection: 'row',marginBottom:0},
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
      </SafeAreaView>
    </View>
  );
}

const MainNavigator = () => {
  const userstate =useSelector((state)=>state.user)
  const bottom= useSelector(state=>state.user.bottom_nav)
  const [modal,setmodal]=useState(false)
  const [vendor,setVendor]= React.useState({})
  const [infoModal,setInfoModal]=useState(false)
  const checkAnyRating=()=>{
    const ratings= userstate.rating
     console.log(ratings,'llllllllll')
    if (ratings.length!==0){
      setVendor(ratings[0])
     
      setmodal(true)
    }
  }

  useEffect(()=>{
  checkAnyRating()
  },[userstate])
  return (
    <><Tab.Navigator
    appearance={{
      shadow:true,
      horizontalPadding:30
    }}
    tabBarOptions={{
      activeBackgroundColor:colors.dg2.color,
      activeTintColor: colors.w.color,
      inactiveTintColor: colors.w.color
    }}>
      <Tab.Screen  options={{
        tabBarIcon: ({ focused, color, size }) => (
            <Icon
                name="home"

                type='feather'
                size={size ? size : 24}
                color={focused ? color : colors.dg2.color}
                focused={focused}
            
            />
        )
      }} name="Home" component={Home} />
      {/* Bookings */}
      <Tab.Screen name="Bookings" options={{
        tabBarIcon: ({ focused, color, size }) => (
            <Icon
                name="calendar"

                type='feather'
                size={size ? size : 24}
                color={focused ? color : colors.dg2.color}
                focused={focused}
            
            />
        )
      }}  component={Bookings} />
      <Tab.Screen name="Favorites" options={{
        tabBarIcon: ({ focused, color, size }) => (
            <Icon
                name="hearto"

                type='antdesign'
                size={size ? size : 24}
                color={focused ? color :colors.dg2.color}
                focused={focused}
            
            />
        )
      }} component={Favourites} />
  <Tab.Screen  options={{
      tabBarIcon: ({ focused, color, size }) => (
          <Icon
              name="sound-mix"

              type='entypo'
              size={size ? size : 24}
              color={focused ? color : colors.dg2.color}
              focused={focused}
          
          />
      )
    }} name="Settings" 
    component={Settings}       
    />
    </Tab.Navigator>
    <Rating_pop  vendor={vendor}  setInfoModal={setInfoModal} setmodal={setmodal} modal={modal}/>
    {
      modal && <Blur/>
     
    }
    {
      infoModal && <Blur/>
    }
    <Pop2 modal={infoModal}  main={'Review successfully sent to '+ vendor[1]}/>
    </>
  );
};

export default MainNavigator;
