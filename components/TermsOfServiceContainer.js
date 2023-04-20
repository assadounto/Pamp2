import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const TermsOfServiceContainer = () => {
  return (
    <View style={[styles.rectangleParent, styles.mt_80_77000000000001]}>
      <View
        style={[styles.groupChild, styles.groupPosition, styles.groupPosition1]}
      />
      <Text style={[styles.termsOfService, styles.termsTypo]}>
        Terms of Service
      </Text>
      <Image
        style={[styles.chevronRightIcon, styles.chevronIconLayout]}
        resizeMode="cover"
        source={require("../assets/chevronright3.png")}
      />
      <View
        style={[styles.groupItem, styles.groupPosition, styles.groupPosition1]}
      />
      <Text style={[styles.termsOfUse, styles.termsTypo]}>Terms of Use</Text>
      <Image
        style={[styles.chevronRightIcon1, styles.chevronIconLayout]}
        resizeMode="cover"
        source={require("../assets/chevronright3.png")}
      />
      <Image
        style={[styles.path651Icon, styles.groupPosition]}
        resizeMode="cover"
        source={require("../assets/path-631.png")}
      />
      <Text style={[styles.privacyPolicy, styles.termsTypo]}>
        Privacy policy
      </Text>
      <Image
        style={[styles.chevronRightIcon2, styles.chevronIconLayout]}
        resizeMode="cover"
        source={require("../assets/chevronright3.png")}
      />
      <Image
        style={styles.path660Icon}
        resizeMode="cover"
        source={require("../assets/path-660.png")}
      />
      <Image
        style={[styles.groupInner, styles.groupLayout]}
        resizeMode="cover"
        source={require("../assets/group-1892.png")}
      />
      <Image
        style={[styles.groupIcon, styles.groupLayout]}
        resizeMode="cover"
        source={require("../assets/group-1892.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  groupPosition: {
    height: 57,
    left: 0,
    right: 0,
    position: "absolute",
  },
  groupPosition1: {
    backgroundColor: Color.whitesmoke_100,
    height: 57,
    left: 0,
    right: 0,
    position: "absolute",
    borderRadius: Border.br_xs,
  },
  termsTypo: {
    textAlign: "left",
    color: Color.darkslategray_200,
    fontFamily: FontFamily.sourceSansProSemibold,
    fontWeight: "600",
    fontSize: FontSize.size_sm,
    left: "50%",
    marginLeft: -129,
    position: "absolute",
  },
  chevronIconLayout: {
    height: 14,
    width: 9,
    right: 19,
    position: "absolute",
  },
  groupLayout: {
    height: 12,
    width: 13,
    left: 26,
    position: "absolute",
  },
  groupChild: {
    bottom: 0,
  },
  termsOfService: {
    bottom: 16,
  },
  chevronRightIcon: {
    bottom: 20,
  },
  groupItem: {
    marginTop: -28.46,
    top: "50%",
  },
  termsOfUse: {
    marginTop: -9.54,
    top: "50%",
  },
  chevronRightIcon1: {
    marginTop: -6.54,
    top: "50%",
  },
  path651Icon: {
    top: 0,
    maxWidth: "100%",
    overflow: "hidden",
    height: 57,
    left: 0,
    right: 0,
    position: "absolute",
  },
  privacyPolicy: {
    top: 19,
  },
  chevronRightIcon2: {
    top: 22,
  },
  path660Icon: {
    top: 20,
    height: 17,
    width: 13,
    left: 26,
    position: "absolute",
  },
  groupInner: {
    marginTop: -6.46,
    top: "50%",
  },
  groupIcon: {
    bottom: 23,
  },
  rectangleParent: {
    backgroundColor: Color.whitesmoke_200,
    width: 372,
    height: 171,
    alignSelf: "center",
    borderRadius: Border.br_xs,
  },
});

export default TermsOfServiceContainer;
