import * as React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../../GlobalStyles";
import { colors } from "../../Common_styles";
import Save from "../../../components/Save";
import { Button } from "@rneui/base";
import { ScrollView } from "react-native-gesture-handler";

const DiscountFullInfo = ({route}) => {
  const navigation = useNavigation();
  function formatRailsDate(railsDate) {
    const date = new Date(railsDate);
    const options = { month: 'numeric', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  }
const {coupon}=route.params?route.params:{}
  return (
    <ScrollView contentContainerStyle={styles.discountFullInfo}>
      <Image resizeMode="contain" source={require('../../../assets/sunset.png')} style={styles.image}/>
     <Text style={styles.title}>GHC{coupon.amount} discount for 1 appointment</Text>
     <Text style={styles.subtitle}>Applied to your next appointment.</Text>
     <View style={styles.cont}>
        <Text style={styles.cont_text}>Maximum discount</Text>
        <Text style={styles.sub}>GHC{coupon.amount}</Text>
     </View>

    

     <View style={styles.cont}>
        <Text style={styles.cont_text}>Expiry date</Text>
        <Text style={styles.sub}>{formatRailsDate(coupon.expiry)}</Text>
     </View>

     <View style={styles.cont}>
        <Text style={styles.cont_text}>Appointments left</Text>
        <Text style={styles.sub}>1/1</Text>
     </View>

     <View style={styles.cont}>
        <Text style={styles.cont_text}>Payment method</Text>
        <Text style={styles.sub}>Cash,Momo,Card</Text>
     </View>
     <View style={styles.cont}>
         <Text style={styles.cont_text}>Appointment areas</Text>
        <Text style={styles.sub}>{coupon.areas||'Everywhere'}</Text>
     </View>
    <Pressable onPress={()=>navigation.goBack()} style={styles.btn}>
      <Text style={styles.btn_text}>OK</Text>  
    </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    btn_text:{
        fontFamily: FontFamily.sourceSansProSemibold,
        fontSize: 15,
        color:colors.dg.color
    },
    btn:{
        marginTop:30,
        alignItems:'center',
        justifyContent:'center',
       borderRadius:25,
width: 184,
height: 52,
backgroundColor:'white'
    },
    cont_text:{
        color: "#A8B8A1",
        fontFamily: FontFamily.sourceSansProSemibold,
        fontSize: 14
        
    },
    sub:{
        color: colors.dg.color,
        fontFamily: FontFamily.sourceSansProSemibold,
        fontSize: 14
        
    },
    cont:{
      width:'80%' ,
      height: 70 ,
      justifyContent:'center',
      borderTopColor:"#E8F9E0",
      borderTopWidth:2
    },
    subtitle:{
        fontFamily: FontFamily.sourceSansProRegular,
        color:"#A8B8A1",
        fontSize:14,
        marginTop: 10,
        marginBottom:30
    },
 title:{
    fontFamily: FontFamily.sourceSansProSemibold,
    color:colors.dg.color,
    fontSize:21,
    marginTop: 30
 },
    image:{
        width:100,
        height:100,
        marginTop:100
    },

  discountFullInfo: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    alignItems:'center',
    backgroundColor:"#DAECD2" ,
  },
});

export default DiscountFullInfo;