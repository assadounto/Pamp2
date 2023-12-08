import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const GradientLoader = () => {
  const translateX = useRef(new Animated.Value(-0.5)).current; // Initial value adjusted

  useEffect(() => {
    const animation = Animated.timing(translateX, {
      toValue: 1.5, // Adjusted value
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
      isInteraction: false,
    });

    Animated.loop(animation).start();

    return () => {
      animation.stop();
    };
  }, [translateX]);

  return (
    <View style={styles.loadWrapper}>
      <Animated.View style={[styles.activity, { transform: [{ translateX }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadWrapper: {
    position: 'relative',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgb(211, 211, 211)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  activity: {
    position: 'absolute',
    left: 0,
    height: '100%',
    width: '45%',
    backgroundColor: 'transparent',
    zIndex: 45,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderStyle: 'solid',
    borderRightWidth: 0,
  },
});

export default GradientLoader;
