import React from 'react';
import { useTheme } from '@rneui/themed';
import { makeStyles } from '@rneui/themed';
import { Text, View, SafeAreaView, Pressable, StyleSheet, FlatList, Platform } from 'react-native';
import { Icon } from '@rneui/base';
import { colors } from '../../Common_styles';
import Normal from './Normal';
import Late from './late';
import Discount from './discount';
import Canceled from './canceled';
import Completed from './completed';
import Booked from './booked';
import EmptyStateNoti from '../../../components/EmptyNoti';
import { useNavigation, useIsFocused } from '@react-navigation/core';
import { useLazyGetnotificationsQuery } from '../../redux/authapi';
import { useSelector } from 'react-redux';
import { backendURL } from '../../services/http';
import { useFocusEffect, } from '@react-navigation/core';
import axios from 'axios';
import { horizontalScale, moderateScale, verticalScale } from '../../Dimensions';
import Loading from '../../../components/loading';

const Notifications = () => {
  const user = useSelector(state => state.user.userInfo);
  const [refetch, { data, isLoading, }] = useLazyGetnotificationsQuery();
  const isFocused = useIsFocused(); // Check if the screen is focused
  const markAllAsCompleted = async () => {
    const res = axios.patch(backendURL + '/mark_all_as_read', {
      id: user.id,
      scope: "user"

    })

  }

  const { theme } = useTheme();
  useFocusEffect(
    React.useCallback(() => {
      refetch(user.id);
    }, [])
  );
  React.useEffect(() => {
    console.log(data, 'l')
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


  if (isLoading) {
    return (<Loading type={'bell'} />)
  }
  const navigation = useNavigation();

  return (
    <View style={{}}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 100 }}
        data={data?.notifications}
        renderItem={renderNotificationComponent}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<EmptyStateNoti />}
      />
    </View>
  );
};

export default Notifications;
