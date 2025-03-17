import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons, Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

export const MoreOptions = () => {

    const settingsOptions = [
        { id: '1', title: 'Account', icon: 'person-outline' },
        { id: '2', title: 'Chats', icon: 'chatbubble-outline' },
        { id: '3', title: 'Appearance', icon: 'sunny-outline' },
        { id: '4', title: 'Notification', icon: 'notifications-outline' },
        { id: '5', title: 'Privacy', icon: 'lock-closed-outline' },
        { id: '6', title: 'Data Usage', icon: 'folder-outline' },
        { id: '7', title: 'Help', icon: 'help-circle-outline' },
        { id: '8', title: 'Invite Your Friends', icon: 'mail-outline' },
    ];


  return (
    <>
     <View style={styles.container}>
            {/* Profile Section */}
            <TouchableOpacity style={styles.profileContainer} onPress={() => console.log('Go to Profile')}>
                <Image source={require('../../assets/images/user1.png')} style={styles.profileImage} />
                <View>
                    <Text style={styles.profileName}>Almayra Zamzamy</Text>
                    <Text style={styles.profileNumber}>+62 1309 - 1710 - 1920</Text>
                </View>
                <Feather name="chevron-right" size={20} color="#000" style={styles.rightArrow} />
            </TouchableOpacity>

            {/* Settings List */}
            <FlatList
                data={settingsOptions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.optionContainer} onPress={() => console.log(`${item.title} Clicked`)}>
                        <Ionicons name={item.icon} size={22} color="#000" style={styles.icon} />
                        <Text style={styles.optionText}>{item.title}</Text>
                        <Feather name="chevron-right" size={20} color="#000" style={styles.rightArrow} />
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={(item) => item?.leadingItem?.title === 'Data Usage'?<View style={styles.separator} />:''}
            />
        </View>
    </>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginBottom:10
        // borderBottomWidth: 1,
        // borderBottomColor: '#EAEAEA',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    profileNumber: {
        fontSize: 14,
        color: '#666',
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth:0
    },
    icon: {
        width: 30,
    },
    optionText: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
    rightArrow: {
        opacity: 0.6,
        marginLeft:'auto'
    },
    separator: {
        height: 1,
        backgroundColor: '#EAEAEA',
        marginHorizontal: 20,
    },
});