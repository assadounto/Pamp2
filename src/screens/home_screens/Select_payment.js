import { makeStyles } from '@rneui/themed';
import { useTheme } from '@rneui/themed';
import React, { useState } from "react";
import { SafeAreaView, View, Text, Pressable, Platform } from "react-native";
import BHeader from "../../../components/BHeader";
import { FontFamily } from "../../GlobalStyles";
import { colors } from "../../Common_styles";
import { useFocusEffect } from '@react-navigation/native';

import { Icon, Button, ListItem, color } from "@rneui/base";
import axios from "axios";
import { backendURL } from "../../services/http";
import { Image } from "react-native-animatable";
import { ScrollView } from "react-native-gesture-handler";
import source from '../../../assets/pay-with-cash.png'
import source2 from '../../../assets/group-1902.png'
import checker from '../../../assets/checker.png'
import add from '../../../assets/group-1756.png'
import { useSelector, useDispatch } from "react-redux";
import { setPayment } from "../../redux/user";
import { setDefault } from "../../redux/user";
import Loading from "../../../components/loading";
import Money2Icon from '../../../components/Money2';
import CardIcon from '../../../components/icons/Card';
const Select_payment = ({ navigation, route }) => {
  const { data } = route.params ? route.params : {}
  const booking = useSelector((state) => state.booking)
  const [loading, setLoading] = useState(false)
  // useFocusEffect(

  //   React.useCallback(() => {
  //     get()

  //   }, []) // 
  // );
  //  async function get(){
  //   setLoading(true)
  //   const{ data }=await axios.get(`${backendURL}/details?id=${booking?.vendor_id}`)
  //   setLoading(false)
  //   setData(data.payment_method)

  //    console.log(data.payment_method,'PaymentMethod')
  //   }
  const { theme } = useTheme();

  const dispatch = useDispatch()
  const default_method = useSelector((state) => state.user.payment_methods.default)
  const default_methods = useSelector((state) => state.user.payment_methods.methods)

  const payment_methods = convertToPaymentArray(data)
  const isdefault = (name) => {

    if (!default_method) {
      return
    }
    return default_method.name === name
  }
  const payment_method =
  {
    'Pay with cash': <Money2Icon/>,
    'Pay with momo': <Icon name='smartphone' color={colors.dg2.color} type="feather" />,
    'Pay with card': <CardIcon color={theme.colors.lg}/>,
  }


  function convertToPaymentArray(paymentMethods) {
    const convertedArray = [];

    if (paymentMethods?.cash) {
      convertedArray.push({
        id: convertedArray.length + 1,
        name: 'Pay with cash',
        img: 'cash'
      });
    }

    if (paymentMethods?.card) {
      convertedArray.push({
        id: convertedArray.length + 1,
        name: 'Pay with card',
        img: 'master'
      });
    }

    if (paymentMethods?.momo) {
      convertedArray.push({
        id: convertedArray.length + 1,
        name: 'Pay with momo',
        img: 'momo'
      });
    }

    return convertedArray;
  }

  if (!data) {
    return <>
      <BHeader top={Platform.OS === 'ios' ? 60 : 20} title={'Payment methods'} color={theme.colors.lg} />
      <Text style={{ textAlign: 'center', marginBottom: 30, color: theme.colors.dg, fontFamily: FontFamily.sourceSansProSemibold }}>{"Enjoy convenience and flexibility when booking\n your appointment with the payment options below"}</Text>
      {
        default_methods.map((pay, index) => <View style={{ marginHorizontal: 30, }}>
          <ListItem
            containerStyle={[{ backgroundColor: theme.colors.background, paddingVertical: 30, borderBottomColor: theme.colors.tabColor, borderBottomWidth: 1, borderTopColor: theme.colors.lg, borderTopWidth: 0 }]}
          >
            {payment_method[pay.name]}


            <ListItem.Content>
              <ListItem.Title style={{ color: theme.colors.dg }}>
                {pay.name && pay.name}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>

        </View>
        )}
    </>
  }

  return (

    <><BHeader top={Platform.OS === 'ios' ? 60 : 20} title={'Payment methods'} color={theme.colors.lg} />
      <ScrollView
        style={{ backgroundColor: theme.colors.background, }}
        contentContainerStyle={{ backgroundColor: theme.colors.background, marginTop: Platform.OS === 'ios' ? 40 : 0 }}
      >
        {
          convertToPaymentArray(data).map((pay, index) => <View style={{ marginHorizontal: 30, }}>
            <ListItem
              style={{ backgroundColor: theme.colors.background, }}
              containerStyle={[{ backgroundColor: theme.colors.background, paddingVertical: 30, borderBottomColor: index == payment_methods.length - 1 ? theme.colors.tabColor : null, borderBottomWidth: index == payment_methods.length - 1 ? 1 : null, borderTopColor: theme.colors.tabColor, borderTopWidth: 1 }]}
              onPress={() => {
                dispatch(setDefault(pay));
                navigation.goBack();
              }}>
              {payment_method[pay.name]}


              <ListItem.Content>
                <ListItem.Title style={{ color: theme.colors.dg }}>
                  {pay.name && pay.name}
                </ListItem.Title>
              </ListItem.Content>
              {isdefault(pay.name) ? <Image resizeMode="contain" style={{ width: 29, height: 29, }} source={checker} /> : <ListItem.Chevron color={theme.colors.dg} size={30} />}
            </ListItem>

          </View>
          )}
        {/* <View style={{marginHorizontal:30}}>
          <ListItem
    containerStyle={[{paddingVertical:30,borderTopColor:theme.colors.lg,borderTopWidth:1}]}
    onPress={() => {
      navigation.navigate('Add_payment');
    
    }}>
      <View style={{borderColor:theme.colors.lg, padding: 5, borderRadius:7, borderWidth:1}}>
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
    <ListItem.Chevron color={theme.colors.dg} size={30} />
  </ListItem>

      </View> */}
      </ScrollView></>

  )
}

export default Select_payment