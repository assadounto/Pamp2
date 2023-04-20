import * as React from "react";
import { StyleSheet, View, Pressable, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HomeContainer2 from "../components/HomeContainer2";
import { Margin, FontSize, FontFamily, Border, Color } from "../GlobalStyles";

const HomePage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.homePage}>
      <Pressable
        style={[styles.homePageChild, styles.ml36]}
        onPress={() => navigation.navigate("Search")}
      />
      <Pressable
        style={[styles.wrapper, styles.mt24, styles.ml36]}
        onPress={() => navigation.navigate("Profile")}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/ellipse-5.png")}
        />
      </Pressable>
      <Pressable
        style={[styles.bell, styles.mt_23, styles.ml347]}
        onPress={() => navigation.navigate("Notification")}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/bell1.png")}
        />
      </Pressable>
      <Image
        style={[styles.searchIcon, styles.mt_20, styles.ml63]}
        resizeMode="cover"
        source={require("../assets/search.png")}
      />
      <Text
        style={[styles.searchForA, styles.mt_41, styles.ml97, styles.bookTypo]}
      >
        Search for a service
      </Text>
      <Text style={[styles.whatWouldYou, styles.mt_1, styles.ml109]}>
        What would you like to do today?
      </Text>
      <Text
        style={[styles.hiJessi, styles.mt_50, styles.ml110, styles.hiJessiTypo]}
      >
        Hi, Jessi
      </Text>
      <View style={[styles.homePageItem, styles.mt_5, styles.ml326]} />
      <Text style={[styles.book, styles.mt_23, styles.ml333, styles.bookTypo]}>
        BOOK
      </Text>
      <Image
        style={[styles.chevronRightIcon, styles.mt_290, styles.ml_102]}
        resizeMode="cover"
        source={require("../assets/chevronright1.png")}
      />
      <Pressable
        style={[styles.rectangleParent, styles.mt43, styles.ml23]}
        onPress={() => navigation.navigate("HairSalons")}
      >
        <Image
          style={styles.groupChild}
          resizeMode="cover"
          source={require("../assets/rectangle-976.png")}
        />
        <Text style={[styles.hairSalon, styles.hiJessiTypo]}>Hair Salon</Text>
      </Pressable>
      <View style={[styles.rectangleParent, styles.mt297, styles.ml23]}>
        <Image
          style={styles.groupChild}
          resizeMode="cover"
          source={require("../assets/rectangle-9761.png")}
        />
        <Text style={[styles.hairSalon, styles.hiJessiTypo]}>Beauty Salon</Text>
      </View>
      <View style={[styles.rectangleParent, styles.mt220, styles.ml23]}>
        <Image
          style={styles.groupChild}
          resizeMode="cover"
          source={require("../assets/rectangle-9762.png")}
        />
        <Text style={[styles.hairSalon, styles.hiJessiTypo]}>Nail Salon</Text>
      </View>
      <View style={[styles.rectangleParent, styles.mt17, styles.ml23]}>
        <Image
          style={styles.groupChild}
          resizeMode="cover"
          source={require("../assets/rectangle-9763.png")}
        />
        <Text style={[styles.hairSalon, styles.hiJessiTypo]}>Spa</Text>
      </View>
      <View style={[styles.groupParent, styles.mt43, styles.ml36]}>
        <View style={styles.popularWrapper}>
          <Text style={[styles.popular, styles.popularTypo]}>Popular</Text>
        </View>
        <View style={[styles.recentlyViewedWrapper, styles.topWrapperBorder]}>
          <Text style={[styles.recentlyViewed, styles.popularTypo]}>
            Recently viewed
          </Text>
        </View>
        <View
          style={[styles.topRatedHairSalonsWrapper, styles.topWrapperBorder]}
        >
          <Text style={[styles.recentlyViewed, styles.popularTypo]}>
            Top Rated Hair Salons
          </Text>
        </View>
        <View
          style={[styles.topRatedBeautySalonsWrapper, styles.topWrapperBorder]}
        >
          <Text style={[styles.recentlyViewed, styles.popularTypo]}>
            Top Rated Beauty Salons
          </Text>
        </View>
        <View style={[styles.topRatedSpasWrapper, styles.topWrapperBorder]}>
          <Text style={[styles.recentlyViewed, styles.popularTypo]}>
            Top Rated Spas
          </Text>
        </View>
      </View>
      <HomeContainer2 />
    </View>
  );
};

const styles = StyleSheet.create({
  ml36: {
    marginLeft: Margin.m_60xl,
  },
  mt24: {
    marginTop: 24,
  },
  mt_23: {
    marginTop: Margin.m_131xs,
  },
  ml347: {
    marginLeft: Margin.m_240xl,
  },
  mt_20: {
    marginTop: Margin.m_112xs,
  },
  ml63: {
    marginLeft: Margin.m_110xl,
  },
  mt_41: {
    marginTop: Margin.m_176xs,
  },
  ml97: {
    marginLeft: 97,
  },
  mt_1: {
    marginTop: -1,
  },
  ml109: {
    marginLeft: Margin.m_143xl,
  },
  mt_50: {
    marginTop: -50,
  },
  ml110: {
    marginLeft: Margin.m_144xl,
  },
  mt_5: {
    marginTop: Margin.m_67xs,
  },
  ml326: {
    marginLeft: Margin.m_230xl,
  },
  ml333: {
    marginLeft: Margin.m_234xl,
  },
  mt_290: {
    marginTop: -290,
  },
  ml_102: {
    marginLeft: -102,
  },
  mt43: {
    marginTop: Margin.m_77xl,
  },
  ml23: {
    marginLeft: Margin.m_25xl,
  },
  mt297: {
    marginTop: Margin.m_216xl,
  },
  mt220: {
    marginTop: 220,
  },
  mt17: {
    marginTop: Margin.m_4xl,
  },
  mt_331: {
    marginTop: -331,
  },
  bookTypo: {
    textAlign: "left",
    fontSize: FontSize.size_xs,
  },
  hiJessiTypo: {
    fontSize: FontSize.size_4xl,
    textAlign: "left",
    fontFamily: FontFamily.sourceSansProSemibold,
    fontWeight: "600",
  },
  popularTypo: {
    fontFamily: FontFamily.sourceSansProRegular,
    top: "50%",
    marginTop: -8,
    position: "absolute",
    fontSize: FontSize.size_3xs,
    textAlign: "left",
  },
  topWrapperBorder: {
    borderWidth: 1,
    borderColor: "#b0ebbd",
    borderStyle: "solid",
    borderRadius: Border.br_6xl,
    bottom: 0,
    top: 0,
    position: "absolute",
  },
  homePageChild: {
    borderRadius: Border.br_3xl,
    backgroundColor: Color.whitesmoke_200,
    width: 344,
    height: 63,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  wrapper: {
    width: 58,
    height: 58,
  },
  bell: {
    height: 22,
    width: 20,
  },
  searchIcon: {
    height: 20,
    width: 20,
  },
  searchForA: {
    color: Color.silver_100,
    fontFamily: FontFamily.sourceSansProSemibold,
    fontWeight: "600",
    textAlign: "left",
    fontSize: FontSize.size_xs,
  },
  whatWouldYou: {
    opacity: 0,
    fontSize: FontSize.size_3xs,
    textAlign: "left",
    color: Color.silver_100,
    fontFamily: FontFamily.sourceSansProSemibold,
    fontWeight: "600",
  },
  hiJessi: {
    color: Color.lightgreen,
  },
  homePageItem: {
    borderRadius: 9,
    backgroundColor: Color.darkcyan,
    width: 52,
    height: 25,
    opacity: 0,
  },
  book: {
    fontWeight: "700",
    fontFamily: FontFamily.sourceSansProBold,
    color: Color.white,
    opacity: 0,
    textAlign: "left",
    fontSize: FontSize.size_xs,
  },
  chevronRightIcon: {
    width: 15,
    height: 9,
  },
  groupChild: {
    top: 13,
    right: 13,
    left: 14,
    borderRadius: Border.br_lg,
    maxWidth: "100%",
    overflow: "hidden",
    height: 299,
    position: "absolute",
  },
  hairSalon: {
    bottom: 29,
    left: 30,
    color: Color.darkslategray_200,
    position: "absolute",
  },
  rectangleParent: {
    borderRadius: Border.br_2xl,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: {
      width: 0,
      height: 13,
    },
    shadowRadius: 65,
    elevation: 65,
    shadowOpacity: 1,
    width: 369,
    height: 392,
    backgroundColor: Color.white,
  },
  popular: {
    marginLeft: -21.5,
    left: "50%",
    color: Color.white,
  },
  popularWrapper: {
    left: 0,
    backgroundColor: Color.darkseagreen_100,
    width: 85,
    borderRadius: Border.br_6xl,
    bottom: 0,
    top: 0,
    position: "absolute",
  },
  recentlyViewed: {
    left: 13,
    color: Color.darkslategray_200,
  },
  recentlyViewedWrapper: {
    left: 93,
    width: 114,
  },
  topRatedHairSalonsWrapper: {
    marginLeft: -108,
    width: 145,
    left: "50%",
  },
  topRatedBeautySalonsWrapper: {
    marginLeft: 46,
    width: 160,
    left: "50%",
  },
  topRatedSpasWrapper: {
    right: 0,
    width: 109,
  },
  groupParent: {
    width: 648,
    height: 34,
  },
  homePage: {
    flex: 1,
    paddingTop: 70,
    width: "100%",
    backgroundColor: Color.white,
  },
});

export default HomePage;
