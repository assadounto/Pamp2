import React from "react";
import { StyleSheet, Platform } from "react-native";
import { Text, View } from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontFamily } from "../../GlobalStyles";
import { makeStyles } from '@rneui/themed';
import { colors } from "../../Common_styles";
import { useSelector } from "react-redux";
import { useTheme } from '@rneui/themed';

import { useGetWithdrawalMethodQuery } from "../src/redux/authapi";
import { useIsFocused } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import Add from "../../../components/Add";
import { useFocusEffect } from "@react-navigation/core";
import { setWMethod } from "../src/redux/vendor_actions";

import BHeader from "../../../components/BHeader";
const WInfo = ({ navigation, route }) => {
    const { theme } = useTheme();
    const styles = useStyles()
    const data = useSelector(state => state.user.userInfo)
    //const { data: datas, refetch, isLoading } = useGetWithdrawalMethodQuery(user.id)
    const dispatch = useDispatch()

    //datas &&  console.log(data,'ppp')
 

    const handlePress = () => {
        navigation.navigate('Wallet')
    }

    return (
        <><BHeader top={Platform.OS === 'ios' ? 50 : 20} title="Add account" color={theme.colors.othergreen} />
            

                <View style={styles.cont}>
                    <Text style={styles.text1}>Account</Text>
                    <View style={styles.enabled}>
                        <Text style={styles.enabled_text}>Enabled</Text>
                    </View>
                    <Text style={styles.text2}>Name</Text>
                    <Text style={styles.text3}>{data?.account_name}</Text>
                    <Text style={styles.text2}>Number</Text>
                    <Text style={styles.text3}>{data?.account_number}</Text>
                    <Text style={styles.text2}>{'Provider'}</Text>
                    <Text style={styles.text3}>{data?.bank_name}</Text>

                </View><View style={styles.cover}>
                    <Add addButtonText={'change'} onpress={handlePress} />
                </View></> 

        
    )
}

export default WInfo

const useStyles = makeStyles((theme) => ({
    cover: {
        borderBottomWidth: 0.5,
        width: "90%",
        marginTop: 50,
        alignSelf: "center",
        borderTopWidth: 0.5,
        borderTopColor: theme.colors.lg,
        borderBottomColor: theme.colors.lg,
    },
    enabled_text: {
        fontFamily: FontFamily.sourceSansProSemibold,
        fontSize: 8,

        color: colors.w.color,
    },
    enabled: {
        alignItems: 'center',
        justifyContent: 'center',

        position: 'absolute',
        right: 20,
        width: 50,
        height: 20,
        top: 20,
        borderRadius: 10,
        backgroundColor: theme.colors.lg,
    },
    text1: {
        fontFamily: FontFamily.sourceSansProSemibold,
        fontSize: 18,
        color: theme.colors.dg,
        marginLeft: 30,
        marginBottom: 20
    },
    text2: {
        fontFamily: FontFamily.sourceSansProSemibold,
        fontSize: 16,
        marginLeft: 30,
        color: theme.colors.dg,
    },
    text3: {
        fontFamily: FontFamily.sourceSansProSemibold,
        fontSize: 16,
        marginLeft: 30,
        marginBottom: 20,
        color: theme.colors.lg,
    },
    cont: {
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
        paddingVertical: 20,
        shadowColor: '#707070',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 2,
        shadowOffset: { width: 5, height: 0 },
        backgroundColor: theme.colors.card,
        borderRadius: 20,
        marginBottom: 20,
    }
}))