import React from 'react';
import {Text, View,SafeAreaView,Pressable,StyleSheet,FlatList, Platform} from 'react-native';
import { Icon } from '@rneui/base';
import {colors} from '../../Common_styles';
import Normal from './Normal';
import Late from './late';
import Discount from './discount';
import Canceled from './canceled';
import Completed from './completed';
import Booked from './booked';
import EmptyStateNoti from '../../../components/EmptyNoti';
import { useNavigation,useIsFocused } from '@react-navigation/core';
import { useLazyGetnotificationsQuery } from '../../redux/authapi';
import { useSelector } from 'react-redux';
import { backendURL } from '../../services/http';
import { useFocusEffect,} from '@react-navigation/core';
import axios from 'axios';
import { horizontalScale, moderateScale, verticalScale } from '../../Dimensions';

const Notifications = () => {
  const user = useSelector(state => state.user.userInfo);
  const[refetch, { data, isLoading,  }] = useLazyGetnotificationsQuery();
  const isFocused = useIsFocused(); // Check if the screen is focused
  const markAllAsCompleted=async()=>{
    const res= axios.patch(backendURL+'/mark_all_as_read',{
      id: user.id,
      scope: "user"
    
    })

    }

    useFocusEffect(
      React.useCallback(() => {
        refetch(user.id);
    }, [])
    );
  React.useEffect(() => {
    console.log(data,'l')
    const markAllAsCompletedHandler = async () => {
      await markAllAsCompleted();
    };
  
    const timeoutId = setTimeout(markAllAsCompletedHandler, 1000);
  
    // Cleanup logic when component unmounts or user navigates away
    return () => {
      clearTimeout(timeoutId);
    };
      // Fetch new data when the screen is focused
     
      
    

  }, []);




  

  const renderNotificationComponent = ({ item }) => {
    switch (item.notification_type) {
      case 'booked':
        return <Booked data={item} />;
      case 'cancelled':
        return <Canceled data={item} />;
      case 'completed':
        return <Completed data={item} />;
      case 'discount':
        return <Discount data={item} />;
      case 'late':
        return <Late data={item} />;
      case 'normal':
        return <Normal data={item} />;
      default:
        return null;
    }
  };

  const navigation = useNavigation();
  
  return (
    <View style={{marginTop:verticalScale(60)}}>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
      <Text style={[styles.notifications, styles.myFavTypo]}>Notifications</Text>
      <Pressable style={styles.x} onPress={() => navigation.goBack()}>
        <Icon
          type='ionicon'
          name='close-outline'
          color={colors.dg.color}
          size={30}
          style={styles.icon}
          resizeMode="cover"
          source={require('../../../assets/x5.png')}
        />
      </Pressable>
      </View>
        <FlatList
        contentContainerStyle={{paddingBottom:100}}
          data={data?.notifications}
          renderItem={renderNotificationComponent}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={<EmptyStateNoti />}
        />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  notifications: {
    fontSize: moderateScale(30),
    color: colors.dg2.color,
    fontWeight: 'bold',
    marginLeft: horizontalScale(40),
  
   paddingBottom:10
  },
  x: {
 
marginRight:horizontalScale(20)

  },
  icon: {
    fontWeight: 'bold',
  },
});