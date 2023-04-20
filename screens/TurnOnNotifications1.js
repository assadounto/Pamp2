import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Margin, Border, Color, FontSize, FontFamily } from "../GlobalStyles";

const TurnOnNotifications = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.turnOnNotifications}>
      <Image
        style={[styles.turnOnNotificationsChild, styles.mt_47, styles.ml145]}
        resizeMode="cover"
        source={require("../assets/ellipse-972.png")}
      />
      <Image
        style={[styles.turnOnNotificationsChild, styles.mt17_61, styles.ml265]}
        resizeMode="cover"
        source={require("../assets/ellipse-972.png")}
      />
      <Image
        style={[styles.path524Icon, styles.mt_11_39, styles.ml37]}
        resizeMode="cover"
        source={require("../assets/path-445.png")}
      />
      <View style={[styles.turnOnNotificationsInner, styles.mt6_61]} />
      <Image
        style={[styles.path485Icon, styles.mt_12_39]}
        resizeMode="cover"
        source={require("../assets/path-485.png")}
      />
      <Image
        style={[styles.path486Icon, styles.mt_20_39, styles.ml19]}
        resizeMode="cover"
        source={require("../assets/path-4863.png")}
      />
      <Image
        style={[styles.groupIcon, styles.mt_88_39]}
        resizeMode="cover"
        source={require("../assets/group-1664.png")}
      />
      <Image
        style={[styles.turnOnNotificationsChild1, styles.mt0_6100000000000003]}
        resizeMode="cover"
        source={require("../assets/group-17013.png")}
      />
      <Image
        style={[styles.path490Icon, styles.mt_193_39, styles.ml114]}
        resizeMode="cover"
        source={require("../assets/path-490.png")}
      />
      <Image
        style={[styles.path495Icon, styles.mt_10_39, styles.ml23]}
        resizeMode="cover"
        source={require("../assets/path-495.png")}
      />
      <Image
        style={[styles.path497Icon, styles.mt45_61, styles.ml329]}
        resizeMode="cover"
        source={require("../assets/path-497.png")}
      />
      <Image
        style={[styles.turnOnNotificationsChild2, styles.mt6_61, styles.ml325]}
        resizeMode="cover"
        source={require("../assets/group-1662.png")}
      />
      <Image
        style={[styles.turnOnNotificationsChild3, styles.mt41_61, styles.ml23]}
        resizeMode="cover"
        source={require("../assets/group-1661.png")}
      />
      <Image
        style={[styles.path524Icon, styles.mt_850_39, styles.ml311]}
        resizeMode="cover"
        source={require("../assets/path-469.png")}
      />
      <Image
        style={[styles.path521Icon, styles.mt_13_39, styles.ml85]}
        resizeMode="cover"
        source={require("../assets/path-521.png")}
      />
      <Image
        style={[styles.path521Icon, styles.mt_3_3899999999999997, styles.ml362]}
        resizeMode="cover"
        source={require("../assets/path-521.png")}
      />
      <Image
        style={[styles.path521Icon, styles.mt14_61, styles.ml269]}
        resizeMode="cover"
        source={require("../assets/path-521.png")}
      />
      <Image
        style={[styles.path524Icon, styles.mt_275_39, styles.ml88]}
        resizeMode="cover"
        source={require("../assets/path-519.png")}
      />
      <Image
        style={[styles.path524Icon, styles.mt_5_39, styles.ml372]}
        resizeMode="cover"
        source={require("../assets/path-445.png")}
      />
      <Image
        style={[styles.path521Icon, styles.mt9_61, styles.ml34]}
        resizeMode="cover"
        source={require("../assets/path-520.png")}
      />
      <Image
        style={[styles.paperPlane1Icon, styles.mt_10_39, styles.ml195]}
        resizeMode="cover"
        source={require("../assets/paperplane-1.png")}
      />
      <View style={[styles.rectangleView, styles.mt100_61, styles.ml15]} />
      <Text
        style={[styles.turnOnNotifications1, styles.mt_277_39, styles.ml70]}
      >
        Turn on notifications
      </Text>
      <Text
        style={[
          styles.maybeLater1Typo,
          styles.mt_2_3899999999999997,
          styles.ml95,
        ]}
      >
        <Text
          style={styles.dontMissAppointments}
        >{`Don't miss appointments, `}</Text>
        <Text style={styles.dontMissAppointments}>
          promos and exclusive offers.
        </Text>
      </Text>
      <Pressable
        style={[styles.mt54_61, styles.ml162]}
        onPress={() => navigation.navigate("HomePage")}
      >
        <Text style={styles.maybeLater1Typo}>Maybe later</Text>
      </Pressable>
      <Pressable
        style={[
          styles.rectangleParent,
          styles.mt3_6100000000000003,
          styles.ml123,
        ]}
        onPress={() => navigation.navigate("TurnOnNotifications1")}
      >
        <View style={[styles.groupChild, styles.groupChildLayout]} />
        <View style={[styles.turnOnWrapper, styles.groupChildLayout]}>
          <Text style={styles.turnOn}>Turn on</Text>
        </View>
      </Pressable>
      <Image
        style={[styles.notificationBellIcon, styles.mt_228_39, styles.ml57]}
        resizeMode="cover"
        source={require("../assets/notification-bell.png")}
      />
      <Image
        style={[styles.notificationBellIcon1, styles.mt_26_39, styles.ml53]}
        resizeMode="cover"
        source={require("../assets/notification-bell1.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mt_47: {
    marginTop: Margin.m_188xs,
  },
  ml145: {
    marginLeft: Margin.m_158xl,
  },
  mt17_61: {
    marginTop: Margin.m_6xl,
  },
  ml265: {
    marginLeft: Margin.m_210xl,
  },
  mt_11_39: {
    marginTop: -11.39,
  },
  ml37: {
    marginLeft: Margin.m_65xl,
  },
  mt6_61: {
    marginTop: Margin.m_27xs,
  },
  mt_12_39: {
    marginTop: Margin.m_82xs,
  },
  mt_20_39: {
    marginTop: Margin.m_107xs,
  },
  ml19: {
    marginLeft: Margin.m_12xl,
  },
  mt_88_39: {
    marginTop: Margin.m_212xs,
  },
  mt0_6100000000000003: {
    marginTop: Margin.m_45xs,
  },
  mt_193_39: {
    marginTop: Margin.m_230xs,
  },
  ml114: {
    marginLeft: Margin.m_146xl,
  },
  mt_10_39: {
    marginTop: Margin.m_76xs,
  },
  ml23: {
    marginLeft: Margin.m_25xl,
  },
  mt45_61: {
    marginTop: Margin.m_82xl,
  },
  ml329: {
    marginLeft: Margin.m_232xl,
  },
  ml325: {
    marginLeft: Margin.m_229xl,
  },
  mt41_61: {
    marginTop: Margin.m_74xl,
  },
  mt_850_39: {
    marginTop: Margin.m_251xs,
  },
  ml311: {
    marginLeft: Margin.m_222xl,
  },
  mt_13_39: {
    marginTop: Margin.m_83xs,
  },
  ml85: {
    marginLeft: Margin.m_128xl,
  },
  mt_3_3899999999999997: {
    marginTop: Margin.m_59xs,
  },
  ml362: {
    marginLeft: Margin.m_248xl,
  },
  mt14_61: {
    marginTop: Margin.m_xs,
  },
  ml269: {
    marginLeft: Margin.m_214xl,
  },
  mt_275_39: {
    marginTop: Margin.m_237xs,
  },
  ml88: {
    marginLeft: Margin.m_130xl,
  },
  mt_5_39: {
    marginTop: Margin.m_65xs,
  },
  ml372: {
    marginLeft: Margin.m_252xl,
  },
  mt9_61: {
    marginTop: Margin.m_14xs,
  },
  ml34: {
    marginLeft: Margin.m_56xl,
  },
  ml195: {
    marginLeft: Margin.m_184xl,
  },
  mt100_61: {
    marginTop: Margin.m_137xl,
  },
  ml15: {
    marginLeft: Margin.m_sm,
  },
  mt_277_39: {
    marginTop: Margin.m_238xs,
  },
  ml70: {
    marginLeft: Margin.m_114xl,
  },
  mt_2_3899999999999997: {
    marginTop: Margin.m_54xs,
  },
  ml95: {
    marginLeft: Margin.m_135xl,
  },
  mt54_61: {
    marginTop: Margin.m_95xl,
  },
  ml162: {
    marginLeft: Margin.m_167xl,
  },
  mt3_6100000000000003: {
    marginTop: Margin.m_34xs,
  },
  ml123: {
    marginLeft: Margin.m_149xl,
  },
  mt_228_39: {
    marginTop: Margin.m_234xs,
  },
  ml57: {
    marginLeft: Margin.m_101xl,
  },
  mt_26_39: {
    marginTop: Margin.m_141xs,
  },
  ml53: {
    marginLeft: Margin.m_93xl,
  },
  groupChildLayout: {
    borderRadius: Border.br_5xl,
    position: "absolute",
    backgroundColor: Color.lightgreen,
  },
  turnOnNotificationsChild: {
    width: 7,
    height: 7,
  },
  path524Icon: {
    width: 11,
    height: 11,
  },
  turnOnNotificationsInner: {
    width: 414,
    height: 896,
    backgroundColor: Color.lightgreen,
  },
  path485Icon: {
    width: 241,
    height: 223,
    alignSelf: "flex-end",
  },
  path486Icon: {
    width: 165,
    height: 188,
  },
  groupIcon: {
    width: 170,
    height: 24,
    alignSelf: "flex-end",
  },
  turnOnNotificationsChild1: {
    width: 152,
    height: 56,
  },
  path490Icon: {
    width: 96,
    height: 22,
    opacity: 0,
  },
  path495Icon: {
    width: 90,
    height: 20,
  },
  path497Icon: {
    width: 60,
    height: 19,
  },
  turnOnNotificationsChild2: {
    width: 53,
    height: 48,
  },
  turnOnNotificationsChild3: {
    width: 41,
    height: 35,
  },
  path521Icon: {
    width: 5,
    height: 5,
  },
  paperPlane1Icon: {
    width: 24,
    height: 19,
  },
  rectangleView: {
    borderRadius: Border.br_2xl,
    backgroundColor: Color.white,
    width: 385,
    height: 324,
  },
  turnOnNotifications1: {
    fontSize: FontSize.size_9xl,
    lineHeight: 31,
    fontWeight: "600",
    fontFamily: FontFamily.sourceSansProSemibold,
    textAlign: "center",
    color: Color.darkslategray_200,
  },
  dontMissAppointments: {
    margin: Margin.m_50xs,
  },
  maybeLater1Typo: {
    fontFamily: FontFamily.sourceSansProRegular,
    lineHeight: 19,
    fontSize: FontSize.size_xl,
    textAlign: "center",
    color: Color.darkslategray_200,
  },
  groupChild: {
    right: 15,
    bottom: 0,
    left: 15,
    height: 36,
    opacity: 0,
  },
  turnOn: {
    marginTop: -9,
    marginLeft: -25.5,
    top: "50%",
    left: "50%",
    fontSize: FontSize.size_xs,
    fontWeight: "700",
    fontFamily: FontFamily.sourceSansProBold,
    color: Color.white,
    textAlign: "left",
    position: "absolute",
  },
  turnOnWrapper: {
    top: 0,
    right: 0,
    bottom: 3,
    left: 0,
  },
  rectangleParent: {
    width: 169,
    height: 51,
  },
  notificationBellIcon: {
    width: 384,
    height: 308,
  },
  notificationBellIcon1: {
    width: 309,
    height: 232,
  },
  turnOnNotifications: {
    backgroundColor: Color.gray_100,
    flex: 1,
    width: "100%",
  },
});

export default TurnOnNotifications;
