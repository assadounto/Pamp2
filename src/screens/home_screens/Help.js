import React from "react";
import { View,Linking } from "react-native";
import BHeader from "../../../components/BHeader";
import { StyleSheet } from "react-native";
import { ListItem,Icon } from "@rneui/base";
import { FontFamily } from "../../GlobalStyles";
import { colors } from "../../Common_styles";
import { SafeAreaView } from "react-native-safe-area-context";

const Help =()=>{

    return(
        <SafeAreaView  style={{flex:1,backgroundColor:'white'}} >

      <BHeader title="Help & Support" color={colors.dg2.color}/>
        <View
        style={[
          {
            borderRadius: 15,
            padding: 6,
            backgroundColor: '#F9F9F9',
            width:'90%',
            alignSelf:'center',
            marginTop: 30,
          },
        ]}>
        <ListItem
          containerStyle={[{borderRadius: 15, backgroundColor: '#F9F9F9'}]}
          onPress={() => {
            console.log('Sending email...');
            Linking.openURL('mailto:support@trypamp.com'); }}>
          <Icon name="mail-outline" type="ionicon" color={colors.lg.color} />
          <ListItem.Content>
            <ListItem.Title style={[colors.dgb,styles2.title]}>Send us a message </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron style={colors.dgb} size={25} />
        </ListItem>
      </View>
      </SafeAreaView>
    )
}

export default Help

const styles2= StyleSheet.create({
    title:{
      fontFamily: FontFamily.sourceSansProBold
    }
  })