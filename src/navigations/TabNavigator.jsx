import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Contacts } from '../screens/InternalScreens/Contacts';
import { MoreOptions } from '../screens/InternalScreens/MoreOptions';
import { Ionicons } from '@expo/vector-icons';
import { primaryColor } from '../constants';
import { Image, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import ChatScreen from '../screens/InternalScreens/Chats'
import listIcon from '../assets/images/listCheck.png'
import addChatIcon from '../assets/images/messageAdd.png'
import { useDispatch } from 'react-redux';
import { listenToSocketUpdates } from '../store/slices/usersSlice';

const Tab = createBottomTabNavigator();

export default function TabNavigator(props) {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(listenToSocketUpdates())
  },[])
    

    return (
        <>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'contacts') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'chats') {
                            iconName = focused ? 'person' : 'person-outline';
                        } else if (route.name === 'more') {
                            iconName = focused ? 'settings' : 'settings-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: primaryColor,
                    tabBarInactiveTintColor: '#ADB5BD',
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        paddingBottom: 15,
                        height: 60,
                    },
                    headerShown: true,
                    headerShadowVisible: false, // Removes the shadow
                    elevation: 0, // For Android
                    shadowOpacity: 0, // For iOS
                })}
            >
                <Tab.Screen name="contacts" options={{ title: 'Contacts', headerRight: () => <TouchableHighlight onPress={()=>props.navigation.navigate('importContact')} style={{ marginRight: 15 }}><Ionicons name='add' size={22} /></TouchableHighlight> }} component={Contacts} />
                <Tab.Screen name="chats" options={{
                    title: 'Chats', headerRight: () => <>
                        <Text style={{ marginRight: 15 }}>
                            <TouchableOpacity onPress={() => console.log('New Chat')}>
                                <Image source={addChatIcon} style={{ marginRight: 20 }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => console.log('Settings')}>
                                <Image source={listIcon} />
                            </TouchableOpacity>
                        </Text>
                    </>
                }} component={ChatScreen} />
                <Tab.Screen name="more" options={{ title: 'More' }} component={MoreOptions} />
            </Tab.Navigator>
        </>
    );
}
