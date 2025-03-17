import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GetStarted from '../screens/StartScreens/GetStarted';
import { EnterPhone } from '../screens/StartScreens/EnterPhone';
import { EnterCode } from '../screens/StartScreens/EnterCode';
import { ProfileDetails } from '../screens/StartScreens/ProfileDetails';
import TabNavigator from './TabNavigator';
import ChatScreen from '../screens/InternalScreens/ChatScreen';
import { Text, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <>
      <Stack.Navigator initialRouteName="start">
        <Stack.Screen name="start" component={GetStarted} options={{ headerShown: false }} />
        <Stack.Screen name="enternumber" options={{ title: '' }} component={EnterPhone} />
        <Stack.Screen name="enterotp" options={{ title: '' }} component={EnterCode} />
        <Stack.Screen name="profiledetails" options={{ title: 'Your Profile' }} component={ProfileDetails} />
        <Stack.Screen name="mainApp" options={{ title: '', headerShown: false }} component={TabNavigator} />
        <Stack.Screen name="chatscreen" options={{
          title: 'Athialia Putri', headerShown: true, headerRight: () => <Text style={{ marginRight: 15 }}>
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
