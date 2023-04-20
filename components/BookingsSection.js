import * as React from "react";
import { useMemo } from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};

const BookingsSection = ({ propMarginTop, propMarginRight }) => {
  const groupViewStyle = useMemo(() => {
    return {
      ...getStyleValue("marginTop", propMarginTop),
      ...getStyleValue("marginRight", propMarginRight),
    };
  }, [propMarginTop, propMarginRight]);

  return (
    <View
      style={[
        styles.path628Parent,
        styles.mt_1_370000000000001,
        groupViewStyle,
      ]}
    >
      <Image
        style={styles.path628Icon}
        resizeMode="cover"
        source={require("../assets/path-628.png")}
      />
      <View style={[styles.bookings, styles.parentPosition]}>
        <View style={[styles.calendar, styles.calendarBorder]}>
          <View style={[styles.calendarChild, styles.calendarPosition]} />
          <View style={[styles.calendarItem, styles.calendarPosition]} />
          <View style={[styles.calendarInner, styles.calendarBorder]} />
        </View>
        <Text style={styles.addTypo}>Bookings</Text>
      </View>
      <View style={styles.plusCircleParent}>
        <Image
          style={[styles.plusCircleIcon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../assets/pluscircle.png")}
        />
        <Text style={[styles.add, styles.addTypo]}>Add</Text>
      </View>
      <View style={[styles.profileParent, styles.parentPosition]}>
        <Text style={[styles.add, styles.addTypo]}>Profile</Text>
        <Image
          style={[styles.userIcon, styles.iconPosition, styles.iconLayout]}
          resizeMode="cover"
          source={require("../assets/user.png")}
        />
      </View>
      <View style={[styles.analyticsParent, styles.parentPosition]}>
        <Text style={[styles.add, styles.addTypo]}>Analytics</Text>
        <Image
          style={[styles.activityIcon, styles.iconPosition]}
          resizeMode="cover"
          source={require("../assets/activity.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentPosition: {
    height: 24,
    marginTop: -21,
    top: "50%",
    position: "absolute",
  },
  calendarBorder: {
    borderColor: "#fff",
    borderStyle: "solid",
    left: -2,
    position: "absolute",
  },
  calendarPosition: {
    height: 6,
    width: 4,
    borderRightWidth: 2,
    top: -2,
    left: "50%",
    borderColor: "#fff",
    borderStyle: "solid",
    position: "absolute",
  },
  iconLayout: {
    maxHeight: "100%",
    left: 0,
  },
  addTypo: {
    textAlign: "left",
    color: Color.white,
    fontFamily: FontFamily.sourceSansProRegular,
    fontSize: FontSize.size_base,
    right: -1,
    top: 0,
    position: "absolute",
  },
  iconPosition: {
    top: 1,
    position: "absolute",
  },
  path628Icon: {
    marginTop: -32,
    left: 30,
    width: 122,
    height: 44,
    top: "50%",
    position: "absolute",
  },
  calendarChild: {
    marginLeft: 1,
  },
  calendarItem: {
    marginLeft: -7,
  },
  calendarInner: {
    marginTop: -5,
    right: 2,
    borderTopWidth: 2,
    height: 4,
    top: "50%",
  },
  calendar: {
    top: -1,
    bottom: 3,
    borderRadius: Border.br_8xs,
    borderWidth: 2,
    width: 20,
  },
  bookings: {
    left: 43,
    width: 96,
  },
  plusCircleIcon: {
    top: 2,
    bottom: 0,
    width: 22,
    position: "absolute",
  },
  add: {
    opacity: 0,
  },
  plusCircleParent: {
    marginLeft: -24.5,
    width: 59,
    left: "50%",
    height: 24,
    marginTop: -21,
    top: "50%",
    position: "absolute",
  },
  userIcon: {
    bottom: 1,
    width: 20,
  },
  profileParent: {
    right: 0,
    width: 77,
  },
  activityIcon: {
    left: -1,
    height: 20,
    width: 22,
  },
  analyticsParent: {
    right: 57,
    width: 97,
  },
  path628Parent: {
    backgroundColor: Color.white,
    shadowColor: "rgba(97, 115, 132, 0.16)",
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowRadius: 40,
    elevation: 40,
    shadowOpacity: 1,
    width: 419,
    height: 110,
  },
});

export default BookingsSection;
