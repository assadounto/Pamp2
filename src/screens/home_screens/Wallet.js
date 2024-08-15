import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Platform } from "react-native";
import { Text, View } from "react-native-animatable";
import { ScrollView } from "react-native-gesture-handler";
import Add from "../../../components/Add";
import Bank from "../../../components/Bank";
import BHeader from "../../../components/BHeader";
import Momo from "../../../components/momo";
import Save from "../../../components/Save";
import { colors } from "../../Common_styles";
import { FontFamily } from "../../GlobalStyles";
import { useTheme } from '@rneui/themed';

import Blur from "../start_screens/Blur";
import axios from "axios";
import { backendURL } from "../../services/http";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../../redux/user";
import Pop2 from "../start_screens/pop2";

const Wallet = ({ navigation }) => {
    const dispatch = useDispatch();
    const [modalVisible, setModal] = useState(false);
    const { theme } = useTheme();
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [showBank, setShowBank] = useState(false);
    const [showMomo, setShowMomo] = useState(false);
    const [arrow1, setArrow1] = useState(false)
    const [arrow2, setArrow2] = useState(false)
    const user = useSelector((state) => state.user.userInfo)
    const [other, setOther] = useState()
    const [name, setOption] = useState()
    const [number, setnum] = useState()
    const [bank_code, setcode] = useState()
    const [type, settype] = useState()
    const [name_on_account, setNameOnAccount] = useState()
    const [loading, setLoading] = useState(false)

    const handleSub = async () => {
        console.log(name, number, name_on_account, other, bank_code, type);
       
        if (!name || !number || !name_on_account) {
            Alert.alert('Fill all fields');
            return; // Stop the function execution if fields are missing
        }

        setLoading(true);

        try {
            const { data } = await axios.post(`${backendURL}/create_bank`, {
                bank_name: name,
                account_name: name_on_account,
                account_number: number,
                user_id: user.id,
                bank_code,
            });
             dispatch(setUser(data.data))
            setModal(true);
            setTimeout(() => {
                setModal(false);
                 navigation.replace('withdraw');
            }, 3000);
            // Uncomment and adjust the navigation line if needed
            // navigation.navigate('withdrawInfo');
        } catch (error) {
            console.error('Error creating bank account:', error);
            Alert.alert('Failed to create bank account', error.message || 'Please try again later.');
        } finally {
            setLoading(false);
        }
    };



    const handleAdd = (type) => {
        if (type === "bank") {
            setArrow1(!arrow1)
            setArrow2(false)
            setShowBank(!showBank);
            setShowMomo(false);
            setOption()
            setNameOnAccount()
            setnum()
        } else if (type === "momo") {
            setShowMomo(!showMomo);
            setArrow2(!arrow2)
            setShowBank(false);
            setArrow1(false)
            setOption()
            setNameOnAccount()
            setnum()
        }
        // setVisible(true);
    };

    return (
        <>

            <BHeader title="Add wallet" top={Platform.OS === 'ios' ? 50 : 20} color={theme.colors.othergreen} />
            <ScrollView>
                <View style={{ marginVertical: 30 }}>
                    <Text
                        style={{
                            marginHorizontal: 35,
                            marginBottom: 10,
                            color: theme.colors.dg,
                            fontFamily: FontFamily.sourceSansProSemibold,
                            fontSize: 18,
                        }}
                    >
                        Account
                    </Text>
                    <View style={[styles.cover,{borderColor: theme.colors.lg}]}>
                        <Add arrow={arrow1} addButtonText={"Add"} onpress={() => handleAdd("bank")} />
                        {showBank && <Bank settype={settype} setOther={setOther} setcode={setcode} option={name ? name : 'Select a bank'} setOption={setOption} setName={setNameOnAccount} setNumber={setnum} select={setVisible1} setBank={(val) => handleSub(val)} />}
                    </View>
                </View>

            </ScrollView>

            <Save loading={loading} name={"Save"} handlePress={handleSub} />
            <Pop2
                main={'You have Successfully updated your bank details'}
                modal={modalVisible}
            />
            {visible1 && <Blur />}
            {modalVisible && <Blur />}
            {visible && <Blur />}
        </>
    );
};

export default Wallet;

const styles = StyleSheet.create({
    cover: {
        borderBottomWidth: 0.5,
        width: "90%",
        marginBottom: 150,
        alignSelf: "center",
        borderTopWidth: 0.5,
        borderTopColor: colors.lg.color,
        borderBottomColor: colors.lg.color,
    },
});
