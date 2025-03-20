import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { loader, userId } from '../../utils/utils';

export const Contacts = () => {
    const [search, setSearch] = useState('');

    const contacts = [
        { id: '1', name: 'Athalia Putri', lastSeen: 'Yesterday', image: require('../../assets/images/user1.png'), online: false },
        { id: '2', name: 'Erlan Sadewa', lastSeen: 'Online', image: require('../../assets/images/user2.png'), online: true },
        { id: '3', name: 'Midala Huera', lastSeen: '3 hours ago', image: require('../../assets/images/user3.png'), online: false },
        { id: '4', name: 'Nafisa Gitari', lastSeen: 'Online', image: require('../../assets/images/user1.png'), online: true },
        { id: '5', name: 'Raki Devon', lastSeen: 'Online', image: null, online: true }, // No image case
        { id: '6', name: 'Salsabila Akira', lastSeen: '30 minutes ago', image: null, online: false }, // No image case
        { id: '7', name: 'Michael Smith', lastSeen: '2 hours ago', image: require('../../assets/images/user2.png'), online: false },
        { id: '8', name: 'Aisha Khan', lastSeen: 'Online', image: require('../../assets/images/user3.png'), online: true },
        { id: '9', name: 'Liam Johnson', lastSeen: '5 hours ago', image: require('../../assets/images/user1.png'), online: false },
        { id: '10', name: 'Sophia Williams', lastSeen: 'Online', image: require('../../assets/images/user2.png'), online: true },
        { id: '11', name: 'Noah Brown', lastSeen: '10 minutes ago', image: null, online: true },
        { id: '12', name: 'Emma Davis', lastSeen: 'Yesterday', image: require('../../assets/images/user3.png'), online: false },
        { id: '13', name: 'Olivia Martinez', lastSeen: '3 hours ago', image: require('../../assets/images/user1.png'), online: true },
        { id: '14', name: 'William Garcia', lastSeen: 'Online', image: null, online: false },
        { id: '15', name: 'James Wilson', lastSeen: 'Online', image: require('../../assets/images/user2.png'), online: true },
        { id: '16', name: 'Lucas Moore', lastSeen: '7 hours ago', image: require('../../assets/images/user3.png'), online: false },
        { id: '17', name: 'Charlotte Taylor', lastSeen: 'Online', image: require('../../assets/images/user1.png'), online: true },
        { id: '18', name: 'Benjamin Anderson', lastSeen: '15 minutes ago', image: null, online: true },
        { id: '19', name: 'Mia Thomas', lastSeen: '4 hours ago', image: require('../../assets/images/user2.png'), online: false },
        { id: '20', name: 'Ethan White', lastSeen: 'Online', image: require('../../assets/images/user3.png'), online: true },
    ];

    useEffect(() => {
        getAllData()
    }, []);


    async function getAllData() {
        try {
            loader.start()
            let id = await userId()
            // console.log(id)
        } catch (err) {
            console.log(err)
        } finally {
            loader.stop()

        }
    }


    const renderItem = ({ item }) => (
        <View style={styles.contactItem}>
            {item.image ? (
                <Image source={item.image} style={styles.avatar} />
            ) : (
                <View style={styles.placeholderAvatar}>
                    <Text style={styles.placeholderText}>{item.name.charAt(0)}</Text>
                </View>
            )}
            <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.lastSeen}>{item.lastSeen}</Text>
            </View>
            {item.online && <View style={styles.onlineDot} />}
        </View>
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
                    data={contacts.filter(contact => contact.name.toLowerCase().includes(search.toLowerCase()))}
                    keyExtractor={item => item.id}
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
