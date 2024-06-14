// src/screens/ChatScreen.js

import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, SafeAreaView, Alert } from 'react-native';
import WebSocketInstance from '../../services/cable';
import { backendURL } from '../../services/http';
import Animated from 'react-native-reanimated';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const ChatScreen = ({ route }) => {
    const { userId, vendorId, userType } = route.params;
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const inputRef = useRef();
    const flatListRef = useRef();
    useEffect(() => {
        WebSocketInstance.connect(vendorId.toString());

        WebSocketInstance.onMessage((data) => {
            const newMessage = data.message;
            console.log('Received data:', data);

            // Check if the message already exists in state
            const messageExists = messages.some((msg) => msg.id === newMessage.id);
            if (!messageExists) {
                setMessages((prevMessages) => [newMessage,...prevMessages, ]);
            }

            if (!newMessage.read_at && newMessage.sent_by !== 'user') {
                markMessageAsRead(newMessage.id);
            }
        });

        fetchMessages();

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
            <Text style={styles.messageText}>{item.user?.username}: {item.content}</Text>
            {item.sent_by === 'user' && item.read_at ? <Text style={styles.readReceipt}>✔✔</Text> : item.sent_by==='user' &&  <Text style={styles.readReceipt}>✔</Text>}
        </View>
    );

    if (messages.length===0){
        return <Text>
            loading
        </Text>
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
             
                    <FlatList
                        data={messages}
                        keyExtractor={(item) => item?.id?.toString()}
                        renderItem={renderMessageItem}
                        contentContainerStyle={styles.chatContainer}
                        ref={flatListRef}
                        inverted         
                    />
                <View style={styles.inputContainer}>
                    <TextInput
                        ref={inputRef}
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Type a message"
                        style={styles.textInput}
                    />
                    <Button title="Send" onPress={sendMessage} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    chatContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    messageBubble: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        maxWidth: '70%',
    },
    userMessage: {
        backgroundColor: '#DCF8C6',
        alignSelf: 'flex-end',
    },
    vendorMessage: {
        backgroundColor: '#E8E8E8',
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
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
        borderTopWidth: 1,
        borderColor: '#E8E8E8',
        backgroundColor: '#FFF'
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
    },
});

export default ChatScreen;