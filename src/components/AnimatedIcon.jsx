import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { primaryColor } from '../constants';

const AnimatedIcon = () => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 2000, // full cycle time
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['-10deg', '10deg', '-10deg'],
  });

  const scale = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.15, 1],
  });

  return (
    <Animated.View style={{ transform: [{ scale }, { rotate }] }}>
      <Feather name="info" size={64} color={primaryColor} />
    </Animated.View>
  );
};

export default AnimatedIcon;
