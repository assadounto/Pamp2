import React from "react";
import { verticalScale } from "../src/Dimensions";
import LottieView from 'lottie-react-native';
import { Image } from "react-native-animatable";
import { StyleSheet,View } from "react-native";

const Loading=({type})=>{
    return(
        <View style={styles.container}>
   
      <LottieView
              source={type ==='bell'? require('../assets/lottie/bell.json'):require('../assets/lottie/loading.json')}
              style={{ width:150, height: 100,marginTop:verticalScale(-20) }}
              autoPlay
              loop={true}
            />
          </View>
    )
}

export default Loading


const styles = StyleSheet.create({
    container: {
        marginTop:'70%',

      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: 300,
      height: 400,
    },
  });