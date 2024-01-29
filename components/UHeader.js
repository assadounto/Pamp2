import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Badge } from '@rneui/base';
import FastImage from 'react-native-fast-image';
import { update_new } from '../src/redux/user';
import { colors } from '../src/Common_styles';
import { FontFamily } from '../GlobalStyles';

const UHeader = ({ navigation,newnoti }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userInfo);
  const userimg = useSelector(state => state.user.image1);

console.log(userimg,'j')
  return (
    <View
      style={{
        backgroundColor: 'white',
        marginBottom: 20,
        marginLeft:20,
        marginTop: Platform.OS==='ios'?35:10,
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
               
                : require('../assets/place.png')
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
<TouchableOpacity onPress={() =>{ navigation.navigate('All_notifications')}}  style= {{flex:1,alignItems:'flex-end',justifyContent:'center', paddingHorizontal:30}}>
{
            newnoti  ?
            <View style={{top:5}}>
              <Icon onPress={() =>{ navigation.navigate('All_notifications')}} name="bell" type="feather" color={colors.lg.color} />
            <Badge
                 badgeStyle={{width:12,height:12,borderRadius:50}}
                status="warning"
                
                containerStyle={{ position: 'relative', top: -28, right: -5 }} />
                </View>:
              <View  style={{}}> 
              <Icon onPress={()=> navigation.navigate('All_notifications')} name="bell" type="feather" color={colors.lg.color} /></View> 
          }
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UHeader;
