import React from 'react';
import { View, StyleSheet } from 'react-native';

const HorizontalLines = ({ numberOfLines, lineColor, lineWidth, containerWidth }) => {
    const lines = [];
    for (let i = 0; i < numberOfLines; i++) {
        lines.push(
            <View
                key={i}
                style={[
                    styles.line,
                    {
                        
                        backgroundColor: lineColor,
                        width: containerWidth,
                        top: `${(i * 105) / numberOfLines}%`,
                    },
                ]}
            />
        );
    }
    return <View style={styles.container}>{lines}</View>;
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10,
        bottom: 0,
        left: 30,
        right: 0,

    
    },
    line: {
 
        height: 0.5,
    },
});

export default HorizontalLines;
