import React from 'react';
import {Text, View,SafeAreaView,Pressable,StyleSheet,FlatList} from 'react-native';
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


const Notifications = () => {
  const user = useSelector(state => state.user.userInfo);
  const[refetch, { data, isLoading,  }] = useLazyGetnotificationsQuery();
  const isFocused = useIsFocused(); // Check if the screen is focused

  React.useEffect(() => {
    if (isFocused) {
      // Fetch new data when the screen is focused
      refetch(user.id);
    }
  }, [isFocused]);

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
    <>
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
      {data && data.length === 0 ? <EmptyStateNoti /> : (
        <FlatList
          data={data?.notifications}
          renderItem={renderNotificationComponent}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  notifications: {
    fontSize: 30,
    color: colors.dg2.color,
    fontWeight: 'bold',
    marginLeft: 40,
    marginTop: 70,
    marginBottom: 30,
  },
  x: {
    position: 'absolute',
    top: 72,
    right: 20,
  },
  icon: {
    fontWeight: 'bold',
  },
});