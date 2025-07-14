import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { userId } from '../../utils/utils';
import { listenToWhere } from '../../Firebase/CloudFirestore/RealtimeData';

export const Contacts = (props) => {
    const [search, setSearch] = useState('');
    const [allData, setAllData] = useState([])


    useEffect(() => {
        getAllUsers()
    }, []);


    async function getAllUsers() {
        try {
            let id = await userId();
            listenToWhere('users', 'userId', '!=', id, (data) => {
                setAllData(data)
            })

        } catch (err) {
            console.log(err)
        }
    }





    const renderItem = ({ item }) => (
        <TouchableOpacity key={item?.id} style={styles.contactItem} onPress={() => props.navigation.navigate('chatscreen', { id: item?.id })}>
            {item?.profile ? (
                <Image src={item?.profile} style={styles.avatar} />
            ) : (
                <View style={styles.placeholderAvatar}>
                    <Text style={styles.placeholderText}>{item?.userData?.name?.charAt(0)}</Text>
                </View>
            )}
            <View style={styles.textContainer}>
                <Text style={styles.name}>{item?.name}</Text>
                {/* last seen not integrated  */}
                <Text style={styles.lastSeen}>{item?.lastSeen ? 'yes' : 'no'}</Text>
            </View>
            {item?.online && <View style={styles.onlineDot} />}
        </TouchableOpacity>
    );



    return (
        <>
            <View style={styles.container}>
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search-outline" size={20} color="#ADB5BD" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        placeholderTextColor="#ADB5BD"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>

                {/* Contact List */}
                <FlatList
                    data={allData}
                    // data={allData.filter(contact => contact?.firstName?.toLowerCase().includes(search?.toLowerCase()))}
                    keyExtractor={item => item?.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F7FC',
        paddingHorizontal: 10,
        borderRadius: 10,
        height: 40,
        marginBottom: 15,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#0F1828',
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: '#E0E0E0',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    placeholderAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#0057FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    placeholderText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0F1828',
    },
    lastSeen: {
        fontSize: 14,
        color: '#ADB5BD',
    },
    onlineDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#00C851',
        position: 'absolute',
        right: 10,
    },
});
