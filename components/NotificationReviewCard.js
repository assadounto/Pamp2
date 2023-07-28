import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FontFamily, FontSize, Color } from "../GlobalStyles";

const NotificationReviewCard = () => {
  return (
    <View style={styles.ellipseParent}>
      <Image
        style={styles.frameChild}
        resizeMode="cover"
        source={require('../assets/ellipse-5.png')}
      />
      <Text style={styles.jessi}>Jessi</Text>
      <Text style={[styles.july2022, styles.july2022Typo]}>July 2022</Text>
      <Text
        style={[styles.likkleSalonIs, styles.july2022Typo]}
      >Likkle salon is amazing, they treated my what i asked for again.hhhhhsss</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  july2022Typo: {
    fontFamily: FontFamily.sourceSansProRegular,
    textAlign: "left",
    left: 53,
     flexWrap:'wrap',
    width:300,
    
  },
  frameChild: {
    top: 0,
    left: -3,
    width: 48,
    height: 48,
    position: "absolute",
  },
  jessi: {
    top: 1,
    fontSize: FontSize.size_lg,
    fontWeight: "600",
    fontFamily: FontFamily.sourceSansProSemibold,
    color: Color.darkslategray_300,
    textAlign: "left",
    left: 53,
    position: "absolute",
  },
  july2022: {
    top: 21,
    fontSize: FontSize.size_3xs,
    color: Color.lightgreen,
  },
  likkleSalonIs: {
    marginVertical:30,
    fontSize: FontSize.size_sm,
    letterSpacing: 0.8,
    color: Color.gray_200,
  },
  ellipseParent: {
     flex:1,
    width: '85%',
   
    height: 140,
    alignSelf: "center",
    marginTop: 20,
  },
});

export default NotificationReviewCard;
