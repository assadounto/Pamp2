import * as React from "react";
import { useMemo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FontFamily, FontSize, Color, Margin } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};

const DiscountContainer = ({ propMarginTop, propMarginLeft }) => {
  const groupView4Style = useMemo(() => {
    return {
      ...getStyleValue("marginTop", propMarginTop),
      ...getStyleValue("marginLeft", propMarginLeft),
    };
  }, [propMarginTop, propMarginLeft]);

  return (
    <View
      style={[styles.giftParent, styles.mt79, styles.ml44, groupView4Style]}
    >
      <Image
        style={[styles.giftIcon, styles.giftIconPosition]}
        resizeMode="cover"
        source={require("../assets/gift.png")}
      />
      <View style={styles.ellipseParent}>
        <Image
          style={[styles.groupChild, styles.giftIconPosition]}
          resizeMode="cover"
          source={require("../assets/ellipse-63.png")}
        />
        <Text style={styles.firstTimeDiscount}>First time Discount</Text>
        <Text style={[styles.text, styles.textTypo]}>26 / 8 / 2021</Text>
        <Text style={[styles.get40DiscountContainer, styles.textTypo]}>
          <Text
            style={styles.get40Discount}
          >{`Get 40% discount on your first booking on pamp, `}</Text>
          <Text style={styles.get40Discount}>add the code firstimeD.</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  giftIconPosition: {
    left: 0,
    position: "absolute",
  },
  textTypo: {
    fontFamily: FontFamily.sourceSansProSemibold,
    fontWeight: "600",
    fontSize: FontSize.size_3xs,
    textAlign: "left",
    left: 0,
    position: "absolute",
  },
  giftIcon: {
    marginTop: -30,
    width: 22,
    height: 22,
    top: "50%",
  },
  groupChild: {
    top: 7,
    width: 9,
    height: 9,
  },
  firstTimeDiscount: {
    left: 15,
    fontSize: FontSize.size_base,
    fontWeight: "700",
    fontFamily: FontFamily.sourceSansProBold,
    textAlign: "left",
    color: Color.darkslategray_200,
    top: 0,
    position: "absolute",
  },
  text: {
    color: Color.darkslategray_200,
    fontFamily: FontFamily.sourceSansProSemibold,
    fontWeight: "600",
    fontSize: FontSize.size_3xs,
    bottom: 0,
  },
  get40Discount: {
    margin: Margin.m_50xs,
  },
  get40DiscountContainer: {
    marginTop: -18,
    color: Color.darkgray,
    top: "50%",
  },
  ellipseParent: {
    right: 0,
    left: 33,
    bottom: 0,
    top: 0,
    position: "absolute",
  },
  giftParent: {
    width: 307,
    height: 86,
  },
});

export default DiscountContainer;
