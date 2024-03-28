import React, { useState } from "react";
import { SafeAreaView ,View,Text,Pressable, Platform} from "react-native";
import BHeader from "../../../components/BHeader";
import { FontFamily } from "../../GlobalStyles";
import { colors } from "../../Common_styles";
import { Icon,Button ,ListItem, color} from "@rneui/base";
import { Image } from "react-native-animatable";
import { ScrollView } from "react-native-gesture-handler";
import source from '../../../assets/pay-with-cash.png'
import source2 from '../../../assets/group-1902.png'
import checker from '../../../assets/checker.png'
import add from '../../../assets/group-1756.png'
import { useSelector,useDispatch } from "react-redux";
import { setPayment } from "../../redux/user";
import { setDefault } from "../../redux/user";
const Select_payment=({navigation,route})=>{
  const { data } = route && route.params ? route.params : {};
console.log(data,'mkk')

    const dispatch=useDispatch()
    const default_method= useSelector((state)=>state.user.payment_methods.default)
    const payment_methods= convertToPaymentArray(data)
    const isdefault= (name)=>{

      if (!default_method){
return
      }
      return default_method.name=== name
    }
   const payment_method=
    {
      'Pay with cash': '',
       'Pay with momo':'smartphone',
       'Pay with card': 'credit-card',
    }


    function convertToPaymentArray(paymentMethods) {
      const convertedArray = [];
  
      if (paymentMethods.cash) {
          convertedArray.push({
              id: convertedArray.length + 1,
              name: 'Pay with cash',
              img: 'cash'
          });
      }
  
      if (paymentMethods.card) {
          convertedArray.push({
              id: convertedArray.length + 1,
              name: 'Pay with card',
              img: 'master'
          });
      }
  
      if (paymentMethods.momo) {
          convertedArray.push({
              id: convertedArray.length + 1,
              name: 'Pay with momo',
              img: 'momo'
          });
      }
  
      return convertedArray;
  }
  
  // Example usage:
  const paymentMethods = { id: 6, card: false, momo: false, cash: false };
  console.log(convertToPaymentArray(paymentMethods));
  

    return(

      <><BHeader top={Platform.OS==='ios'?60:20} title={'Payment methods'} color={colors.dg2.color} /><ScrollView
        contentContainerStyle={{ backgroundColor: 'white', marginTop: Platform.OS === 'ios' ? 40 : 0 }}
      >
        {payment_methods.map((pay, index) => <View style={{ marginHorizontal: 30, }}>
          <ListItem
            containerStyle={[{ paddingVertical: 30, borderBottomColor: index == payment_methods.length - 1 ? colors.lg.color : null, borderBottomWidth: index == payment_methods.length - 1 ? 1 : null, borderTopColor: colors.lg.color, borderTopWidth: 1 }]}
            onPress={() => {
              dispatch(setDefault(pay));
              navigation.goBack();
            } }>
            {payment_method[pay.name] == '' ?
              <Image
                source={source}
                style={{ width: 40, height: 30, borderRadius: 5, resizeMode: 'contain' }} /> :
              <Icon style={{ marginLeft: 5 }} name={payment_method[pay.name]} color={colors.dg2.color} type="feather" />}


            <ListItem.Content>
              <ListItem.Title style={colors.dgb}>
                {pay.name && pay.name}
              </ListItem.Title>
            </ListItem.Content>
            {isdefault(pay.name) ? <Image resizeMode="contain" style={{ width: 29, height: 29, }} source={checker} /> : <ListItem.Chevron color={'#00463C'} size={30} />}
          </ListItem>

        </View>
        )}
        {/* <View style={{marginHorizontal:30}}>
          <ListItem
    containerStyle={[{paddingVertical:30,borderTopColor:colors.lg.color,borderTopWidth:1}]}
    onPress={() => {
      navigation.navigate('Add_payment');
    
    }}>
      <View style={{borderColor:colors.lg.color, padding: 5, borderRadius:7, borderWidth:1}}>
      <Image
source={add}
style={{width:20,height:20}}
/>
      </View>
   
    <ListItem.Content>
      <ListItem.Title style={colors.lg}>
       Add new method
      </ListItem.Title>
    </ListItem.Content>
    <ListItem.Chevron color={'#00463C'} size={30} />
  </ListItem>

      </View> */}
      </ScrollView></>

    )
}

export default Select_payment