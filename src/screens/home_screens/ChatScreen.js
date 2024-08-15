import { makeStyles } from '@rneui/themed';
import { useTheme, ListItem } from '@rneui/themed';
import VerifiedIcon from '../../../components/icons/Verified';
import FastImage from 'react-native-fast-image';
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, FlatList, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Icon, Input } from '@rneui/base';
import WebSocketInstance from '../../services/cable';
import { backendURL } from '../../services/http';
import SendIcon from '../../../components/icons/Send';
import { formatToTime } from '../../Functions';
import { FontFamily } from '../../GlobalStyles';
import DoubleTick from '../../../components/icons/DoubleTick';
import SingleTick from '../../../components/icons/SingleTick';
import { colors } from '../../Common_styles';
import { useFocusEffect } from '@react-navigation/core';
const ChatScreen = ({ route }) => {
    const { userId, vendorId, userType, vendor } = route.params ? route.params:{};
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const { theme } = useTheme();
    const inputRef = useRef();
    const [isOnline, setIsOnline] = useState(false);
    const styles = useStyles();

    useEffect(() => {
        fetchMessages();
        const roomId = `${vendorId}-${userId}`;
        const onlineStatusInterval = setInterval(checkOnlineStatus, 10000); // Check online status every 30 seconds
        console.log('JET')
        WebSocketInstance.connect(roomId, userId);
        WebSocketInstance.onMessage((data) => {
            handleIncomingMessage(data.message);
        });

       

        return () => {
            WebSocketInstance.disconnect();
            clearInterval(onlineStatusInterval); 
        };
    }, []);


 

    const handleIncomingMessage = (newMessage) => {
        setMessages((prevMessages) => {
            const messageExists = prevMessages.some((msg) => msg.id === newMessage.id);

            if (messageExists) {
                // Merge the new message data with the existing one
                return prevMessages.map((msg) =>
                    msg.id === newMessage.id ? { ...msg, ...newMessage } : msg
                );
            }

            // If the message doesn't exist, add it to the state
            return [newMessage, ...prevMessages];
        });

        // Mark the message as read if it's not sent by the user and not already read
        if (!newMessage.read_at && newMessage.sent_by !== 'user') {
            // Update the state to mark the message as read
            setMessages((prevMessages) => {
                return prevMessages.map((msg) =>
                    msg.id === newMessage.id ? { ...msg, read_at: new Date().toISOString() } : msg
                );
            });

            // Call the external function to mark the message as read in the backend or external service
            markMessageAsRead(newMessage.id);
        }
    };


    const fetchMessages = async() => {
       await fetch(`${backendURL}/messages?user_id=${userId}&vendor_id=${vendorId}`)
            .then(response => response.json())
            .then(data => {
                setMessages(data);
                data.forEach(msg => {
                    if (!msg.read_at && msg.sent_by !== 'user') {
                        markMessageAsRead(msg.id);
                    }
                });
            })
            .catch(error => console.error('Error fetching messages:', error));
    };

    const sendMessage = () => {
        if (!message.trim()) return;

        WebSocketInstance.send({
            room: vendorId.toString(),
            user_id: userId,
            vendor_id: vendorId,
            message: message.trim(),
            sent_by: userType
        });

        setMessage('');
        if (inputRef.current) {
            inputRef.current.clear();
        }
    };



    const checkOnlineStatus = () => {
        fetch(`${backendURL}/vendors/${vendorId}/online_status`)
            .then(response => response.json())
            .then(data => setIsOnline(data.online))
            .catch(error => console.error('Error checking online status:', error));
    };

    const markMessageAsRead = (messageId) => {
        fetch(`${backendURL}/messages/${messageId}/read`, { method: 'PATCH' })
            .then(response => response.json())
            .catch(error => console.error('Error marking message as read:', error));
    };

    const renderMessageItem = ({ item }) => (
        <View style={[
            styles.messageBubble,
            item.sent_by === 'user' ? styles.userMessage : styles.vendorMessage
        ]}>
            <Text style={styles.messageText}>{item.content}</Text>
            <View style={styles.messageFooter}>
                <Text style={styles.messageTime}>{formatToTime(item.created_at)}</Text>
                <View style={styles.readStatusIcon}>
                    {item.sent_by === 'user' && item.read_at ? <DoubleTick color={colors.dg.color} /> : item.sent_by === 'user' && <SingleTick color={colors.dg.color} />}
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor:theme.colors.card }}>
            <ListItem
                containerStyle={styles.listItemContainer}
            >
                <FastImage
                    style={styles.vendorImage}
                    resizeMode='contain'
                    source={vendor?.image || vendor?.logo ? { uri: vendor.image || vendor.logo } : require('../../../assets/userimg.png')}
                />
                <ListItem.Content>
                    <ListItem.Title>
                        <View style={styles.vendorInfo}>
                            <View style={styles.vendorTitle}>
                                <Text style={styles.vendorName}>{vendor.username}</Text>
                                {vendor.verification_badge && <VerifiedIcon color={theme.colors.lg} />}
                            </View>
                            <Text style={styles.vendorStatus}>{isOnline ? 'Online' : 'Offline'}</Text>
                        </View>
                    </ListItem.Title>
                </ListItem.Content>
            </ListItem>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 20}
            >
                <FlatList
                    ListFooterComponent={

                        <View style={{ marginVertical: 20, paddingVertical: 30, borderRadius: 15, backgroundColor: theme.colors.caution2, width: '100%', alignSelf: 'center', display: 'flex', flexDirection: 'row' }}>
                            <Icon
                                style={{ marginLeft: 10, }}
                                name="alert-circle-outline"
                                type="ionicon"
                                color={theme.colors.dg}
                                size={25} />
                            <View style={{ width: '95%' }}>
                                <Text style={{ marginLeft: 10,maxWidth: '90%', fontFamily: FontFamily.sourceSansProRegular, fontSize: 15, color: theme.colors.dg}} ellipsizeMode='tail'>
                                    {"Avoid transacting outside the app, even if requested by the vendor. Pamp ensures secure transactions within the platform."}</Text>
                            </View>
                        </View>
                        
                       
                    }
                    data={messages}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderMessageItem}
                    inverted
                    contentContainerStyle={styles.chatContainer}
                />
                <View style={styles.inputContainer}>
                    <Input
                        inputStyle={{ color: theme.colors.dg }}
                        inputContainerStyle={styles.inputField}
                        rightIcon={
                            <TouchableOpacity onPress={sendMessage}>
                                <SendIcon size={24} color={theme.mode == 'dark' && message ? theme.colors.white : theme.mode == 'light' && message ? colors.lg.color: theme.colors.disabled4} />
                            </TouchableOpacity>
                        }
                        ref={inputRef}
                        value={message}
                        placeholderTextColor={theme.colors.placeholder}
                        onChangeText={setMessage}
                        placeholder="Type a message"
                        style={styles.textInput}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const useStyles = makeStyles((theme) => ({
    listItemContainer: {
        height: 70,
        marginLeft: 20,
        borderBottomColor: theme.colors.grey3,
        paddingLeft: 10,
        borderBottomWidth: 0.5,
        paddingRight: 40,
  
        backgroundColor: theme.colors.card,
        width: '100%',
        alignSelf: 'center',
    },
    vendorImage: {
        borderRadius: 50,
        width: 45,
        height: 45,
        borderWidth: 4,
        borderColor: theme.colors.ring,
    },
    vendorInfo: {
        alignContent: 'center',
    },
    vendorTitle: {
        flexDirection: 'row',
        gap: 5,
    },
    vendorName: {
        fontFamily: FontFamily.sourceSansProBold,
        color: theme.colors.dg,
        fontSize: 20,
    },
    vendorStatus: {
        fontFamily: FontFamily.sourceSansProRegular,
        color: theme.colors.dg,
        fontSize: 16,
    },
    chatContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'flex-end',
    },
    messageBubble: {
        padding: 10,
        borderRadius: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        maxWidth: '70%',
    },
    userMessage: {
        backgroundColor: theme.colors.lgb,
        borderBottomRightRadius: 0,
        alignSelf: 'flex-end',
    },
    vendorMessage: {
        borderBottomLeftRadius: 0,
        backgroundColor: theme.mode === 'dark' ? colors.w.color : theme.colors.slate,
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
        color: colors.dg.color,
        fontFamily: FontFamily.sourceSansProRegular,
    },
    messageFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 5,
    },
    messageTime: {
        textAlign: 'right',
        color:colors.dg.color,
        fontSize: 8,
    },
    readStatusIcon: {
        marginTop: 0,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: theme.colors.card,
    },
    inputField: {
        borderColor: theme.colors.disabled4,
        borderRadius: 25,
        paddingHorizontal: 10,
        borderWidth: 1,
    },
    textInput: {
        flex: 1,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
    },
    footerWarning: {
        marginVertical: 20,
        padding: 15,
        borderRadius: 10,
    
        
        paddingHorizontal:20,
        gap:10,
        backgroundColor: theme.colors.caution,
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    footerWarningIcon: {
        marginLeft: 10,
        marginTop: 10,
    },
    footerWarningText: {
        marginLeft: 10,
        marginRight:20,
        width:'70%',
        fontFamily: FontFamily.sourceSansProSemibold,
        fontSize: 14,
        color: theme.colors.dg,
    },
}));

export default ChatScreen;
