import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GetStarted from '../screens/StartScreens/GetStarted';
import { EnterPhone } from '../screens/StartScreens/EnterPhone';
import { EnterCode } from '../screens/StartScreens/EnterCode';
import { ProfileDetails } from '../screens/StartScreens/ProfileDetails';
import TabNavigator from './TabNavigator';
import ChatScreen from '../screens/InternalScreens/ChatScreen';
import { Text, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Loader } from '../components/Loader';
import Auth from '../components/Auth';
import { ImportContact } from '../screens/InternalScreens/ImportContact';
import { useDispatch, useSelector } from 'react-redux';
import { getAllContacts } from '../store/slices/contactSlice';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const dispatch = useDispatch()
  const contact = useSelector(e => e.contacts)
  const user = useSelector(e => e.userData?.data)

  useEffect(() => {
    dispatch(getAllContacts())
  }, [])


  return (
    <>
      <Loader />
      <Stack.Navigator initialRouteName="start">
        <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
        <Stack.Screen name="start" component={GetStarted} options={{ headerShown: false }} />
        <Stack.Screen name="enternumber" options={{ title: '' }} component={EnterPhone} />
        <Stack.Screen name="enterotp" options={{ title: '' }} component={EnterCode} />
        <Stack.Screen name="profiledetails" options={{ title: 'Your Profile' }} component={ProfileDetails} />
        <Stack.Screen name="mainApp" options={{ title: '', headerShown: false }} component={TabNavigator} />
        <Stack.Screen name="importContact" options={{ title: 'Select Contact', headerShown: true, headerRight: () => <Text style={{ marginRight: 15 }}>{contact?.data?.length} contacts</Text> }} component={ImportContact} />
        <Stack.Screen name="chatscreen" options={{
          title: `${user?.firstName} ${user?.lastName?user?.lastName:''}`, headerShown: true, headerRight: () => <Text style={{ marginRight: 15 }}>
            <TouchableOpacity onPress={() => console.log('New Chat')}>
              <Ionicons name="search-outline" size={22} color="black" style={{ marginEnd: 20 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Settings')}>
              <Feather name="menu" size={22} color="black" />
            </TouchableOpacity>
          </Text>
        }} component={ChatScreen} />
      </Stack.Navigator>
    </>
  );
}
