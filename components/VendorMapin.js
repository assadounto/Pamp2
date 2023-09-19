import * as React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import FastImage from "react-native-fast-image";
const VendorMapPin = ({data}) => {
  return (
    <View style={styles.component38}>
      <View style={styles.component38Child} />
      <FastImage
        style={[styles.component38Item, styles.iconLayout]}
  
            source={{
              uri: data.image,
              headers: { Authorization: 'someAuthToken' },
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover} />
      <Text style={[styles.likkleSalon, styles.likkleSalonPosition]}>
        {data.name} <Image
        //style={[styles.path3468Icon]}
        resizeMode="cover"
        source={require("../assets/path-34682.png")}
      />
      </Text>
      <Text
        style={[styles.airportResidentialRoad, styles.kmTypo]}
      >{data.location}</Text>
      <Image
        style={[styles.component38Inner, styles.iconLayout]}
        resizeMode="cover"
       source={require("../assets/ellipse-13.png")}
      />
      <Image
        style={[styles.starIcon, styles.iconLayout]}
        resizeMode="cover"
        source={require("../assets/star2.png")}
      />
      <Text style={[styles.text, styles.kmPosition]}>{data.sum_rating?.average_rating==0?'0.0': data.sum_rating.average_rating}</Text>
      <Text style={[styles.km, styles.kmPosition]}>{data.dist.toFixed(0)}m</Text>
     
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
    position: "absolute",
  },
  likkleSalonPosition: {
    textAlign: "left",
    color: Color.darkslategray_300,
    left: "44.03%",
    position: "absolute",
  },
  kmTypo: {
    fontFamily: FontFamily.sourceSansProRegular,
    fontSize: FontSize.size_smi,
  },
  kmPosition: {
    top: "71.11%",
    textAlign: "left",
    color: Color.darkslategray_300,
    position: "absolute",
  },
  component38Child: {
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: Border.br_xl,
    backgroundColor: Color.white,

    position: "absolute",
  },
  component38Item: {
    height: "81.48%",
    width: "34.59%",
    top: "9.63%",
    right: "60.38%",
    bottom: "8.89%",
    left: "5.03%",
    borderRadius: 10,
  },
  likkleSalon: {
    top: "17.04%",
    fontSize: FontSize.size_base,
    fontWeight: "600",
    fontFamily: FontFamily.sourceSansProSemibold,
  },
  airportResidentialRoad: {
    top: "37.04%",
    textAlign: "left",
    width:180,
    color: Color.darkslategray_300,
    left: "44.03%",
    position: "absolute",
  },
  component38Inner: {
    height: "2.99%",
    width: "1.27%",
    top: "75.24%",
    right: "35.54%",
    bottom: "21.77%",
    left: "63.19%",
  },
  starIcon: {
    height: "9.06%",
    width: "4.04%",
    top: "72.95%",
    right: "51.97%",
    bottom: "17.99%",
    left: "43.99%",
  },
  text: {
    left: "50.63%",
    fontSize: FontSize.size_sm,
    fontWeight: "700",
    fontFamily: FontFamily.sourceSansProBold,
  },
  km: {
    left: "67.92%",
    fontFamily: FontFamily.sourceSansProRegular,
    fontSize: FontSize.size_smi,
  },
  path3468Icon: {
    height: "7.51%",
    width: "2.72%",
   
  },
  component38: {
    top: '70%',
    left: 30,
    width: 318,
    right:30,
    height: 135,
    position: "absolute",
  },
});

export default VendorMapPin;
