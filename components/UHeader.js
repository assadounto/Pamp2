import React, {cloneElement} from 'react';
//import PropTypes from 'prop-types';'
import { Badge } from '@rneui/base';
import {Text} from 'react-native';
import {Avatar, color, Header, Icon,Image} from '@rneui/base';
import {colors, styles} from '../src/Common_styles';
import {View} from 'react-native-animatable';
import {useSelector,useDispatch} from 'react-redux';
import { FontFamily } from '../GlobalStyles';
import userimg from '../assets/userimg.png'
import { update_new } from '../src/redux/user';
const UHeader = ({navigation}) => {
  const dispatch=useDispatch()
  const user = useSelector(state => state.user.userInfo);
  const userimg = useSelector(state => state.user.image1);
  const  newnoti= useSelector(state => state.user.newnoti);
  console.log(newnoti,'j')

  return (
    <View
      style={[
        {
          backgroundColor: 'white',
          marginBottom: 20,
          marginTop:30
        },
      ]}>
      <View
        style={{
          display: 'flex',
          marginTop: 40,
          marginLeft: 30,

        }}>
        <Avatar
        onPress={()=>navigation.navigate('Profile')}
          rounded
          size={58}
          source={userimg ? {uri: userimg} : user.image?{uri:user.image} :require('../assets/userimg.png')}
          //source={require('../assets/userimg.png')}
       // title={user.username[0]}
        
   containerStyle={{ backgroundColor: "#BDBDBD" }}
        />

        <Text
          style={[
            {
              position: 'absolute',
              top: 10,
              left: 70,
              fontSize: 24,
              fontFamily:'SourceSansPro-Semibold'

            },
            
            colors.dg2,
          ]}>
          Hi, {user.username} 
        </Text>

        <View style={{position: 'absolute', right: 30, top: 15}}>
        {
            newnoti  ?
            <>
            <Icon size={30} onPress={() =>{ dispatch(update_new(true)); navigation.navigate('All_notifications')}} name="bell" type="feather" color={colors.lg.color} />
            <Badge
               
                status="warning"
                badgeStyle={{width:15,height:15,borderRadius:50}}
              
                containerStyle={{  position: 'absolute', top: -6, right: 1 }} />
                </>
              
                :
                <Icon onPress={()=> navigation.navigate('All_notifications')} name="bell" type="feather" color={colors.lg.color} />
          }       
           </View>
      </View>
    </View>
  );
};

export default UHeader;
