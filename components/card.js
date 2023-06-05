import React, { useState } from "react";
import { StyleSheet,Text,View,TextInput,Image,Pressable } from "react-native";
import { FontFamily } from "../src/GlobalStyles";
import { styles } from "../src/Common_styles";
import { setPayment } from "../src/redux/user"
import { colors } from "../src/Common_styles";
import { Icon,Button ,CheckBox} from "@rneui/base";
import { useDispatch } from "react-redux";

import { CardNumberTextInput,CardDateTextInput } from "./src/index";
import master from '../assets/group-1902.png'
const Card =()=>{
    const dispatch= useDispatch()
    const [df,setdefault]=useState(false)
    const [name,setname]=useState('')
    const [cn,setcn]=useState('')
    const [ex,setex]=useState('')
    const [cvc,setcvc]=useState('')
    const [cardValue, setCardValue] = useState('');
    const [focusCardNum, setFocusCardNum] = useState(false);

    const [cardDateValue, setCardDateValue] = useState('');
    const [focusCardDateNum, setFocusCardDateNum] = useState(false);
    const updateText = (cardNum) => {
        setCardValue(cardNum)
    }
   const updateCardDate = (cardNum) => {
        setCardDateValue(cardNum)
    }
    

    handleSubmit=()=>{
      console.log(cardDateValue)
        
        dispatch(setPayment({
            name: name,
            expiry: ex,
           cvc,
           Number: cn,
           img: 'master'
        }))
    }
    return(
       
               
                <><Text style={{ width: 320, marginBottom: 20, marginHorizontal: 20, textAlign: 'left', fontFamily: FontFamily.sourceSansProRegular, fontSize: 15, color: '#00463C' }}>Securely save your card details to seamlessly make payments.</Text><View style={{ marginHorizontal: 30 }}>
            <Text style={paystyle.text}>Name on card</Text>

            <TextInput style={paystyle.input} placeholder='Card holder full name' onChangeText={(value) => setname(value)} />
            <CardNumberTextInput
                autoFocus={true}
                focus={focusCardNum}
                onFocus={() => setFocusCardNum(true)}
                onBlur={(e) => {
                    setFocusCardNum(false);
                } }
                labelStyle={{
                    color: "#00463C",
                    marginLeft: 20
                }}
                label="Card number"
                errorColor={"#00463C"}
                defaultBorderColor={"#ddd"}
                inputWrapStyle={{
                    height: 60, borderRadius: 20, borderColor: colors.lg.color, borderWidth: 1, marginBottom: 15, paddingHorizontal: 10
                }}
                inputStyle={{
                    //fontFamily: 'GT-medium',
                    color: '#00463C'
                }}
                defaultValue={cardValue}
                focusColor={"blue"}
                placeholder={"Credit card"}
                updateTextVal={(text) => {
                    updateText(text);
                } } />
            <View style={{ display: 'flex', flexDirection: 'row', columnGap: 20 }}>
                <CardDateTextInput
                    errorColor={"#00463C"}
                    labelColor={"#ddd"}
                    focusColor={"#1c32a0"}
                    defaultBorderColor={"#ddd"}
                    placeholder={"MM/YY"}
                    label={"Expiry date"}
                    focus={focusCardDateNum}
                    updateCardDateText={(t) => {
                        updateCardDate(t);
                    } }
                    onFocus={() => setFocusCardDateNum(true)}
                    labelStyle={{
                        color: '#00463C',
                        fontWeight: '400'
                    }}
                    inputWrapStyle={{
                        height: 60, borderRadius: 20, borderColor: colors.lg.color, borderWidth: 1, marginBottom: 15
                    }}
                    placeholderTextColor={"#ccc"}
                    value={cardDateValue}
                    defaultValue={cardDateValue}
                    inputStyle={{
                        color: '#00463C',
                        fontWeight: 'bold',
                    }} />


                <View style={{ flex: 1 }}>
                    <Text style={[paystyle.text, {}]}>CVC</Text>
                    <TextInput style={paystyle.input} placeholder='123' onChangeText={(value) => setcvc(value)} />
                </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }}>
                <Text style={{ color: colors.dg.color }}>Pay secure with </Text>
                {/* <Image style={paystyle.img} source={visa}/> */}
                <Image source={master} />
            </View>
        </View><View style={{ marginHorizontal: 20, }}>
                <CheckBox
                    checkedIcon={<View style={styles.checkc}>
                        <Image
                            source={require('../assets/check3.png')}
                            style={styles.check} />
                    </View>}
                    title={<Text style={{ textAlign: 'left', fontFamily: FontFamily.sourceSansProRegular, fontSize: 15, color: '#00463C', marginLeft: 10 }}>
                        Save default
                    </Text>}
                    checked={df}
                    onPress={() => setdefault(!df)} />
            </View><Button
                title={'Save'}
                // containerStyle={}
                buttonStyle={{
                    width: 184,
                    height: 54,
                    //margin: 'auto',
                    marginTop: 80,
                    alignSelf: 'center',
                    borderRadius: 20,
                    backgroundColor: colors.dg2.color,
                    shadowColor: colors.dg2.color, shadowOpacity: 0.5, shadowRadius: 5, shadowOffset: { width: 5, height: 0 }
                }}
                onPress={() => handleSubmit()} /></>
   
    )
}


export const paystyle=StyleSheet.create({
    text: {marginBottom:5, paddingHorizontal: 20,
        fontFamily:FontFamily.sourceSansProSemibold,fontSize:15,color:'#00463C'
    },input: {
        padding:20, height:60,borderRadius:20,borderColor: colors.lg.color,borderWidth:1,marginBottom:15
    },
    img:{
     height:14,
 
    }
})

export default Card