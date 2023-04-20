import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Color, Border, FontFamily, FontSize, Margin } from "../GlobalStyles";

const TimeContainer = () => {
  return (
    <View style={[styles.rectangleParent, styles.mt81_26, styles.ml4]}>
      <View style={styles.groupChild} />
      <View style={styles.groupItem} />
      <View style={[styles.groupInner, styles.groupChildLayout]} />
      <View style={styles.amParent}>
        <Text style={[styles.am, styles.amTypo, styles.amTypo1]}>9:00am</Text>
        <Image
          style={styles.chevronRightIcon}
          resizeMode="cover"
          source={require("../assets/chevronright25.png")}
        />
      </View>
      <View style={[styles.lineView, styles.groupChildPosition]} />
      <Text style={[styles.time, styles.amTypo, styles.amTypo1]}>Time</Text>
      <View
        style={[
          styles.rectangleView,
          styles.groupChildLayout,
          styles.groupChildPosition1,
        ]}
      />
      <View style={[styles.amGroup, styles.groupPosition]}>
        <Text style={[styles.am, styles.amTypo, styles.amTypo1]}>9:00am</Text>
        <Image
          style={styles.chevronRightIcon}
          resizeMode="cover"
          source={require("../assets/chevronright25.png")}
        />
      </View>
      <View
        style={[
          styles.groupChild1,
          styles.groupChildLayout,
          styles.groupChildPosition1,
        ]}
      />
      <View style={[styles.amContainer, styles.groupPosition]}>
        <Text style={[styles.am, styles.amTypo, styles.amTypo1]}>9:00am</Text>
        <Image
          style={styles.chevronRightIcon}
          resizeMode="cover"
          source={require("../assets/chevronright25.png")}
        />
      </View>
      <View style={[styles.groupChild2, styles.groupChildPosition]} />
      <View
        style={[
          styles.groupChild3,
          styles.groupChildLayout,
          styles.groupChildPosition1,
        ]}
      />
      <View style={[styles.groupView, styles.groupPosition]}>
        <Text style={[styles.am, styles.amTypo, styles.amTypo1]}>9:00am</Text>
        <Image
          style={styles.chevronRightIcon}
          resizeMode="cover"
          source={require("../assets/chevronright25.png")}
        />
      </View>
      <View style={[styles.groupChild4, styles.groupChildPosition]} />
      <View style={[styles.groupChild5, styles.groupChildPosition]} />
      <View
        style={[
          styles.groupChild6,
          styles.groupChildLayout,
          styles.groupChildPosition1,
        ]}
      />
      <View style={[styles.amParent1, styles.groupPosition]}>
        <Text style={[styles.am, styles.amTypo, styles.amTypo1]}>9:00am</Text>
        <Image
          style={styles.chevronRightIcon}
          resizeMode="cover"
          source={require("../assets/chevronright25.png")}
        />
      </View>
      <View style={[styles.groupChild7, styles.groupChildPosition]} />
      <Text
        style={[
          styles.likkleSalonIsContainer,
          styles.selectAnotherDatePosition,
        ]}
      >
        <Text style={styles.likkleSalon}>{`Likkle salon `}</Text>
        <Text style={styles.likkleSalon}>is closed today</Text>
      </Text>
      <View style={styles.path659Parent}>
        <Image
          style={styles.path659Icon}
          resizeMode="cover"
          source={require("../assets/path-659.png")}
        />
        <Text style={[styles.closed, styles.amTypo]}>Closed</Text>
      </View>
      <Text
        style={[styles.selectAnotherDate, styles.selectAnotherDatePosition]}
      >
        Select another date
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  groupChildLayout: {
    height: 85,
    backgroundColor: Color.white,
    borderRadius: Border.br_2xl,
    position: "absolute",
  },
  amTypo: {
    textAlign: "left",
    fontWeight: "700",
    position: "absolute",
  },
  amTypo1: {
    color: Color.darkslategray_200,
    fontFamily: FontFamily.sourceSansProBold,
    textAlign: "left",
    fontWeight: "700",
    top: 0,
  },
  groupChildPosition: {
    height: 2,
    borderTopWidth: 1,
    borderColor: "#b0ebbd",
    borderStyle: "solid",
    left: 31,
    right: 33,
    opacity: 0,
    position: "absolute",
  },
  groupChildPosition1: {
    right: 0,
    height: 85,
    left: 1,
  },
  groupPosition: {
    left: 35,
    right: 34,
    opacity: 0,
    height: 27,
    position: "absolute",
  },
  selectAnotherDatePosition: {
    textAlign: "center",
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  groupChild: {
    top: 54,
    borderRadius: Border.br_lg,
    backgroundColor: Color.gray_500,
    left: 1,
    bottom: 0,
    right: 1,
    position: "absolute",
  },
  groupItem: {
    bottom: 19,
    backgroundColor: Color.white,
    borderRadius: Border.br_2xl,
    right: 0,
    top: 37,
    left: 1,
    position: "absolute",
  },
  groupInner: {
    marginTop: 100.5,
    left: 0,
    top: "50%",
    height: 85,
    right: 1,
  },
  am: {
    fontSize: FontSize.size_xl,
    left: 0,
  },
  chevronRightIcon: {
    marginTop: -8.5,
    right: -1,
    width: 8,
    height: 15,
    top: "50%",
    position: "absolute",
  },
  amParent: {
    marginTop: 131.5,
    right: 35,
    left: 34,
    opacity: 0,
    height: 27,
    top: "50%",
    position: "absolute",
  },
  lineView: {
    marginTop: 99,
    top: "50%",
  },
  time: {
    left: 18,
    fontSize: FontSize.size_2xl,
  },
  rectangleView: {
    top: 37,
    right: 0,
  },
  amGroup: {
    top: 68,
  },
  groupChild1: {
    marginTop: -157.5,
    top: "50%",
  },
  amContainer: {
    marginTop: -126.5,
    top: "50%",
  },
  groupChild2: {
    marginTop: -159,
    top: "50%",
  },
  groupChild3: {
    marginTop: 14.5,
    top: "50%",
  },
  groupView: {
    marginTop: 45.5,
    top: "50%",
  },
  groupChild4: {
    marginTop: 13,
    top: "50%",
  },
  groupChild5: {
    bottom: 94,
  },
  groupChild6: {
    marginTop: -71.5,
    top: "50%",
  },
  amParent1: {
    marginTop: -40.5,
    top: "50%",
  },
  groupChild7: {
    marginTop: -73,
    top: "50%",
  },
  likkleSalon: {
    margin: Margin.m_50xs,
  },
  likkleSalonIsContainer: {
    marginTop: -189.5,
    marginLeft: -76.25,
    fontSize: FontSize.size_4xl,
    lineHeight: 24,
    fontWeight: "600",
    fontFamily: FontFamily.sourceSansProSemibold,
    color: Color.lightgreen,
  },
  path659Icon: {
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
  },
  closed: {
    marginTop: -39.76,
    left: 23,
    fontSize: FontSize.size_11xl,
    fontStyle: "italic",
    fontFamily: FontFamily.bodoniBdBTBoldItalic,
    color: Color.beige_100,
    transform: [
      {
        rotate: "357deg",
      },
    ],
    textAlign: "left",
    fontWeight: "700",
    top: "50%",
  },
  path659Parent: {
    marginTop: -102.5,
    marginLeft: -104.25,
    width: 209,
    height: 195,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  selectAnotherDate: {
    marginTop: 150.5,
    marginLeft: -57.25,
    fontSize: FontSize.size_2xs,
    lineHeight: 17,
    fontFamily: FontFamily.sourceSansProRegular,
    color: Color.darkseagreen_100,
  },
  rectangleParent: {
    width: 362,
    height: 561,
  },
});

export default TimeContainer;
