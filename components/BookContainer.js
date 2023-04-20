import * as React from "react";
import { useMemo } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};

const BookContainer = ({ propMarginTop, onGroupPressablePress }) => {
  const groupPressable1Style = useMemo(() => {
    return {
      ...getStyleValue("marginTop", propMarginTop),
    };
  }, [propMarginTop]);

  return (
    <Pressable
      style={[styles.rectangleParent, styles.mt_81_75, groupPressable1Style]}
      onPress={onGroupPressablePress}
    >
      <View style={[styles.groupChild, styles.groupChildBg]} />
      <View style={[styles.bookWrapper, styles.groupChildBg]}>
        <Text style={styles.book}>Book</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  groupChildBg: {
    backgroundColor: Color.lightgreen,
    borderRadius: Border.br_5xl,
    position: "absolute",
  },
  groupChild: {
    right: 16,
    bottom: 0,
    left: 16,
    height: 39,
  },
  book: {
    marginTop: -12,
    marginLeft: -22,
    top: "50%",
    left: "50%",
    fontSize: FontSize.size_2xl,
    fontWeight: "700",
    fontFamily: FontFamily.sourceSansProBold,
    color: Color.white,
    textAlign: "left",
    position: "absolute",
  },
  bookWrapper: {
    top: 0,
    right: 0,
    bottom: 3,
    left: 0,
  },
  rectangleParent: {
    width: 184,
    height: 55,
    alignSelf: "center",
  },
});

export default BookContainer;
