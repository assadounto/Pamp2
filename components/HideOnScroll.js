import React, { useRef, useState, useEffect } from 'react';
import { Animated } from 'react-native';

const HideOnScroll = ({ children, scrollY }) => {
    const [show, setShow] = useState(true);
    const previousScrollY = useRef(0);
    const animatedHeight = useRef(new Animated.Value(63)).current;
    const animatedOpacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.timing(animatedHeight, {
            toValue: show ? 63 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();

        Animated.timing(animatedOpacity, {
            toValue: show ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [show, animatedHeight, animatedOpacity]);

    useEffect(() => {
        const listener = scrollY.addListener(({ value }) => {
            const direction = value > previousScrollY.current ? 'down' : 'up';
            previousScrollY.current = value;

            if (direction === 'down' && value > 50) {
                setShow(false);
            } else if (direction === 'up') {
                setShow(true);
            }
        });

        return () => {
            scrollY.removeListener(listener);
        };
    }, [scrollY]);

    return (
        <Animated.View style={{ height: animatedHeight, opacity: animatedOpacity }}>
            {children}
        </Animated.View>
    );
};

export default HideOnScroll;
