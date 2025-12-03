import React from 'react';
import { View, Button } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

function Test() {
    const translateX = useSharedValue(-100);
    const translateX2 = useSharedValue(-100);

    const animatedStyle1 = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    const animatedStyle2 = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX2.value }],
        };
    });

    const handlePress = () => {
        translateX.value = withSpring(translateX.value + 50);
        translateX2.value = withSpring(translateX2.value + 50);
    };

    const handleClose = () => {
        translateX.value = withSpring(translateX.value - 50);
        translateX2.value = withSpring(translateX2.value - 50);
    };

    

    return (
        <>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Animated.View style={[{ width: 100, height: 200, backgroundColor: 'white' }, animatedStyle1]} />
                <Animated.View style={[{ width: 100, height: 200, backgroundColor: 'red' }, animatedStyle2]} />
            </View>
            <Button onPress={handlePress} title="Click me" />
            <Button onPress={handleClose} title="Close me" />
        </>
    );
}

export default Test;
