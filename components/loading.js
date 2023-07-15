import React from "react";
import { Image } from "react-native-animatable";
import { StyleSheet,View } from "react-native";

const Loading=()=>{
    return(
        <View style={styles.container}>
        <Image
          source={require('../assets/loading.gif')}
          />
          </View>
    )
}

export default Loading


const styles = StyleSheet.create({
    container: {
        top:'40%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: 300,
      height: 400,
    },
  });