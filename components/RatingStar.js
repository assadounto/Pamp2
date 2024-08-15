import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { ListItem,Icon } from '@rneui/base';
import { Text } from 'react-native';
import { FontFamily } from '../GlobalStyles';

import { useTheme, makeStyles } from '@rneui/themed';

import { View } from 'react-native-animatable';

const RatingStar = ({ rating }) => {
    const { theme } = useTheme();
    const styles = useStyles();



    return (
        <View
            style={{
                borderRadius: 25, display: 'flex', alignItems: 'center', gap: 5, justifyContent: 'center', padding: 10, flexDirection: 'row', backgroundColor: theme.colors.slate, shadowColor: '#707070',

                shadowRadius: 10,
                elevation: 2,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.2,
}}
        >
            <Icon
                name='star'
                type='ionicons'
                size={15}
                color={theme.colors.lg} />
            <Text style={{ fontFamily: FontFamily.sourceSansProBold, fontSize: 12, color: theme.colors.dg }}>
                {rating ? rating : '0.0'}
            </Text> 
           </View>
    );
}

const useStyles = makeStyles((theme) => ({
    title: {
        fontFamily: FontFamily.sourceSansProSemibold,
        color: theme.colors.dg,
    },
}));

export default RatingStar;

