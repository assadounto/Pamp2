import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";

const EmptyAppoiment = () => {
  return (
    <View style={styles.component44}>
      <Image
        style={styles.component44Child}
        resizeMode="cover"
        source={require("../assets/group-2142.png")}
      />
      <Text style={[styles.noAppointments, styles.youDontHaveTypo]}>
        No appointments
      </Text>
      <Text style={[styles.youDontHave, styles.youDontHaveTypo]}>
        You don't have upcoming schedules.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  youDontHaveTypo: {
    textAlign: "center",
    color: Color.darkslategray_200,
    fontFamily: FontFamily.sourceSansProRegular,

  },
  component44Child: {
    height: "65.97%",
    width: "78.83%",
    top: "0%",
    right: "10.95%",
    bottom: "34.03%",
    left: "10.22%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
    position: "absolute",
  },
  noAppointments: {
    top: "83.11%",
    fontSize: FontSize.size_xl,
  },
  youDontHave: {
    top: "92.23%",
    left: "0%",
    fontSize: FontSize.size_lg,
  },
  component44: {
    top: 209,
    left: 71,
    width: 274,
    height: 296,
    position: "absolute",
  },
});

export default EmptyAppoiment;
