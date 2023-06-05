import React, { useState } from "react";
import { SafeAreaView ,ScrollView, View,Text,Pressable,TextInput, StyleSheet,Image} from "react-native";
import { useDispatch } from "react-redux";
import BHeader from "../../../components/BHeader";
import RadioButton from "../../../components/RadioButton";
import Momo from "../../../components/momo";
import Blur from "../start_screens/Blur";
import Card from "../../../components/card";
const Add_payment=({navigation})=>{
    const [blur,setblur]=useState(false)
    const [paymentoption,setpayment]= useState('Add Card')
    const data=[
      {
        value:'Add Card',

    },
    {
        value:'Add Mobile Money',
    },
    ]
    return(
    <><SafeAreaView>
            <BHeader title={'Add Payment method'} />
            <RadioButton data={data} onSelect={(val) => setpayment(val)} />
            <ScrollView
                contentContainerStyle={{ backgroundColor: 'white' }}
            >


                {paymentoption == 'Add Card' ?
                    <Card /> :
                    <Momo select={(val) => setblur(val)} />}

            </ScrollView>
        </SafeAreaView>{blur &&<Blur />}</>
    )
}




export default Add_payment