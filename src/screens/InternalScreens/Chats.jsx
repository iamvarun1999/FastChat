import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { loader, userId } from '../../utils/utils';
import { getAllFriends } from '../../service/MessageService';
import moment from 'moment';

const stories = [
  { id: '0', name: 'Your Story', image: require('../../assets/images/plus.png') },
  { id: '1', name: 'Midala Huera', image: require('../../assets/images/user3.png') },
  { id: '2', name: 'Salsabila Akira', image: null }, // No image case
];

const chats = [
  { id: '1', name: 'Athalia Putri', message: 'Good morning, did you sleep well?', time: 'Today', image: require('../../assets/images/user1.png'), online: true, unread: 1 },
  { id: '2', name: 'Raki Devon', message: 'How is it going?', time: '17/6', image: null, online: true, unread: 0 },
  { id: '3', name: 'Erlan Sadewa', message: 'Aight, noted', time: '17/6', image: require('../../assets/images/user2.png'), online: false, unread: 1 },
  { id: '13', name: 'Athalia Putri', message: 'Good morning, did you sleep well?', time: 'Today', image: require('../../assets/images/user1.png'), online: true, unread: 1 },
  { id: '2g', name: 'Raki Devon', message: 'How is it going?', time: '17/6', image: null, online: true, unread: 0 },
  { id: '34', name: 'Erlan Sadewa', message: 'Aight, noted', time: '17/6', image: require('../../assets/images/user2.png'), online: false, unread: 1 },
  { id: '17', name: 'Athalia Putri', message: 'Good morning, did you sleep well?', time: 'Today', image: require('../../assets/images/user1.png'), online: true, unread: 1 },
  { id: '24', name: 'Raki Devon', message: 'How is it going?', time: '17/6', image: null, online: true, unread: 0 },
  { id: '38', name: 'Erlan Sadewa', message: 'Aight, noted', time: '17/6', image: require('../../assets/images/user2.png'), online: false, unread: 1 },
];

export default function ChatScreen(props) {
  const [allData, setAllData] = useState([])


  useEffect(() => {
    getAllData()
  }, [props.route]);


  async function getAllData() {
    try {
      loader.start()
      let id = await userId()
      let res = await getAllFriends(id)
      let data = res?.data?.data || []

      let formatedData = data?.map(res => {
        return {
          messages: res.messages?.map(res => ({ ...res, unread: res?.messages?.filter(item => item.status == 'sent')?.length })),
          _id: res?._id,
          userData: res?.user1?._id === id ? res?.user2 : res?.user1,
          unread: res?.messages?.filter(item => item.status == 'sent' && item.sender !== id)?.length
        }
      })
      setAllData(formatedData)

    } catch (err) {
      console.log(err)
    } finally {
      loader.stop()

    }
  }




  return (
    <View style={styles.container}>
      {/* Stories Section */}
      <View>
        <FlatList
          data={stories}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.storyItem}>
              <TouchableOpacity style={[styles.storyImageContainer, !item.image && styles.noImage]}>
                {item.image ? (
                  <Image source={item.image} style={styles.storyImage} />
                ) : (
                  <Text style={styles.storyInitials}>SA</Text>
                )}
              </TouchableOpacity>
              <Text style={styles.storyName}>{item.name}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={16} color="#ADB5BD" style={styles.searchIcon} />
        <TextInput placeholder="Search" style={styles.searchInput} placeholderTextColor="#ADB5BD" />
      </View>

      {/* Chat List */}
      <FlatList
        // style={{ flex: 4 }}
        data={allData}
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chatItem} onPress={() => props.navigation.navigate('chatscreen', { id: item?._id })}>
            <View style={styles.chatLeft}>
              {item?.image ? (
                <Image source={item.image} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, styles.noImage]}>
                  <Text style={styles.initials}>{item?.userData?.firstName?.charAt(0)}{item?.userData?.lastName?.charAt(0)}</Text>
                </View>
              )}
              {item?.online && <View style={styles.onlineIndicator} />}
            </View>
            <View style={styles.chatMiddle}>
              <Text style={styles.chatName}>{item?.userData?.firstName} {item?.userData?.lastName}</Text>
              <Text style={styles.chatMessage}>{item?.messages?.[item?.messages?.length - 1]?.message?.slice(0, 35)}</Text>
            </View>
            <View style={styles.chatRight}>
              <Text style={styles.chatTime}>{moment(item?.messages?.[item?.messages?.length - 1]?.date_time).format('DD/MM hh:mm a')}</Text>
              {item?.unread > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadText}>{item.unread}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  storyImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  storyInitials: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  storyName: {
    fontSize: 12,
    color: '#333',
    marginTop: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7FC',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  chatLeft: {
    position: 'relative',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImage: {
    backgroundColor: '#EDEDED',
  },
  initials: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  onlineIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00C851',
    position: 'absolute',
    bottom: 3,
    right: 3,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  chatMiddle: {
    flex: 1,
    marginLeft: 12,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  chatMessage: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  chatRight: {
    alignItems: 'flex-end',
  },
  chatTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadBadge: {
    backgroundColor: '#007AFF',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  unreadText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
