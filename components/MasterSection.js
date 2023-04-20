import * as React from "react";
import { StyleSheet, View, Image, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";

const MasterSection = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.groupParent, styles.mt_5]}>
      <Pressable
        style={styles.lineParent}
        onPress={() => navigation.navigate("ConfirmBooking2")}
      >
        <View style={[styles.groupChild, styles.groupBorder]} />
        <View style={[styles.groupItem, styles.groupBorder]} />
        <Image
          style={[styles.chevronRightIcon, styles.groupPosition]}
          resizeMode="cover"
          source={require("../assets/chevronright14.png")}
        />
      </Pressable>
      <View style={[styles.groupContainer, styles.groupPosition]}>
        <Image
          style={[styles.groupInner, styles.groupPosition]}
          resizeMode="cover"
          source={require("../assets/group-1902.png")}
        />
        <Text style={[styles.master, styles.textTypo]}>Master</Text>
        <Text style={[styles.expires, styles.text1Typo, styles.text1Position]}>
          Expires
        </Text>
        <Text style={[styles.default, styles.text1Typo]}>Default</Text>
        <Text style={[styles.text, styles.textTypo]}>0007</Text>
        <Text style={[styles.text1, styles.text1Typo, styles.text1Position]}>
          5/27
        </Text>
        <Image
          style={[styles.ellipseIcon, styles.ellipseIconPosition]}
          resizeMode="cover"
          source={require("../assets/ellipse-139.png")}
        />
        <Image
          style={[styles.groupChild1, styles.ellipseIconPosition]}
          resizeMode="cover"
          source={require("../assets/ellipse-139.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  groupBorder: {
    height: 2,
    borderTopWidth: 1,
    borderColor: "#b0ebbd",
    borderStyle: "solid",
    position: "absolute",
  },
  groupPosition: {
    top: "50%",
    position: "absolute",
  },
  textTypo: {
    textAlign: "left",
    color: Color.darkslategray_200,
    fontFamily: FontFamily.sourceSansProRegular,
    fontSize: FontSize.size_sm,
    left: "50%",
    top: 0,
    position: "absolute",
  },
  text1Typo: {
    fontSize: FontSize.size_xs,
    textAlign: "left",
    color: Color.darkslategray_200,
    fontFamily: FontFamily.sourceSansProRegular,
    bottom: 0,
    position: "absolute",
  },
  text1Position: {
    left: "50%",
    fontSize: FontSize.size_xs,
  },
  ellipseIconPosition: {
    width: 2,
    left: "50%",
    top: "50%",
    height: 2,
    position: "absolute",
  },
  groupChild: {
    top: -1,
    right: 29,
    left: 28,
  },
  groupItem: {
    right: 26,
    bottom: -1,
    left: 30,
  },
  chevronRightIcon: {
    marginTop: -5.5,
    right: 35,
    width: 8,
    height: 15,
  },
  lineParent: {
    right: 0,
    backgroundColor: Color.white,
    left: 0,
    bottom: 0,
    top: 0,
    position: "absolute",
  },
  groupInner: {
    marginTop: -8.27,
    width: 30,
    height: 17,
    left: 0,
  },
  master: {
    marginLeft: -42.63,
  },
  expires: {
    marginLeft: -44.63,
  },
  default: {
    right: -1,
  },
  text: {
    marginLeft: 15.37,
  },
  text1: {
    marginLeft: 3.37,
  },
  ellipseIcon: {
    marginTop: -9.5,
    marginLeft: 7.37,
  },
  groupChild1: {
    marginTop: 9.5,
    marginLeft: 34.37,
  },
  groupContainer: {
    marginTop: -19.5,
    left: 45,
    width: 171,
    height: 41,
  },
  groupParent: {
    width: 414,
    height: 83,
  },
});

export default MasterSection;
