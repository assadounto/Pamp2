import * as React from "react";
import { StyleSheet, View, Image, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";

const CardCreator = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.groupParent, styles.mt29_259999999999998]}>
      <Pressable
        style={styles.lineParent}
        onPress={() => navigation.navigate("AddPaymentMetod1")}
      >
        <View style={[styles.groupChild, styles.groupBorder]} />
        <View style={[styles.groupItem, styles.groupBorder]} />
        <Image
          style={[styles.chevronRightIcon, styles.groupWrapperPosition]}
          resizeMode="cover"
          source={require("../assets/chevronright14.png")}
        />
      </Pressable>
      <View style={[styles.groupWrapper, styles.groupWrapperPosition]}>
        <Image
          style={[styles.groupInner, styles.groupInnerPosition]}
          resizeMode="cover"
          source={require("../assets/group-1756.png")}
        />
      </View>
      <Text style={[styles.addNewCard, styles.groupInnerPosition]}>
        Add new card
      </Text>
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
  groupWrapperPosition: {
    top: "50%",
    position: "absolute",
  },
  groupInnerPosition: {
    left: "50%",
    top: "50%",
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
    right: 35,
    width: 8,
    height: 15,
    marginTop: -7,
  },
  lineParent: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Color.white,
    position: "absolute",
  },
  groupInner: {
    marginLeft: -7,
    width: 16,
    height: 16,
    marginTop: -7,
  },
  groupWrapper: {
    marginTop: -14,
    left: 45,
    borderRadius: Border.br_5xs,
    borderWidth: 1,
    width: 28,
    height: 28,
    borderColor: "#b0ebbd",
    borderStyle: "solid",
    top: "50%",
  },
  addNewCard: {
    marginTop: -10,
    marginLeft: -119,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.sourceSansProRegular,
    color: Color.darkseagreen_100,
    textAlign: "left",
  },
  groupParent: {
    width: 414,
    height: 83,
  },
});

export default CardCreator;
