import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";

const Emptyfav = () => {
  return (
    <View style={styles.component45}>
      <Image
        style={styles.component45Child}
        resizeMode="cover"
        source={require("../assets/group-2143.png")}
      />
      <Text style={[styles.noFavourites, styles.youDontHaveTypo]}>
        No Favourites
      </Text>
      <Text style={[styles.youDontHave, styles.youDontHaveTypo]}>
        You don't have any favourites yet.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  youDontHaveTypo: {
    textAlign: "center",
    color: Color.darkslategray_200,
    fontFamily: FontFamily.sourceSansProRegular,
    position: "absolute",
  },
  component45Child: {
    height: "53.78%",
    width: "85.71%",
    top: "0%",
    right: "7.14%",
    bottom: "46.22%",
    left: "7.14%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
    position: "absolute",
  },
  noFavourites: {
    top: "82.98%",
    left: "27.38%",
    fontSize: FontSize.size_xl,
  },
  youDontHave: {
    top: "92.17%",
    left: "0%",
    fontSize: FontSize.size_lg,
  },
  component45: {
    top: 211,
    width: 252,
    height: 294,
    alignSelf:'center'
  },
});

export default Emptyfav;
