import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { loader, userId } from '../../utils/utils';
import { getUserByPhone } from '../../service/AuthApis';
import { useDispatch } from 'react-redux';
import { updateUserData } from '../../store/slices/userDataSlice';
import { getAllMessages, markAsReed, sendMessage, sendNewMessage } from '../../service/MessageService';
import moment from 'moment';
import { io } from 'socket.io-client';
import { baseUrl } from '../../service/Routes';
import axios from 'axios';

// const messages = [
//     { id: '1', type: 'image', content: require('../../assets/images/cat.png'), timestamp: '16:46' },
//     { id: '2', type: 'text', sender: 'You', content: 'Can I come over?', timestamp: '16:46' },
//     { id: '3', type: 'text', sender: 'Other', content: "Of course, let me know if you're on your way", timestamp: '16:46' },
//     { id: '4', type: 'text', sender: 'You', content: "K, I'm on my way", timestamp: '16:50', status: 'Read' },
//     { id: '5', type: 'audio', duration: '0:20', timestamp: '09:13', status: 'Read' },
//     { id: '6', type: 'text', sender: 'Other', content: 'Good morning, did you sleep well?', timestamp: '09:45' }
// ];

export default function ChatScreen(props) {
    const dispatch = useDispatch()
    const [input, setInput] = useState('');
    const [senderId, setSenderId] = useState('')
    const [receiverId, setReceiverId] = useState('')
    const [messageData, setMessageData] = useState([])


    let socket = io.connect(baseUrl, {
        auth: { userId: senderId, username: '' }
    })


    useEffect(() => {
        getUserData();
    }, [props.route.params]);


    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessageData((prevMessages) => [data, ...prevMessages]);
        });
        socket.on('user_online', (data) => {
            // console.log(data)
        });

        return () => {
            socket.off('receive_message');
        };
    }, []);

    async function getUserData() {
        try {
            loader.start();
            let id = await userId();
            setSenderId(id)
            if (props.route.params?.phone) {
                let res = await getUserByPhone({ phone: `+91${props.route.params?.phone}` })
                dispatch(updateUserData(res.data.data))
                setReceiverId(res?.data?.data?._id)
            }

            if (props.route.params?.id) {
                let res = await getAllMessages(props.route.params?.id)
                let data = res?.data?.data
                await markAllMessageAsRead(id, data?._id, data?.messages)
                if (data?.user1?._id !== id) {
                    dispatch(updateUserData(data?.user1))
                    setReceiverId(data?.user1?._id)
                } else {
                    dispatch(updateUserData(data?.user2))
                    setReceiverId(data?.user2?._id)
                }
                setMessageData(data?.messages?.reverse())
                // console.log(data)
            }

        } catch (err) {
            console.error(err);
        } finally {
            loader.stop();
        }
    }


    // async function markAllMessageAsRead(id, chatId,data) {

    //     try {
    //         let mm = data?.filter(res => res?.sender !== id && res?.status == 'sent')
    //         let res = mm?.map(async (item) => await markAsReed(chatId, item?._id))
    //         let aa = await Promise.all(res)

    //     } catch (err) {
    //         console.log(err)
    //     }

    // }

    async function markAllMessageAsRead(id, chatId, data) {
        try {
            const unreadMessages = data?.filter(res => res?.sender !== id && res?.status === 'sent');

            if (unreadMessages.length > 0) {
                await Promise.allSettled(unreadMessages.map(item => markAsReed(chatId, item._id)));
            }
        } catch (err) {
            console.log(err);
        }
    }





    async function sendMessageHandle() {
        try {

            if (props.route.params?.phone) {
                let payload = {
                    message_between: [senderId, receiverId],
                    messages: [{
                        type: 'text',
                        message: input,
                        sender: senderId,
                        receiver: receiverId,
                        status: 'sent',
                        date_time: moment()?._d
                    }]
                }
                let res = await sendMessage(payload)
                socket.emit('send_message', payload.messages[0]);
                props.navigation.navigate('chatscreen', { id: res?.data?.data?._id })
            }
            if (props.route.params?.id) {
                let payload = {
                    type: 'text',
                    message: input,
                    sender: senderId,
                    receiver: receiverId,
                    status: 'sent',
                    date_time: moment()?._d
                }
                socket.emit('send_message', payload);
                await sendNewMessage(props.route.params?.id, payload)
            }
            setInput('')
        } catch (err) {
            console.log(err)
        }
    }

    const renderMessage = ({ item }) => {
        if (item.type === 'image') {
            return (
                <View style={styles.imageMessage}>
                    <Image source={item.content} style={styles.image} />
                    <Text style={styles.timestamp}>{item.timestamp}</Text>
                </View>
            );
        }
        if (item.type === 'audio') {
            return (
                <View style={[styles.messageBubble, styles.sentMessage]}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="play" size={20} color="#fff" />
                        <Text style={styles.audioText}>{item.duration}</Text>
                        <View style={styles.audioWave} />
                    </View>
                    <Text style={styles.timestampSent}>{item.timestamp} - {item.status}</Text>
                </View>
            );
        }
        return (
            <View style={[styles.messageBubble, item.sender === senderId ? styles.sentMessage : styles.receivedMessage]}>
                {/* {item.sender === senderId && <Text style={styles.sender}>You</Text>} */}
                <Text style={item.sender === senderId ? styles.messageText : styles.messageGet}>{item?.message}</Text>
                <Text style={item.sender === senderId ? styles.timestampSent : styles.timestamp}>{moment(item.date_time)?.format('hh:mm A')} {item.sender === senderId && `- ${item.status}`}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Messages List */}
            <FlatList
                data={messageData}
                keyExtractor={(item, index) => index}
                renderItem={renderMessage}
                contentContainerStyle={styles.messageList}
                inverted
            />

            {/* Message Input */}
            <View style={styles.inputContainer}>
                <TouchableOpacity>
                    <Ionicons name="add-outline" size={24} color="gray" />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    value={input}
                    onChangeText={setInput}
                />
                <TouchableOpacity>
                    <Ionicons name="send" size={24} color="blue" onPress={sendMessageHandle} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
    },
    headerTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    headerIcons: {
        flexDirection: 'row',
        gap: 15,
    },
    messageList: {
        padding: 15,
    },
    messageBubble: {
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        maxWidth: '75%',
    },
    sentMessage: {
        backgroundColor: '#007AFF',
        alignSelf: 'flex-end',
    },
    receivedMessage: {
        backgroundColor: '#ffffff',
        alignSelf: 'flex-start',
    },
    messageText: {
        color: '#fff',
    },
    messageGet: {
        color: '#000',
    },
    sender: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#007AFF',
        marginBottom: 2,
    },
    timestamp: {
        fontSize: 10,
        color: '#999',
        marginTop: 5,
    },
    timestampSent: {
        fontSize: 10,
        color: '#D0E0FF',
        marginTop: 5,
    },
    imageMessage: {
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    image: {
        width: 200,
        height: 150,
        borderRadius: 10,
    },
    audioText: {
        color: '#fff',
        marginLeft: 5,
    },
    audioWave: {
        width: 100,
        height: 5,
        backgroundColor: '#fff',
        marginHorizontal: 10,
        borderRadius: 2,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#EAEAEA',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        fontSize: 16,
    },
});

