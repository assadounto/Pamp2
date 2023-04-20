import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import SalonContainer from "../components/SalonContainer";
import AppointmentsContainer from "../components/AppointmentsContainer";
import MenuContainer from "../components/MenuContainer";
import { Margin, FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const Bookings = () => {
  return (
    <View style={styles.bookings}>
      <Image
        style={[styles.bellIcon, styles.mt_84, styles.mr47]}
        resizeMode="cover"
        source={require("../assets/bell.png")}
      />
      <Text style={[styles.appointments, styles.mt55_63, styles.mr211]}>
        Appointments
      </Text>
      <SalonContainer />
      <AppointmentsContainer />
      <MenuContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  mt_84: {
    marginTop: Margin.m_208xs,
  },
  mr47: {
    marginRight: Margin.m_86xl,
  },
  mt55_63: {
    marginTop: Margin.m_97xl,
  },
  mr211: {
    marginRight: 211,
  },
  mt28_630000000000003: {
    marginTop: Margin.m_34xl,
  },
  mr22: {
    marginRight: Margin.m_22xl,
  },
  mt_228_37: {
    marginTop: -228.37,
  },
  mr_20: {
    marginRight: Margin.m_112xs,
  },
  bellIcon: {
    width: 20,
    height: 22,
    opacity: 0,
  },
  appointments: {
    fontSize: FontSize.size_5xl,
    fontWeight: "600",
    fontFamily: FontFamily.sourceSansProSemibold,
    color: Color.lightgreen,
    textAlign: "left",
  },
  bookings: {
    backgroundColor: Color.white,
    flex: 1,
    width: "100%",
    paddingTop: Padding.p_lg,
    alignItems: "flex-end",
  },
});

export default Bookings;
