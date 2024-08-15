import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { ListItem, Icon } from '@rneui/base';
import { Text } from 'react-native';
import { FontFamily } from '../GlobalStyles';

import { useTheme, makeStyles } from '@rneui/themed';

import { View } from 'react-native-animatable';

const TrendsCard = ({ data,icon ,name ,increase,show=true}) => {
    const { theme } = useTheme();
    const styles = useStyles();



    return (
        <View style={{ borderRadius: 25, flex: 1, backgroundColor: theme.colors.card,padding: 20, }}>
            <View
            style={{ display: 'flex', alignItems: 'center', gap: 5,  flexDirection: 'row'}}>
           {
            icon
}
            <Text style={{ fontFamily: FontFamily.sourceSansProSemibold, fontSize: 12, color: theme.colors.dg }}>
                    {name}
            </Text>
        </View>
            <Text style={{ fontFamily: FontFamily.sourceSansProBold, fontSize: 32,marginTop:20,marginBottom:10, color: theme.colors.dg }}>
              {data}
            </Text>
           {show&& <View style={{ display: 'flex', alignItems: 'center', gap: 5, flexDirection: 'row' }}>
                <Icon size={15} color={increase > 0 ? theme.colors.lg : '#CD3D49'} name={increase > 0  ? 'caret-up-outline': 'caret-down-outline'} type='ionicon' />
                <Text style={{ fontFamily: FontFamily.sourceSansProBold, fontSize: 14, color: increase > 0  ? theme.colors.lg : '#CD3D49' }}>
                    {increase}%
                </Text>
            </View>}
           
        </View>
    );
}

const useStyles = makeStyles((theme) => ({
    title: {
        fontFamily: FontFamily.sourceSansProSemibold,
        color: theme.colors.dg,
    },
}));

export default TrendsCard;

