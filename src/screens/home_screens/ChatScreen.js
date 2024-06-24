import { makeStyles } from '@rneui/themed';
import { useTheme,ListItem } from '@rneui/themed';
import VerifiedIcon from '../../../components/icons/Verified';
import FastImage from 'react-native-fast-image';
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, SafeAreaView, Alert } from 'react-native';
import { Icon, Input, color } from '@rneui/base';
import WebSocketInstance from '../../services/cable';
import { backendURL } from '../../services/http';
import SendIcon from '../../../components/icons/Send';
import { formatToTime } from '../../Functions';
import { FontFamily } from '../../GlobalStyles';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import DoubleTick from '../../../components/icons/DoubleTick';
import SingleTick from '../../../components/icons/SingleTick';
import { colors } from '../../Common_styles';
const ChatScreen = ({ route }) => {
    const { userId, vendorId, userType,vendor } = route.params;
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const { theme } = useTheme();
    const inputRef = useRef()
    const [isOnline, setIsOnline] = useState(false);
    const styles = useStyles();
    useEffect(() => {
        WebSocketInstance.connect(vendorId.toString(), userId);
        WebSocketInstance.onMessage((data) => {
            const newMessage = data.message;
            console.log('Received data:', data);

            // Check if the message already exists in state
            const messageExists = messages.some((msg) => msg.id === newMessage.id);
            if (!messageExists) {
                setMessages((prevMessages) => [newMessage, ...prevMessages,]);
            }

            if (!newMessage.read_at && newMessage.sent_by !== 'user') {
                markMessageAsRead(newMessage.id);
            }
        });
        
        fetchMessages();
         checkOnlineStatus()
        return () => {
            WebSocketInstance.disconnect();
        };
    }, []);

    const fetchMessages = () => {
        fetch(`${backendURL}/messages?user_id=${userId}&vendor_id=${vendorId}`)
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
        if (!message.trim()) {
            return; // Don't send empty messages
        }

        WebSocketInstance.send({
            room: vendorId.toString(),
            user_id: userId,
            vendor_id: vendorId,
            message: message.trim(),
            sent_by: userType
        });
        setMessage('');
        if (inputRef.current) {
            inputRef.current.clear(); // Clear input field after sending message
        }
    };

    const checkOnlineStatus = () => {
        fetch(`${backendURL}/vendors/${vendorId}/online_status`)
            .then((response) => response.json())
            .then((data) => setIsOnline(data.online))
            .catch((error) => console.error('Error checking online status:', error));
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
            <View style={{display:'flex', gap:5,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                <Text style={{ textAlign: 'right', fontSize: 8 }}>{formatToTime(item.created_at)}</Text>
                <View style={{marginTop:-10}}>
                    {item.sent_by === 'user' && item.read_at ? <DoubleTick color={theme.colors.dg} /> : item.sent_by === 'user' && <SingleTick color={theme.colors.dg}/>}

                </View>

            </View>
        </View>
    );

  
   
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ListItem
               // onPress={() => navigation.navigate('Chat', { userId, vendorId: item.vendor.id, userType })}
                containerStyle={[{
                    height: 70,
                    marginLeft:20,
                    borderBottomColor: theme.colors.grey3,
                    paddingLeft: 10,
                    borderBottomWidth:0.5,
                    paddingRight: 40,
                    backgroundColor: theme.colors.background,
                    width: '100%',

                    alignSelf: 'center',
                }]}
            >
                {/* <Icon
                name='chevron-back'
                    type="ionicon" 
                    size={30}
                /> */}
                

                <FastImage
                    style={{ borderRadius: 40, width: 40, height: 50 }}
                    source={vendor.image ? { uri: vendor.image } : require('../../../assets/userimg.png')}
                />
                <ListItem.Content>
                    <ListItem.Title style={{}}>
                        <View style={{ alignContent: 'center' }}>
                            
                                <View style={{display:'flex',flexDirection:'row'}}>
                                    <Text style={{ fontFamily: FontFamily.sourceSansProBold, color: theme.colors.dg, fontSize: 20 }}>{vendor.username} </Text>
                                    {vendor.verification_badge &&<VerifiedIcon color={theme.colors.lg} />}
                                </View>
                        
                            <Text style={{ fontFamily: FontFamily.sourceSansProRegular, color: theme.colors.lg, fontSize: 16 }} >{ isOnline? 'Online': 'Offline' }</Text>
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
                    ListFooterComponent={<View style={{ marginVertical: 20, padding: 10, borderRadius: 10, backgroundColor: theme.colors.caution, width: '100%', alignSelf: 'center', display: 'flex', flexDirection: 'row' }}>
                        <Icon
                            style={{ marginLeft: 10, marginTop: 10 }}
                            name="alert-circle-outline"
                            type="ionicon"
                            color={theme.colors.dg}
                            size={25} />
                        <Text style={{  marginLeft: 10, fontFamily: FontFamily.sourceSansProRegular, fontSize: 15, color: theme.colors.dg }}>{'Avoid tarnsacting outside the app, even if \n requested by the vendor.Pamp ensures \nsecure transactions within the platform'}</Text>
                    </View>}
                    data={messages}
                    keyExtractor={(item) => item?.id?.toString()}
                    renderItem={renderMessageItem}
                    inverted
                    contentContainerStyle={styles.chatContainer}
         
               
                />
                <View style={styles.inputContainer}>
                    <Input
                      inputStyle={{color:theme.colors.dg}}
                    inputContainerStyle={{borderColor:theme.colors.grey3,borderRadius:25,paddingHorizontal:10, borderWidth:1}}
                        rightIcon={
                    <TouchableOpacity onPress={sendMessage}>
                                <SendIcon on size={24}
                                    color={theme.colors.tabColor} />
                    </TouchableOpacity>
                        }
                        ref={inputRef}
                        value={message}
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
    chatContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'flex-end',
    },
    messageBubble: {
        padding: 10,
        borderRadius: 20,
        paddingHorizontal:20,
        marginVertical: 5,
        maxWidth: '70%',
    },
    userMessage: {
        backgroundColor: theme.colors.lgb,
        alignSelf: 'flex-end',
    },
    vendorMessage: {
        backgroundColor: theme.mode==='dark'? colors.w.color: theme.colors.slate,
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
        marginBottom:5,
        fontFamily:FontFamily.sourceSansProRegular
    },
    readReceipt: {
        fontSize: 12,
        color: 'gray',
        alignSelf: 'flex-end',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
      
        backgroundColor: theme.colors.background
    },
    textInput: {
        flex: 1,
       
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
    },
}));

export default ChatScreen;