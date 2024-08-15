import { makeStyles } from '@rneui/themed';
import { useTheme } from '@rneui/themed';
import React from "react";
import { View, Linking } from "react-native";
import BHeader from "../../../components/BHeader";
import { StyleSheet } from "react-native";
import { ListItem, Icon } from "@rneui/base";
import { FontFamily } from "../../GlobalStyles";
import { colors } from "../../Common_styles";
import { SafeAreaView } from "react-native-safe-area-context";
import MailIcon from '../../../components/icons/Mail';
import HelpIcon from '../../../components/icons/Helpcenter';
import Money2Icon from '../../../components/Money2';
import MoneyIcon from '../../../components/icons/money';
import File2 from '../../../components/icons/file2';

const PayoutAndHistory = ({navigation}) => {
    const { theme } = useTheme();
    const styles = useStyles()
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background, }} >

            <BHeader title="Payouts & History" color={theme.colors.lg} />
            <View
                style={[
                    {
                        borderRadius: 15,
                        padding: 6,
                        backgroundColor: theme.colors.card,
                        width: '90%',
                        alignSelf: 'center',
                        marginTop: 30,
                    },
                ]}>
                <ListItem
                    containerStyle={[{ borderRadius: 15, marginBottom: 15, backgroundColor: theme.colors.slate }]}
                    onPress={() => {
                            navigation.navigate('withdraw')
                    }}>
                    <MoneyIcon color={theme.colors.lg} />
                    <ListItem.Content>
                        <ListItem.Title style={[styles.title]}>Payout</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron style={{ color: theme.colors.dg }} size={25} />
                </ListItem>
                <ListItem
                    containerStyle={[{ borderRadius: 15, backgroundColor: theme.colors.slate }]}
                    onPress={() => {
                        navigation.navigate('history')
                    }}>
                    <File2 color={theme.colors.lg} />
                    <ListItem.Content>
                        <ListItem.Title style={[styles.title]}>History</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron style={{ color: theme.colors.dg }} size={25} />
                </ListItem>
            </View>
        </SafeAreaView>
    )
}

export default PayoutAndHistory

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.colors.dg,
        fontFamily: FontFamily.sourceSansProBold
    }
}))