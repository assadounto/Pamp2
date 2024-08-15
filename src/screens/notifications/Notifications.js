import React, { useState, useCallback, useEffect } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { useIsFocused, useFocusEffect, useNavigation } from '@react-navigation/core';
import axios from 'axios';
import { useLazyGetnotificationsQuery } from '../../redux/authapi';
import Booked from './booked';
import Canceled from './canceled';
import Completed from './completed';
import Discount from './discount';
import Late from './late';
import Normal from './Normal';
import EmptyStateNoti from '../../../components/EmptyNoti';
import Loading from '../../../components/loading';
import { backendURL } from '../../services/http';
import Points from './points';
import Payment from './payment';
import Influencer from './influencer';
import Reminder from './Reminder';

const Notifications = () => {
  const user = useSelector(state => state.user.userInfo);
  const [page, setPage] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refetch] = useLazyGetnotificationsQuery();
  const isFocused = useIsFocused();

  const markAllAsCompleted = async () => {
    try {
      await axios.patch(`${backendURL}/mark_all_as_read`, {
        id: user.id,
        scope: "user"
      });
    } catch (error) {
      console.error("Error marking all as completed:", error);
    }
  };

  const loadMore = async () => {
    if (page <= totalPages && !loading) {
      setLoading(true);
      try {
        const { data } = await refetch({ id: user.id, page });
        setNotifications(prev => [...prev, ...data?.notifications]);
        setTotalPages(data.total_pages);
        setPage(prevPage => prevPage + 1);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={{ padding: 10 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  useFocusEffect(
    useCallback(() => {
      loadMore();
    }, [isFocused])
  );

  useEffect(() => {
    const markAllAsCompletedHandler = async () => {
      await markAllAsCompleted();
    };

    const timeoutId = setTimeout(markAllAsCompletedHandler, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  const renderNotificationComponent = ({ item }) => {
    switch (item.notification_type) {
      case 'booked':
        return <Booked data={item} />;
      case 'reminder':
        return <Reminder data={item} />;
      case 'influencer':
        return <Influencer data={item} />;
      case 'payment':
        return <Payment data={item} />;
      case 'points':
        return <Points data={item} />;
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

  if (loading && page === 1) {
    return <Loading type={'bell'} />;
  }

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 100 }}
        data={notifications}
        renderItem={renderNotificationComponent}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<EmptyStateNoti />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default Notifications;
