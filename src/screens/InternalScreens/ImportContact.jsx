import React, { useEffect, useState } from 'react';
import { ScrollView, Image, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { loader, removeSpace, returnLast10Digits, userId } from '../../utils/utils';
import { useSelector } from 'react-redux';

export const ImportContact = (props) => {
    const [search, setSearch] = useState('');
    const [filteredUsersData, setFilteredUsersData] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [contactsData, setContactsData] = useState([]);

    const contact = useSelector(e => e.contacts);
    const users = useSelector(e => e.usersData?.data);

    useEffect(() => {
        getAllData();
    }, []);

    async function getAllData() {
        try {
            loader.start();
            let id = await userId();
            let usersPhone = users.map(res => returnLast10Digits(res?.phone));
            let usersInApp = contact?.data?.filter(res => usersPhone?.includes(removeSpace(res.number)));
            let usersNotInApp = contact?.data?.filter(res => !usersPhone?.includes(removeSpace(res.number)));

            setUsersData(usersInApp);
            setContactsData(usersNotInApp);
            setFilteredUsersData(usersInApp);
            setFilteredContacts(usersNotInApp);
        } catch (err) {
            console.error(err);
        } finally {
            loader.stop();
        }
    }

    const searchContact = (text) => {
        setSearch(text);
        const lowerCaseText = text.toLowerCase();

        const filteredUsers = usersData.filter(contact => contact.name.toLowerCase().includes(lowerCaseText));
        const filteredContactsList = contactsData.filter(contact => contact.name.toLowerCase().includes(lowerCaseText));

        setFilteredUsersData(filteredUsers);
        setFilteredContacts(filteredContactsList);
    };

    const renderItem = (item) => (
        <TouchableOpacity key={item.number} onPress={() => props.navigation.navigate('chatscreen', { phone: removeSpace(item?.number) })}>
            <View style={styles.contactItem} >
                {item?.image ? (
                    <Image source={item.image} style={styles.avatar} />
                ) : (
                    <View style={styles.placeholderAvatar}>
                        <Text style={styles.placeholderText}>{item?.name?.split(' ')?.map(res => res.charAt(0)).join('')}</Text>
                    </View>
                )}
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{item?.name}</Text>
                    <Text style={styles.lastSeen}>{item?.number}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={20} color="#ADB5BD" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search name"
                    placeholderTextColor="#ADB5BD"
                    value={search}
                    onChangeText={searchContact}
                />
            </View>

            {contact?.permission ? (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.sectionHeader}>Contacts on FastChat</Text>
                    {filteredUsersData.map(item => renderItem(item))}
                    <Text style={styles.sectionHeader}>Invite Contacts</Text>
                    {filteredContacts.map(item => renderItem(item))}
                </ScrollView>
            ) : (
                <Text style={styles.permissionText}>Please allow permission for your contact to find people.</Text>
            )}
        </KeyboardAvoidingView>
    );
};

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
    sectionHeader: {
        color: 'lightgray',
        marginTop: 10,
    },
    permissionText: {
        marginTop: 30,
        textAlign: 'center',
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
});