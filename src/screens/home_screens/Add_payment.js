import React, { useState } from "react";
import { SafeAreaView ,View,Text,Pressable,TextInput, StyleSheet,Image} from "react-native";
import { useDispatch } from "react-redux";
import BHeader from "../../../components/BHeader";
import { FontFamily } from "../../GlobalStyles";
import { colors } from "../../Common_styles";
import { Icon,Button ,CheckBox} from "@rneui/base";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "../../Common_styles";
import { setPayment } from "../../redux/user";
import visa from '../../../assets/visa.png'
import master from '../../../assets/group-1902.png'

const Add_payment=({navigation})=>{
    const dispatch= useDispatch()
    const [df,setdefault]=useState(false)
    const [name,setname]=useState('')
    const [cn,setcn]=useState('')
    const [ex,setex]=useState('')
    const [cvc,setcvc]=useState('')
   

    handleSubmit=()=>{
      
        
        dispatch(setPayment({
            name: name,
            expiry: ex,
           cvc,
           Number: cn,
           img: 'master'
        }))
    }
    return(
        <SafeAreaView>
            <ScrollView
            contentContainerStyle={{backgroundColor:'white'}}
            > 
                <BHeader title={'Add new card'}/>
                <Text style={{width:320,marginBottom:20,marginHorizontal:40, textAlign:'left',fontFamily:FontFamily.sourceSansProRegular,fontSize:15,color:'#00463C'}}>Securely save your card details to seamlessly make payments.</Text>
                <View style={{marginHorizontal:30}}>
                    <Text style={paystyle.text}>Name on card</Text>
                    <TextInput style={paystyle.input}  placeholder='Card holder full name' onChangeText={(value)=>setname(value)} />
                    <Text style={paystyle.text}>Card number</Text>
                    <TextInput style={paystyle.input}  placeholder='Credit or debit card number' onChangeText={(value)=>setcn(value)}/>
                    <View style={{display:'flex',flexDirection:'row',columnGap:20}}>
                        <View style={{flex:1}}>
                            <Text style={paystyle.text}>Expiry date</Text>
                            <TextInput style={paystyle.input} placeholder='mm / yy' onChangeText={(value)=>setex(value)}/>
                        </View>
                       
                        <View style={{flex:1}}>
                            <Text style={paystyle.text}>CVC</Text>
                            <TextInput  style={paystyle.input} placeholder='123'  onChangeText={(value)=>setcvc(value)}/>
                        </View>
                    </View>
                 <View style={{display:'flex',flexDirection:'row',marginHorizontal:10,marginTop:10}}> 
                    <Text style={{color:colors.dg.color}}>Pay secure with </Text> 
                    {/* <Image style={paystyle.img} source={visa}/> */}
                    <Image source={master}/>
                 </View>
                </View>
                 <View style={{marginHorizontal:20,marginTop:30}}>
                <CheckBox
                  checkedIcon={
                    <View style={styles.checkc}>
                      <Image
                        source={require('../../../assets/check3.png')}
                        style={styles.check}
                      />
                    </View>
                  }
                  title={
                    <Text style={{textAlign:'left',fontFamily:FontFamily.sourceSansProRegular,fontSize:15,color:'#00463C',marginLeft:10}}>
                       Save default
                      </Text>
                    
                  }
                  checked={df}
                  onPress={() => setdefault(!df)}
                />
                </View>
                <Button
          title={'Save'}
          // containerStyle={}
          buttonStyle={{
            width: 184,
            height: 54,
            //margin: 'auto',
           
            marginTop: 100,
            alignSelf: 'center',
            borderRadius: 20,
            backgroundColor: colors.dg2.color,
            shadowColor: colors.dg2.color, shadowOpacity: 0.5, shadowRadius: 5, shadowOffset: { width: 5, height: 0 }
          }}
          onPress={() => handleSubmit()} />
       </ScrollView>
        </SafeAreaView>
    )
}

const paystyle=StyleSheet.create({
    text: {marginVertical:10, paddingHorizontal: 20,
        fontFamily:FontFamily.sourceSansProRegular,fontSize:15,color:'#00463C'
    },input: {
        padding:20, height:60,borderRadius:20,borderColor: colors.lg.color,borderWidth:1,marginBottom:15
    },
    img:{
     height:14,
 
    }
})


export default Add_payment