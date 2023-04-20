import * as React from "react";
import { useMemo } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};

const DeleteAccountContainer = ({ propMarginTop }) => {
  const groupView2Style = useMemo(() => {
    return {
      ...getStyleValue("marginTop", propMarginTop),
    };
  }, [propMarginTop]);

  return (
    <View style={[styles.rectangleParent, styles.mt47_23, groupView2Style]}>
      <View style={styles.groupChild} />
      <Text style={[styles.deleteAccount, styles.groupItemPosition]}>
        Delete account
      </Text>
      <Image
        style={[styles.groupItem, styles.groupItemPosition]}
        resizeMode="cover"
        source={require("../assets/group-1866.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  groupItemPosition: {
    top: "50%",
    position: "absolute",
  },
  groupChild: {
    right: 6,
    bottom: 0,
    left: 6,
    borderRadius: Border.br_lg,
    backgroundColor: Color.gray_500,
    height: 56,
    position: "absolute",
  },
  deleteAccount: {
    marginTop: -15,
    marginLeft: -129,
    left: "50%",
    fontSize: FontSize.size_sm,
    fontWeight: "600",
    fontFamily: FontFamily.sourceSansProSemibold,
    color: Color.darkslategray_200,
    textAlign: "left",
  },
  groupItem: {
    marginTop: -12,
    left: 24,
    width: 20,
    height: 17,
  },
  rectangleParent: {
    borderRadius: Border.br_xs,
    backgroundColor: Color.white,
    width: 372,
    height: 74,
  },
});

export default DeleteAccountContainer;
