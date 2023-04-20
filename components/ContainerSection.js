import * as React from "react";
import { useMemo } from "react";
import { Image, StyleSheet, View, Text, Pressable } from "react-native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};

const ContainerSection = ({ propMarginTop, onGroupPressablePress }) => {
  const groupPressableStyle = useMemo(() => {
    return {
      ...getStyleValue("marginTop", propMarginTop),
    };
  }, [propMarginTop]);

  return (
    <Pressable
      style={[styles.ellipseParent, styles.mt_110_75, groupPressableStyle]}
      onPress={onGroupPressablePress}
    >
      <Image
        style={styles.groupChild}
        resizeMode="cover"
        source={require("../assets/ellipse-1231.png")}
      />
      <View style={[styles.rectangleParent, styles.groupItemPosition]}>
        <View style={[styles.groupItem, styles.groupItemPosition]} />
        <Image
          style={[styles.starIcon, styles.textPosition]}
          resizeMode="cover"
          source={require("../assets/star1.png")}
        />
        <Text style={[styles.text, styles.textPosition]}>4.5</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  groupItemPosition: {
    borderRadius: Border.br_6xl,
    bottom: 0,
    position: "absolute",
  },
  textPosition: {
    top: "50%",
    left: "50%",
    position: "absolute",
  },
  groupChild: {
    top: 0,
    right: 0,
    bottom: 21,
    left: 0,
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
    position: "absolute",
  },
  groupItem: {
    right: 8,
    left: 9,
    backgroundColor: Color.gray_300,
    height: 10,
    borderRadius: Border.br_6xl,
    bottom: 0,
  },
  starIcon: {
    marginTop: -7.06,
    marginLeft: -15.87,
    width: 13,
    height: 12,
  },
  text: {
    marginTop: -8.5,
    marginLeft: 0.5,
    fontSize: FontSize.size_5xs,
    fontWeight: "700",
    fontFamily: FontFamily.sourceSansProBold,
    color: Color.darkslategray_200,
    textAlign: "left",
  },
  rectangleParent: {
    marginLeft: -26,
    backgroundColor: Color.white,
    width: 53,
    height: 31,
    opacity: 0,
    left: "50%",
    borderRadius: Border.br_6xl,
    bottom: 0,
  },
  ellipseParent: {
    width: 90,
    height: 111,
    alignSelf: "center",
  },
});

export default ContainerSection;
