import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { ListItem } from '@rneui/base';
import { FontFamily } from '../GlobalStyles';
import SurfIcon from './icons/surf';
import { useTheme, makeStyles } from '@rneui/themed';
import SunIcon from './icons/Sun';

const ListNav = ({ link ,onPress, value}) => {
    const { theme } = useTheme();
    const styles = useStyles();
    const navigation = useNavigation();

    const renderItem = (item) => {
        switch (item) {
            case 'points':
                return <SunIcon color={theme.colors.lg} />;
            case 'activity':
                return <SurfIcon color={theme.colors.lg} />;
            default:
                return null;
        }
    }

    return (
        <ListItem
        style={{flex:1}}
            containerStyle={{flex:1, borderRadius: 25, backgroundColor: theme.colors.slate }}
            onPress={() => {
                  onPress?onPress():
                navigation.navigate(link);
            }}
        >
            {renderItem(link)}
            <ListItem.Content>
                <ListItem.Title style={styles.title}>{value}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron color={theme.colors.dg} size={25} />
        </ListItem>
    );
}

const useStyles = makeStyles((theme) => ({
    title: {
        fontFamily: FontFamily.sourceSansProSemibold,
        color: theme.colors.dg,
    },
}));

export default ListNav;
