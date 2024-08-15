import { useTheme } from '@rneui/themed';
import { makeStyles } from '@rneui/themed';
import React from 'react';
import { View, Text, TouchableOpacity, Platform, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Badge } from '@rneui/base';
import FastImage from 'react-native-fast-image';
import { update_new } from '../src/redux/user';
import { colors } from '../src/Common_styles';
import { FontFamily } from '../GlobalStyles';
import { horizontalScale, moderateScale, verticalScale } from '../src/Dimensions';
import { setNextNav } from '../src/redux/user';

import BellIcon from './icons/Bell';
import SurfIcon from './icons/surf';
import SurfSmallIcon from './icons/surfsmall';
import SunIcon from './icons/Sun';
import SunSmallIcon from './icons/SunSmall';
const UHeader = ({ navigation, newnoti, new_message }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userInfo);
  const location = useSelector(state => state.user.location)
  const userimg = useSelector(state => state.user.image1);
  //{location.currency||"₵"}
  console.log(location.flag, 'new')
  const { theme } = useTheme();
  return (
    <View
      style={{
  
        marginBottom: verticalScale(20),
        marginLeft: horizontalScale(20),
        marginTop: Platform.OS === 'ios' ? verticalScale(45) : 10,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',

          padding: 10,
        }}
      >
        <TouchableOpacity onPress={() => { dispatch(setNextNav('main')); !user?.id ? navigation.navigate('login') : navigation.navigate('Profile') }}>
          <FastImage
            source={
              user?.id && user?.image
                ? { uri: user.image, headers: { Authorization: 'someAuthToken' }, priority: FastImage.priority.high }

                : require('../assets/place.png')
            }
            style={{
              borderRadius: 50,
              width: 60,
              height: 60,
            }}
          />
          {user?.role == 'influencer' ? <View style={{
            shadowColor: '#707070',
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 2,
            shadowOffset: { width: 5, height: 0 }, alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 50, left: 20, borderRadius: 50, width: 25, height: 25, backgroundColor: theme.colors.ring
          }}>
            <SurfSmallIcon />
          </View> : user?.points > 0 ? <View style={{
            shadowColor: '#707070',
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 2,
            shadowOffset: { width: 5, height: 0 }, alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 50, left: 20, borderRadius: 50, width: 25, height: 25, backgroundColor: theme.colors.ring
          }}>
            <SunSmallIcon fill={theme.colors.ring} />
          </View> : <></>}
        </TouchableOpacity>

        {user?.id ? <Text
          style={{
            fontSize: moderateScale(24),
            fontFamily: FontFamily.sourceSansProSemibold,
            color: theme.colors.lg,
            marginLeft: 10,
            width: horizontalScale(150)
          }}
        >
          Hi, {user?.username}{location && location.flag}
        </Text> : <></>}{
          user?.id ?
            <TouchableOpacity onPress={() => { navigation.navigate('notifications', { new_message }) }} style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: 30 }}>
              {
                newnoti || new_message ?
                  <Pressable onPress={() => { navigation.navigate('notifications', { new_message }) }} style={{ top: 5 }}>

                    <BellIcon size={30} color={theme.colors.lg} />

                    <Badge
                      badgeStyle={{ width: 12, height: 12, borderRadius: 50 }}
                      status="warning"

                      containerStyle={{ position: 'relative', top: -28, right: -5 }} />
                  </Pressable > :
                  <Pressable onPress={() => navigation.navigate('notifications')} style={{}}>
                    <BellIcon size={30} color={theme.colors.lg} />
                  </Pressable>
              }
            </TouchableOpacity> : <></>}
      </View>
    </View>
  );
};

export default UHeader;
