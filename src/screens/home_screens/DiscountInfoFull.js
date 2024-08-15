import { makeStyles } from '@rneui/themed';
import { useTheme } from '@rneui/themed';
import * as React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../../GlobalStyles";
import { colors } from "../../Common_styles";
import Save from "../../../components/Save";
import { Button } from "@rneui/base";
import { ScrollView } from "react-native-gesture-handler";
import CouponIcon from '../../../components/icons/Coupon';

const DiscountFullInfo = ({ route }) => {
  const navigation = useNavigation();
  function formatRailsDate(railsDate) {
    const date = new Date(railsDate);
    const options = { month: 'numeric', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  }
  const { coupon } = route.params ? route.params : {}
  const { theme } = useTheme();
  console.log(coupon.areas)
  const styles = useStyles();
  return (
    <><View style={styles.discountFullInfo}>
      <Image source={require('../../../assets/discount.png')} style={styles.image} />
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={[styles.child, ]}>

        <View style={[styles.cont, { borderTopWidth: 0 }]}>
          <Text style={styles.title}>GHC{coupon.amount} discount for 1 appointment</Text>
          <Text style={styles.subtitle}>Applied to your next appointment.</Text>
        </View>

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
        <View style={[styles.cont, { paddingBottom: 100, }]}>
          <Text style={styles.cont_text}>Appointment areas</Text>
          <Text style={styles.sub}>{coupon.areas === null ? coupon.areas : 'Everywhere'}</Text>
        </View>

      </ScrollView>

    </View><Save name={'Ok'} handlePress={() => navigation.goBack()} /></>

  );
};

const useStyles = makeStyles((theme) => ({
  btn_text: {
    fontFamily: FontFamily.sourceSansProSemibold,
    fontSize: 15,
    color: theme.colors.dg
  },
  btn: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    width: 184,
    height: 52,
    backgroundColor: theme.colors.lgb
  },
  cont_text: {
    color: theme.colors.dg,
    fontFamily: FontFamily.sourceSansProSemibold,
    fontSize: 14

  },
  sub: {
    color: theme.colors.lg,
    fontFamily: FontFamily.sourceSansProSemibold,
    fontSize: 14

  },
  cont: {
    width: '80%',
    height: 90,
    alignSelf:'center',
    justifyContent: 'center',
    borderTopColor: theme.colors.tabColor,
    borderTopWidth: 1,
    
  },
  subtitle: {
    fontFamily: FontFamily.sourceSansProSemibold,
    color: theme.colors.lg,
    fontSize: 14,
    marginTop: 10,
    marginBottom: 20
  },
  title: {
    fontFamily: FontFamily.sourceSansProSemibold,
    color: theme.colors.dg,
    fontSize: 18,
    marginTop: 20
  },
  image: {
  
    marginTop: 100
  },
  child:{
    backgroundColor:theme.colors.slate,
    marginTop:20,
    width:'90%',
    height:'60%',
  
    borderRadius:20,
    paddingTop:20
  },

  discountFullInfo: {
   
    width: "100%",
    overflow: "hidden",
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
}));

export default DiscountFullInfo;