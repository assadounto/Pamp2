import React, { useEffect, useState } from "react";
import { Text, } from "react-native-animatable";
import { Alert, TextInput, View, Platform } from "react-native";
import BHeader from "../../../components/BHeader";
import { useTheme } from '@rneui/themed';

import { Icon, Button, ListItem } from "@rneui/base";
import { Image } from "react-native-animatable";
import source from '../../../assets/pay-with-cash.png'
import { colors } from "../../Common_styles";
import { useGetWithdrawalMethodQuery } from "../../redux/authapi";
import { styles } from "../../Common_styles";
import { useSelector } from "react-redux";
import Save from "../../../components/Save";
import { FontFamily } from "../../GlobalStyles";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { backendURL } from "../../services/http";
import { useFocusEffect } from "@react-navigation/core";
import { useDispatch } from "react-redux";
import { th } from "date-fns/locale";
import BankIcon from "../../../components/icons/Bank";
import { SafeAreaView } from "react-native-safe-area-context";

//import { setWMethod } from "../../redux/vendor_actions";
const Withdraw = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { theme } = useTheme();
    const location = useSelector(state => state.user.location)
    const [error, setErrror] = useState('')
    const user = useSelector((state) => state.user.userInfo)
    // const { data, refetch } = useGetWithdrawalMethodQuery(user.id)
    const payment_method = useSelector((state) => state.user.userInfo)

    const [amount, setAmount] = useState()


    //data && dispatch(setWMethod(data.method))
    const [loading, setLoading] = useState(false)
    useFocusEffect(
        React.useCallback(() => {
            // refetch()
        }, [])
    );
    const payment_methods =
    {
        'Mobile Money Account': 'smartphone',
        'Bank Account': 'smartphone',
    }


    useEffect(() => {
        if (amount >= user?.balance) {
            setErrror("Balance insufficient")
        } else {
            setErrror("")
        }
    }, [amount])

    const handlePress = async () => {
        if (amount >= user?.balance) {

            Alert.alert('Balance insufficient')
            return
        }
        setLoading(true)
        const { data } = await axios.post(backendURL + `/user/withdraw/${user.id}`, { amount })
        if (data === 'created') {
            setLoading(false)
            navigation.navigate('Success', { tit: `You have successfully requested ${location.currency || "₵"}${amount} to your account.` })
        }

        else {
            setLoading(false)
            Alert.alert('Something went wrong.Try again later')
        }
        setLoading(false)
    }
    return (

        <><SafeAreaView>


            <BHeader title="Payout" top={Platform.OS === 'ios' ? 0 : 20} color={theme.colors.othergreen} />
            <ScrollView>

                <Text style={{ fontFamily: FontFamily.sourceSansProSemibold, fontSize: 18, color: theme.colors.dg, marginLeft: 40, marginBottom: 20 }}>Account</Text>
                <ListItem
                    containerStyle={[{ display: 'flex', flexDirection: 'row', height: 63, width: '90%', alignSelf: 'center', paddingTop: 20, paddingHorizontal: 20, shadowColor: '#707070', shadowOpacity: 0.2, shadowRadius: 10, elevation: 4, shadowOffset: { width: 5, height: 0 }, backgroundColor: theme.colors.card, borderRadius: 20 }]}
                    onPress={() => {
                        !payment_method?.account_number ? navigation.navigate('Wallet') : navigation.navigate('WithdrawalInfo');
                    }}>

                    {!payment_method?.account_number ?
                        '' :
                        <BankIcon style={{ marginLeft: 10 }} color={theme.colors.lg} type="feather" />
                    }
                    <ListItem.Content>
                        <ListItem.Title style={{ fontSize: 14, fontFamily: FontFamily.sourceSansProBold, color: theme.colors.dg }}>
                            {
                                payment_method?.account_number
                                    ? `${payment_method?.bank_name}-${payment_method?.account_number?.length > 15 ? payment_method?.account_number.slice(-4) + '....' : payment_method?.account_number}`
                                    : 'Select Withdrawal Method'
                            }
                        </ListItem.Title>

                    </ListItem.Content>
                    <ListItem.Chevron color={theme.colors.dg} size={30} />
                </ListItem>
                <View style={{ width: '100%', alignSelf: 'center', marginTop: 40 }}>
                    <Text style={[styles.P1, { color: theme.colors.dg, marginLeft: 30, marginBottom: 10 }]}>Amount</Text>
                    <TextInput
                        placeholderTextColor={theme.colors.placeholder}
                        style={[styles.EI, { height: 50, borderColor: theme.colors.tabColor, color: theme.colors.dg, borderRadius: 18 }]}
                        inputMode="numeric"
                        placeholder="GHC 0.00"
                        //value={name}
                        onChangeText={setAmount}
                    />

                    <Text style={[{ color: "#cd3d49", marginLeft: 30, marginBottom: 10 }]}>{error}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
            <Save loading={loading} disabled={amount >= user?.balance || !amount} name={'Confirm'} handlePress={handlePress} />
        </>
    )
}

export default Withdraw