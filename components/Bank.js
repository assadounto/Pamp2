import React, { useEffect, useState } from "react";
import { Text, View, Pressable, TextInput, StyleSheet, Alert } from "react-native";
import { Button } from "@rneui/base";
import { colors } from "../src/Common_styles";
import Dropdown from "./Dropdown";
import { FontFamily } from "../GlobalStyles";
import { useDispatch } from "react-redux";
import { Padding } from "../GlobalStyles";
import { setPayment } from "../src/redux/user";
import axios from "axios";
import { useTheme } from '@rneui/themed';
import theme from "../src/redux/theme";

const secretKey = 'pk_live_cac01fe0c36e8e38e53f9dcae4a3a405fed0e7d1'; // Replace with your Paystack secret key

const Bank = ({ setOption, setName, settype, setNumber, setOther, option, setcode, select }) => {
    const dispatch = useDispatch()
    const [bank, setBank] = useState([])
    const [bank_name, setBankName] = useState('')
    const [bank_code, setBankCode] = useState('')
    const { theme } = useTheme();
    const momo = ['MTN', 'AirtelTigo', 'Vodafone']

    const [open, setopen] = useState(false)
    // const data=['calbank','access bank']

    async function getBankData() {
        const url = 'https://api.paystack.co/bank?country=ghana';
        const secretKey = 'pk_live_cac01fe0c36e8e38e53f9dcae4a3a405fed0e7d1'; // Replace with your Paystack secret key

        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${secretKey}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const { data } = response.data;
                setBank(data);
                console.log(data)
            } else {
                console.error('Failed to fetch bank data:', response.status);
                return null;
            }
        } catch (error) {
            console.error('Error fetching bank data:', error);
            return null;
        }
    }
    React.useEffect(() => {
        getBankData()
        setter()
    }, [option])


    const fetchBankDetails = async (num) => {
        setBankName('')
        const url = `https://api.paystack.co/bank/resolve?account_number=${num}&bank_code=${bank_code}`;
        const secretKey = 'sk_live_5477923d0cb43f62e0c5d88d1bc73ea765e995e5'; // Replace with your Paystack secret key

        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${secretKey}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const { data } = response.data;
                setBankName(data.account_name);
                setName(data.account_name)

                console.log(data)
            } else {
                setBankName('Bank account not found');
                return null;
            }
        } catch (error) {
            return null;
        }
    }

    const setter = () => {

        const code = bank.find(bank => bank.name == option)
        setBankCode(code?.['code'])
        setcode(code?.['code'])
        settype(code?.['type'])
    }

    return (
        <>
            <Text style={[paystyle.text, { marginLeft: 10,color:theme.colors.dg }]}>Bank / Mobile Money</Text>
            <Dropdown data={bank.map((bank) => bank.name)} label={option} setOption={setOption} onselect={(val) => select(val)} />
            <Text style={[paystyle.text, { marginLeft: 10, marginTop: 40, color: theme.colors.dg }]}>Account</Text>
            <TextInput  placeholderTextColor={theme.colors.placeholder} onChangeText={(val) => { fetchBankDetails(val); setNumber(val); setOther('Bank Account') }} style={[paystyle.input, {borderColor:theme.colors.tabColor, color: theme.colors.dg, height: 60, width: '90%', alignSelf: 'center', paddingHorizontal: 20, padding: 10, marginBottom: 40 }]} placeholder={momo.includes(option) ? '024xxxxxxx' : '110xxxxxxxxxxxxxxxxxx'} />
            <Text style={[paystyle.text, { marginLeft: 10, color: theme.colors.dg }]}>Name on Account</Text>
            <TextInput editable={false} value={bank_name && bank_name} placeholderTextColor={theme.colors.placeholder} onChangeText={setName} style={[paystyle.input, { height: 50, color: theme.colors.dg, width: '90%', alignSelf: 'center', height: 60, paddingHorizontal: 20, padding: 10,borderColor:theme.colors.tabColor, marginBottom: 40 }]} placeholder='Name will appear here automatically' />

        </>
    )
}

export default Bank

const paystyle = StyleSheet.create({
    text: {
        marginBottom: 5, paddingHorizontal: 20,
        fontFamily: FontFamily.sourceSansProSemibold, fontSize: 15, color: '#00463C'
    }, input: {
        padding: 20, height: 60, borderRadius: 20, borderColor: theme, borderWidth: 1, marginBottom: 15
    },
    img: {
        height: 14,

    }
})
