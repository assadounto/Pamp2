import * as React from "react";
import { Image, StyleSheet,FlatList, Text, View, ActivityIndicator, Platform, SafeAreaView } from "react-native";
import SalonContainer from "../components/SalonContainer";
import AppointmentsContainer from "../components/AppointmentsContainer";
import MenuContainer from "../components/MenuContainer";
import { Margin, FontSize, FontFamily, Color, Padding } from "../GlobalStyles";
import EmptyAppoiment from "../components/Empty_appoitment";
import { useSelector } from "react-redux";
import axios from "axios";
import { backendURL } from "../src/services/http";
import { da } from "date-fns/locale";
import { useIsFocused } from "@react-navigation/core";
import { ScrollView } from "react-native-gesture-handler";
const Bookings = ({navigation}) => {
  const user = useSelector((state)=>state.user.userInfo)
  const isFocused = useIsFocused();
  const[loading,setLoading]= React.useState(false)
  const [bookings,setBookings]=React.useState([])
  React.useEffect(()=>{
    if (isFocused) {
  
  get()
    }
  },[isFocused])

  async   function get(){
    setLoading(true)
    const {data}= await axios.get(`${backendURL}/booking?id=${user.id}`)
    data && setBookings(data)
    console.log(data[0])
    setLoading(false)
  }
  return (

    <SafeAreaView>
      <Text style={{ marginLeft: 30, fontFamily: FontFamily.sourceSansProBold, fontSize: 26, color: '#86D694', marginTop: Platform.OS==='ios'?10:20,marginBottom:20 }}>Appointments</Text>

     {
      loading? <ActivityIndicator style={{alignSelf:'center',marginTop:'50%'}}  size={'small'}/>: bookings.length!== 0 ?
    
        <><FlatList 
        contentContainerStyle={{marginTop:10}}
          showsVerticalScrollIndicator={false}
          data={bookings}
          renderItem={({ item }) => (


            <AppointmentsContainer data={item} navigation={navigation} />

          )}
          keyExtractor={item => item.id} /></>

:
        <EmptyAppoiment />}

     
     
</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mt_90:{
   marginTop:130,
   marginLeft:10
  },
  mt_84: {
    marginTop: Margin.m_208xs,
  },
  mr47: {
    marginRight: Margin.m_86xl,
  },
  mt55_63: {
    marginTop: Margin.m_97xl,
  },
  mr211: {
    marginRight: 211,
  },
  mt28_630000000000003: {
    marginTop: Margin.m_34xl,
  },
  mr22: {
    marginRight: Margin.m_22xl,
  },
  mt_228_37: {
    marginTop: -228.37,
  },
  mr_20: {
    marginRight: Margin.m_112xs,
  },
  bellIcon: {
    width: 20,
    height: 22,
    opacity: 0,
  },
  appointments: {
    
    fontSize: FontSize.size_5xl,
    fontWeight: "600",
    fontFamily: FontFamily.sourceSansProSemibold,
    color: Color.lightgreen,
    textAlign: "left",
  },
  
});

export default Bookings;
