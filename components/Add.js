import React, { useMemo, useState } from 'react';
import { Image, StyleSheet, Text, View, Pressable } from 'react-native';
import { FontSize, FontFamily, Color } from '../GlobalStyles';
import { colors } from '../src/Common_styles';
import { useNavigation } from '@react-navigation/core';
import { Icon } from '@rneui/base';

const Add = ({ addButtonText, arrow, down, onpress, setTreatmentVisible, setEditIndex, group1805Top }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        onpress()

    };

    return (
        <Pressable
            onPress={handlePress}
            style={[styles.groupParent, styles.frameChildPosition]}>

            <Image
                style={styles.frameItem}
                resizeMode="cover"
                source={require('../assets/group-1757.png')}
            />
            <Text style={styles.add}>{addButtonText}</Text>
            <View style={{ top: 30, right: 10, position: 'absolute' }}><Icon size={25} color={colors.lg.color} name={arrow ? 'chevron-down-outline' : 'chevron-forward-outline'} type='ionicon' /></View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    frameChildPosition: {
        width: '100%',
        alignSelf: 'center',
    },
    frameChild: {
        top: -1,
        height: 84,
    },
    frameItem: {
        top: 28,
        left: 15,
        width: 28,
        height: 28,
        position: 'absolute',
    },
    add: {
        top: 32,
        left: 60,
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.sourceSansProRegular,
        color: Color.darkseagreen_100,
        textAlign: 'left',
        position: 'absolute',
    },
    groupParent: {
        height: 83,

    },
});

export default Add;
