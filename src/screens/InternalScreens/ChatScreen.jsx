import { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { Audio } from 'expo-av';
import { userId } from '../../utils/utils';

export default function ChatScreen(props) {
    const dispatch = useDispatch()
    const [input, setInput] = useState('');
    const [senderId, setSenderId] = useState('')
    const [receiverId, setReceiverId] = useState('')
    const [messageData, setMessageData] = useState([])


    useEffect(() => {
        getUserData();
    }, []);

    const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require('../../assets/Audios/popUpMessage.mp3')
        );
        await sound.playAsync();
    };

    useEffect(() => {
       
    }, []);

    async function getUserData() {
        try {
            // loader.start();
            let userID = props.route.params?.id
            let id = await userId();
            console.log(id)
            console.log(userID)
            setSenderId(id)


        } catch (err) {
            console.error(err);
        } finally {
            // loader.stop();
        }
    }





    async function sendMessageHandle() {
        try {

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

