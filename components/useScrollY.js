import { useRef, useEffect, useState } from 'react';
import { Animated } from 'react-native';

export const useScrollY = () => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);

    useEffect(() => {
        const listener = scrollY.addListener(({ value }) => {
            setIsHeaderVisible(value <= 50);
        });

        return () => {
            scrollY.removeListener(listener);
        };
    }, [scrollY]);

    return { scrollY, isHeaderVisible };
};
