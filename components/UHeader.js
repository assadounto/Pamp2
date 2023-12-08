import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Badge } from '@rneui/base';
import FastImage from 'react-native-fast-image';
import { update_new } from '../src/redux/user';
import { colors } from '../src/Common_styles';
import { FontFamily } from '../GlobalStyles';

const UHeader = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userInfo);
  const userimg = useSelector(state => state.user.image1);
  const newnoti = useSelector(state => state.user.newnoti);
console.log(userimg,'j')
  return (
    <View
      style={{
        backgroundColor: 'white',
        marginBottom: 20,
        marginLeft:20,
        marginTop: 55,
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
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <FastImage
            source={
              user.image
                ? { uri: user.image, headers: { Authorization: 'someAuthToken' }, priority: FastImage.priority.high }
               
                : require('../assets/userimg.png')
            }
            style={{
              borderRadius: 50,
              width: 60,
              height: 60,
            }}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 24,
            fontFamily: FontFamily.sourceSansProSemibold,
            color: colors.dg2.color,
            marginLeft: 10,
          }}
        >
          Hi, {user.username}
        </Text>
<View style= {{position:'absolute',right:30,top:27}}>
        {newnoti? (
          <TouchableOpacity onPress={() => { dispatch(update_new(false)); navigation.push('All_notifications'); }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon size={30} name="bell" type="feather" color={colors.lg.color} />
              <Badge
                status="warning"
                badgeStyle={{right:18, top:-10,width: 15, height: 15, borderRadius: 50 }}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('All_notifications')}>
            <Icon name="bell" type="feather" color={colors.lg.color} />
          </TouchableOpacity>
        )}
        </View>
      </View>
    </View>
  );
};

export default UHeader;
