import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";

const SalonContainer = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={[styles.path636Parent, styles.mt28_630000000000003, styles.mr22]}
      onPress={() => navigation.navigate("BookingDetails")}
    >
      <Image
        style={[styles.path636Icon, styles.groupChildPosition]}
        resizeMode="cover"
        source={require("../assets/path-636.png")}
      />
      <Image
        style={[styles.groupChild, styles.groupChildPosition]}
        resizeMode="cover"
        source={require("../assets/rectangle-9764.png")}
      />
      <Image
        style={[styles.groupItem, styles.groupItemPosition]}
        resizeMode="cover"
        source={require("../assets/group-1799.png")}
      />
      <Text style={[styles.likkleSalon, styles.totalFlexBox]}>
        Likkle salon
      </Text>
      <Text
        style={[styles.sewInTypo, styles.sewInPosition, styles.sewInPosition1]}
      >{`Sew in & Haircut`}</Text>
      <Text style={[styles.total, styles.sewInPosition, styles.totalFlexBox]}>
        Total
      </Text>
      <Text style={[styles.am10am, styles.sewInPosition1]}>9am - 10am</Text>
      <Text style={[styles.text, styles.textTypo]}>¢200</Text>
      <Text
        style={[
          styles.july2022,
          styles.textTypo,
          styles.sewInTypo,
          styles.sewInPosition,
        ]}
      >
        13 July 2022
      </Text>
      <View style={[styles.groupInner, styles.lineViewBorder]} />
      <View style={[styles.lineView, styles.lineViewBorder]} />
      <View style={[styles.bookedWrapper, styles.groupItemPosition]}>
        <Text style={[styles.booked, styles.sewInTypo, styles.totalFlexBox]}>
          Booked
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  groupChildPosition: {
    overflow: "hidden",
    maxWidth: "100%",
    left: 0,
    top: 0,
    position: "absolute",
  },
  groupItemPosition: {
    position: "absolute",
    top: "50%",
  },
  totalFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  sewInPosition: {
    left: 25,
    color: Color.darkslategray_200,
  },
  sewInPosition1: {
    marginTop: 90.99,
    textAlign: "left",
    fontSize: FontSize.size_base,
    top: "50%",
    position: "absolute",
  },
  textTypo: {
    fontSize: FontSize.size_2xl,
    textAlign: "left",
    position: "absolute",
  },
  sewInTypo: {
    fontFamily: FontFamily.sourceSansProSemibold,
    fontWeight: "600",
  },
  lineViewBorder: {
    height: 2,
    borderTopWidth: 1,
    borderColor: "#b0ebbd",
    borderStyle: "solid",
    position: "absolute",
  },
  path636Icon: {
    right: -195,
    bottom: -195,
    maxHeight: "100%",
  },
  groupChild: {
    right: 0,
    borderTopLeftRadius: Border.br_lg,
    borderTopRightRadius: Border.br_lg,
    height: 201,
  },
  groupItem: {
    marginTop: 32.99,
    left: 20,
    width: 34,
    height: 34,
    top: "50%",
  },
  likkleSalon: {
    marginTop: 38.99,
    marginLeft: -126.5,
    color: Color.darkslategray_200,
    textAlign: "left",
    fontFamily: FontFamily.sourceSansProRegular,
    fontSize: FontSize.size_base,
    left: "50%",
    top: "50%",
  },
  total: {
    bottom: 31,
    fontFamily: FontFamily.sourceSansProRegular,
    fontSize: FontSize.size_base,
    left: 25,
    textAlign: "left",
  },
  am10am: {
    right: 28,
    color: Color.lightgreen,
    fontFamily: FontFamily.sourceSansProRegular,
  },
  text: {
    right: 27,
    bottom: 30,
    fontWeight: "700",
    fontFamily: FontFamily.sourceSansProBold,
    color: Color.lightgreen,
  },
  july2022: {
    marginTop: 0.99,
    top: "50%",
  },
  groupInner: {
    marginTop: 74.99,
    right: 19,
    left: 15,
    top: "50%",
  },
  lineView: {
    right: 16,
    bottom: 76,
    left: 18,
  },
  booked: {
    marginLeft: -19,
    top: 3,
    fontSize: FontSize.size_5xs,
    color: Color.white,
    textAlign: "left",
    left: "50%",
    fontWeight: "600",
  },
  bookedWrapper: {
    marginTop: 8.99,
    right: 29,
    borderRadius: Border.br_6xl,
    backgroundColor: Color.darkslategray_200,
    width: 62,
    height: 21,
    top: "50%",
  },
  path636Parent: {
    width: 369,
    height: 424,
  },
});

export default SalonContainer;
