import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";

const EmptyStateNoti = () => {
  return (
    <View style={styles.groupParent}>
      <Image
        style={styles.componentChild}
        resizeMode="cover"
        source={require("../assets/group-2144.png")}
      />
      <Text style={[styles.noNotifications, styles.youDontHaveTypo]}>
        No notifications
      </Text>
      <Text style={[styles.youDontHave, styles.youDontHaveTypo]}>
        You don't have any notifications yet.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  youDontHaveTypo: {
    textAlign: "center",
    color: Color.darkslategray_300,
    fontFamily: FontFamily.sourceSansProRegular,
    position: "absolute",
  },
  componentChild: {
    top: 0,
    left: 27,
    width: 216,
    height: 125,
    position: "absolute",
  },
  noNotifications: {
    top: 246,
    left: 69,
    fontSize: FontSize.size_xl,
  },
  youDontHave: {
    top: 273,
    left: 0,
    textAlign: 'center',
    fontSize: FontSize.size_lg,
  },
  groupParent: {
    top: 200,
    left: 72,
    width: 271,
    height: 296,
    position: "absolute",
  },
});

export default EmptyStateNoti;
