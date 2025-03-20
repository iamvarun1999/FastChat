import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getToken } from '../utils/auth';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      if (token) {
        navigation.replace('mainApp'); 
      } else {
        navigation.replace('start'); 
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return <View />;
};

export default Auth;
