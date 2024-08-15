import React from 'react';
import { TouchableOpacity, TextInput,Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import { Icon } from '@rneui/base';
import { FontFamily } from '../GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { makeStyles } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../src/redux/filter';
import Filter from './icons/Filter';
const SearchBar = ({ theme ,modal,setmodal}) => {
    const filter = useSelector(state => state.filter);
    const navigation = useNavigation();
    const styles = useStyles();
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate("Search")}
                activeOpacity={1}
                style={styles.touchable}>    
                <Icon
                    style={styles.icon}
                    name='search'
                    type="feather"
                    size={25}
                    color='#BCC4CC'
                />
                <Text style={styles.text}>Search for a service or vendor</Text>
                 
                <TouchableOpacity style={styles.activityIndicator} onPress={() =>setmodal(!modal)}>
                    <Filter size={25} color='#BCC4CC' />
                </TouchableOpacity>
                 </TouchableOpacity>
        </View>
    );
};

export const useStyles = makeStyles((theme) => ({    container: {
        alignItems: 'center',
        marginBottom: 40,
    },
    text:{
        fontFamily: FontFamily.sourceSansProRegular,
        marginTop: 22,
        color: theme.colors.placeholder,
    },
    touchable: {
        backgroundColor: theme.colors.slate,
        borderRadius: 23,
        borderWidth: 1,
        borderColor: theme.colors.slate,
        height: 63,
        width: '90%',
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
    },
    icon: {
        margin: 15,
        marginTop: 18,
    },
    input: {
        flex: 1,
    },
    activityIndicator: {
        position: 'absolute',
        right: 20,
        alignSelf: 'center',
    },
}));

export default SearchBar;
