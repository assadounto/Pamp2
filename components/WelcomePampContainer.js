import * as React from "react";
import { useMemo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FontFamily, FontSize, Color, Margin } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};

const WelcomePampContainer = ({
  theBestPlaceToReachServicMarginTop,
  theBestPlaceToReachServicMarginLeft,
}) => {
  const groupView3Style = useMemo(() => {
    return {
      ...getStyleValue("marginTop", theBestPlaceToReachServicMarginTop),
      ...getStyleValue("marginLeft", theBestPlaceToReachServicMarginLeft),
    };
  }, [theBestPlaceToReachServicMarginTop, theBestPlaceToReachServicMarginLeft]);

  return (
    <View
      style={[styles.mailParent, styles.mt46, styles.ml44, groupView3Style]}
    >
      <Image
        style={styles.mailIcon}
        resizeMode="cover"
        source={require("../assets/mail.png")}
      />
      <Image
        style={styles.groupChild}
        resizeMode="cover"
        source={require("../assets/ellipse-62.png")}
      />
      <Text style={styles.welcomeToPamp}>Welcome to Pamp</Text>
      <Text style={[styles.text, styles.textTypo]}>26 / 8 / 2021</Text>
      <Text style={[styles.theBestPlaceContainer, styles.textTypo]}>
        <Text
          style={styles.theBestPlace}
        >{`The best place to reach service providers that'll `}</Text>
        <Text style={styles.theBestPlace}>
          pamper you exactly how you want.
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textTypo: {
    fontFamily: FontFamily.sourceSansProSemibold,
    fontWeight: "600",
    fontSize: FontSize.size_3xs,
    textAlign: "left",
    left: 33,
    position: "absolute",
  },
  mailIcon: {
    top: 11,
    left: 0,
    width: 23,
    height: 18,
    position: "absolute",
  },
  groupChild: {
    top: 7,
    width: 9,
    height: 9,
    left: 33,
    position: "absolute",
  },
  welcomeToPamp: {
    marginLeft: -101,
    top: 0,
    left: "50%",
    fontSize: FontSize.size_base,
    fontWeight: "700",
    fontFamily: FontFamily.sourceSansProBold,
    textAlign: "left",
    color: Color.darkslategray_200,
    position: "absolute",
  },
  text: {
    bottom: 0,
    color: Color.darkslategray_200,
    fontFamily: FontFamily.sourceSansProSemibold,
    fontWeight: "600",
    fontSize: FontSize.size_3xs,
  },
  theBestPlace: {
    margin: Margin.m_50xs,
  },
  theBestPlaceContainer: {
    marginTop: -18,
    top: "50%",
    color: Color.darkgray,
  },
  mailParent: {
    width: 298,
    height: 86,
  },
});

export default WelcomePampContainer;
