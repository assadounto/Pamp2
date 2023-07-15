import React, { useState } from "react";
import { Text, View ,Pressable,TextInput} from "react-native";
import { Button} from "@rneui/base";
import { colors } from "../src/Common_styles";
import Dropdown from "./Dropdown";
import { useDispatch } from "react-redux";
import { paystyle } from "./card";
import { Padding } from "../GlobalStyles";
import { setPayment } from "../src/redux/user";
const Momo=({navigation,select})=>{
    const dispatch=useDispatch()
    const [phone_number,setnum]=useState('')
    const [open,setopen]=useState(false)
    const [option,setOption]=useState('Select provider')
  handleSubmitmomo=()=>{
        let item = {
           name: option,
           Number:phone_number,
        }
    
     dispatch(setPayment(item))
    }

    return(
        <>
         <Text style={[paystyle.text,{marginLeft:10}]}>Mobile Money Provider</Text>
         <Dropdown label={option} setOption={setOption} onselect={(val) =>{select(val)} }/>
        <Text style={[paystyle.text,{marginLeft:10,marginTop:40}]}>Mobile Money Phone Number</Text>
         <TextInput onChangeText={(val)=>setnum(val)} style={[paystyle.input,{height:50,width:'90%',alignSelf:'center',paddingHorizontal:20,padding:10}]} placeholder='02xxxxxxxx' />
         <Button
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
                onPress={handleSubmitmomo} />
      </>
    )
}

export default Momo