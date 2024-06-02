import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HourglassLoadingIcon = ({ color, size }) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spin = () => {
      spinValue.setValue(0);
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    };

    spin();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <Icon name="hourglass-empty" size={size} color={color} />
    </Animated.View>
  );
};

export default HourglassLoadingIcon;
