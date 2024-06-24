import { makeStyles } from '@rneui/themed';
import { useTheme,ListItem } from '@rneui/themed';
import { FontFamily } from '../../GlobalStyles';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity,Image } from 'react-native';
import { backendURL } from '../../services/http';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import { formatToTime } from '../../Functions';
import DoubleTick from '../../../components/icons/DoubleTick';
import { useFocusEffect } from '@react-navigation/core';
import SingleTick from '../../../components/icons/SingleTick';
const ChatListScreen = ({ navigation, route }) => {
    const [chatPartners, setChatPartners] = useState([]);
    const userId = useSelector((state) => state.user.userInfo.id)
    const userType = 'user' // Assume these are passed as params
    const { theme } = useTheme();
  

    useFocusEffect(
        React.useCallback(() => {
            fetch(`${backendURL}/${userType}s/${userId}/chat_partners`)
                .then(response => response.json())
                .then(data => setChatPartners(data))
                .catch(error => console.error('Error fetching chat partners:', error));
        }, [])
    );

    
console.log(chatPartners)
    const renderItem = ({ item }) => (
        
        <ListItem
            onPress={()=>navigation.navigate('Chat', { vendor:item.vendor, userId, vendorId: item.vendor.id, userType })}
            containerStyle={[{
                height: 80,
                borderRadius: 20,
                paddingLeft: 10,
                paddingRight: 40,
                backgroundColor: theme.colors.slate,
                width: '90%',
           
                alignSelf: 'center',
            }]}
        >
            <Text style={{ position: 'absolute', top: 10,right:20, fontFamily: FontFamily.sourceSansProBold, color: theme.colors.dg, fontSize: 10 }}>{item.first_unread_message ? formatToTime(item?.first_unread_message?.created_at) : formatToTime(item?.last_message?.created_at)}</Text>
           { 
                item.unread_count === 0 ? <View style={{ position: 'absolute', bottom: 14, right: 20, }}>
                    {item.last_message.read_at ? <DoubleTick color={theme.colors.dg} /> : <SingleTick color={theme.colors.dg} />}
                </View> :
           
           <View style={{ position: 'absolute', bottom: 14, right: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.lgb, width: 18, height: 18, borderRadius: 50 }}>
                <Text style={{ fontFamily: FontFamily.sourceSansProRegular, color: theme.colors.dg, fontSize: 10 }}>{item.unread_count}</Text>
            </View> }
            <FastImage
                style={{ borderRadius: 50, width: 50, height: 50 }}
                source={item.vendor.image ? { uri: item.vendor.image} : require('../../../assets/userimg.png')}
            />
            <ListItem.Content>
                <ListItem.Title style={{}}>
                    <View style={{ alignContent: 'center' }}>
                        <Text style={{ fontFamily: FontFamily.sourceSansProBold, color: theme.colors.dg, fontSize: 18 }}>{item.vendor.username}</Text>
                        <Text style={{ fontFamily: FontFamily.sourceSansProRegular, color: '#999999', fontSize: 12 }} >{item.first_unread_message ? item.first_unread_message?.content : item.last_message?.content}</Text>
                    </View>
                </ListItem.Title>
            </ListItem.Content>
            <View style={{  }}>

               
            </View>
        </ListItem>     
    );



    return (
        
            <FlatList
                data={chatPartners}
                keyExtractor={(item) => item.vendor.id.toString()}
                renderItem={renderItem}
            />
    
    );
};

export default ChatListScreen;
