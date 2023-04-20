import * as React from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const MenuContainer = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.menu, styles.mt_228_37, styles.mr_20]}>
      <View style={styles.menuChild} />
      <Image
        style={styles.path629Icon}
        resizeMode="cover"
        source={require("../assets/path-628.png")}
      />
      <Pressable
        style={[styles.home, styles.homePosition]}
        onPress={() => navigation.navigate("HomePage")}
      >
        <Image
          style={[styles.homeIcon, styles.iconLayout, styles.iconPosition]}
          resizeMode="cover"
          source={require("../assets/home1.png")}
        />
        <Text style={[styles.home1, styles.home1Typo]}>Home</Text>
      </Pressable>
      <View style={[styles.bookings, styles.myFavPosition]}>
        <View style={[styles.calendar, styles.calendarBorder]}>
          <View style={[styles.calendarChild, styles.calendarPosition]} />
          <View style={[styles.calendarItem, styles.calendarPosition]} />
          <View style={[styles.calendarInner, styles.calendarBorder]} />
        </View>
        <Text style={styles.home1Typo}>Bookings</Text>
      </View>
      <Pressable
        style={[styles.myFav, styles.myFavPosition]}
        onPress={() => navigation.navigate("MyFav")}
      >
        <Image
          style={[styles.heartIcon, styles.iconLayout, styles.iconPosition]}
          resizeMode="cover"
          source={require("../assets/heart1.png")}
        />
        <Text style={[styles.home1, styles.home1Typo]}>My Fav</Text>
      </Pressable>
      <Pressable
        style={[styles.settings, styles.homePosition]}
        onPress={() => navigation.navigate("Settings")}
      >
        <Image
          style={[styles.slidersIcon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../assets/sliders.png")}
        />
        <Text style={[styles.home1, styles.home1Typo]}>Settings</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  homePosition: {
    height: 24,
    marginTop: -21,
    top: "50%",
    position: "absolute",
  },
  iconLayout: {
    maxHeight: "100%",
    position: "absolute",
  },
  iconPosition: {
    top: 1,
    maxHeight: "100%",
  },
  home1Typo: {
    textAlign: "left",
    color: Color.white,
    fontFamily: FontFamily.sourceSansProRegular,
    fontSize: FontSize.size_base,
    right: -1,
    top: 0,
    position: "absolute",
  },
  myFavPosition: {
    left: "50%",
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
    borderColor: "#fff",
    borderStyle: "solid",
    left: "50%",
    position: "absolute",
  },
  menuChild: {
    right: 20,
    bottom: 0,
    backgroundColor: Color.white,
    shadowColor: "rgba(97, 115, 132, 0.16)",
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowRadius: 40,
    elevation: 40,
    shadowOpacity: 1,
    left: 0,
    top: 0,
    position: "absolute",
  },
  path629Icon: {
    marginTop: -32,
    left: 110,
    width: 122,
    height: 44,
    top: "50%",
    position: "absolute",
  },
  homeIcon: {
    bottom: 1,
    width: 20,
    left: 0,
  },
  home1: {
    opacity: 0,
  },
  home: {
    left: 50,
    width: 73,
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
    borderRadius: Border.br_8xs,
    borderWidth: 2,
    bottom: 3,
    width: 20,
  },
  bookings: {
    marginLeft: -94,
    width: 96,
  },
  heartIcon: {
    left: -1,
    width: 23,
    bottom: 3,
  },
  myFav: {
    marginLeft: 48.5,
    width: 81,
  },
  slidersIcon: {
    top: 2,
    bottom: 2,
    width: 24,
    left: 0,
  },
  settings: {
    right: 0,
    width: 92,
  },
  menu: {
    width: 434,
    height: 110,
  },
});

export default MenuContainer;
