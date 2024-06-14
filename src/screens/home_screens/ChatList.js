import { makeStyles } from '@rneui/themed';
import { useTheme } from '@rneui/themed';
// ChatListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { backendURL } from '../../services/http';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
const ChatListScreen = ({ navigation, route }) => {
    const [chatPartners, setChatPartners] = useState([]);
    const userId = useSelector((state) => state.user.userInfo.id)
    const userType = 'user' // Assume these are passed as params

    useEffect(() => {
        fetch(`${backendURL}/${userType}s/${userId}/chat_partners`)
            .then(response => response.json())
            .then(data => setChatPartners(data))
            .catch(error => console.error('Error fetching chat partners:', error));
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('Chat', { userId, vendorId: item.vendor.id, userType })}
        >
            <View style={{ padding: 10, borderBottomWidth: 1 }}>
                <Text>{item.vendor.name}</Text>
                {item.unread_count > 0 && (
                    <View>
                        <Text>{`Unread messages: ${item.unread_count}`}</Text>
                        <Text>{`First unread message: ${item.first_unread_message.content}`}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );

    const { theme } = useTheme();

    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <FlatList
                data={chatPartners}
                keyExtractor={(item) => item.vendor.id.toString()}
                renderItem={renderItem}
            />
        </SafeAreaView>
    );
};

export default ChatListScreen;
