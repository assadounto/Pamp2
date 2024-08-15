import React, { useState, useEffect } from 'react';
import { Platform, FlatList, View } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useTheme } from '@rneui/themed';

import BHeader from '../../../components/BHeader';
import EmptyStateNoti from '../../../components/EmptyNoti';
import SafeAreaTop from '../../../components/SafeAreaTop';
import WithdrawalCard from '../../../components/WithdrawalCard';
import { backendURL } from '../../services/http';
import { colors } from '../../Common_styles';
import theme from '../../redux/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Emptyfav from '../../../components/EmptyFav';

const History = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();
    const user = useSelector((state) => state.user.userInfo);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${backendURL}/user/withdraw/${user.id}`);
            setData(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
      
            <SafeAreaView style={{ flex:1, backgroundColor: theme.colors.background }}>
                <BHeader
           
                    top={Platform.OS === 'ios' ? 0 : 20}
                    // color={colors.dg2.color}
                    title={'Transaction History'}
                />
                <FlatList
                    data={[]}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <WithdrawalCard item={item} />}
                    ListEmptyComponent={
                        !loading && <Emptyfav title={'No transactions yet'} />
                    }
                />
            </SafeAreaView>
        
    );
};

export default History;
