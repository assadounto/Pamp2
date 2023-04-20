import * as React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Margin,
  Border,
  FontSize,
  Color,
  FontFamily,
  Padding,
} from "../GlobalStyles";

const Search2 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.search2}>
      <View style={[styles.search2Child, styles.mt_12, styles.ml1]} />
      <View
        style={[
          styles.search2Item,
          styles.mt57_58,
          styles.ml1,
          styles.search2ChildBorder,
        ]}
      />
      <View
        style={[
          styles.search2Inner,
          styles.mt14_579999999999998,
          styles.ml1,
          styles.search2ChildBorder,
        ]}
      />
      <View
        style={[
          styles.rectangleView,
          styles.mt_40_42,
          styles.ml160,
          styles.search2ChildBorder,
        ]}
      />
      <View
        style={[
          styles.search2Child1,
          styles.mt_40_42,
          styles.ml179,
          styles.search2ChildBorder,
        ]}
      />
      <View
        style={[
          styles.search2Child2,
          styles.mt20_58,
          styles.ml1,
          styles.search2ChildBorder,
        ]}
      />
      <View
        style={[
          styles.search2Child2,
          styles.mt_40_42,
          styles.ml115,
          styles.search2ChildBorder,
        ]}
      />
      <Text
        style={[
          styles.moreTypo,
          styles.mt_23_42,
          styles.ml41,
          styles.moreTypo1,
        ]}
      >
        All categories
      </Text>
      <Text style={[styles.moreTypo1, styles.mt_31_42, styles.ml19]}>
        Hair Salon
      </Text>
      <Text
        style={[styles.moreTypo1, styles.mt_31_42, styles.ml18]}
      >{`Eyebrows & Lashes`}</Text>
      <Text style={[styles.moreTypo1, styles.mt_31_42, styles.ml177]}>
        Beauty Salon
      </Text>
      <Text style={[styles.moreTypo1, styles.mt_24_42, styles.ml134]}>
        Nail Salon
      </Text>
      <Text style={[styles.moreTypo1, styles.mt_24_42, styles.ml198]}>
        Massage
      </Text>
      <Pressable
        style={[
          styles.rectanglePressable,
          styles.mt32_58,
          styles.search2Child4Layout,
        ]}
        onPress={() => navigation.navigate("HomePage")}
      />
      <View
        style={[
          styles.search2Child4,
          styles.mt32_58,
          styles.search2Child4Layout,
        ]}
      />
      <Text
        style={[
          styles.searchForA,
          styles.mt_41_42,
          styles.ml61,
          styles.searchForATypo,
        ]}
      >
        Search for a service or venue
      </Text>
      <Text
        style={[
          styles.airportResidentialRoad,
          styles.mt_41_42,
          styles.ml61,
          styles.moreTypo,
        ]}
      >
        Airport Residential Road, Accra
      </Text>
      <Image
        style={[styles.groupIcon, styles.mt_21_42, styles.ml27]}
        resizeMode="cover"
        source={require("../assets/group-512.png")}
      />
      <Pressable
        style={[styles.chevronRight, styles.mt_21_42, styles.ml27]}
        onPress={() => navigation.navigate("HomePage")}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/chevronright18.png")}
        />
      </Pressable>
      <Image
        style={[styles.ellipseIcon, styles.mt_20_42, styles.ml306]}
        resizeMode="cover"
        source={require("../assets/ellipse-124.png")}
      />
      <Image
        style={[styles.xIcon, styles.mt_13_420000000000002, styles.ml311]}
        resizeMode="cover"
        source={require("../assets/x.png")}
      />
      <Image
        style={[styles.starIcon, styles.mt_21_42, styles.ml16]}
        resizeMode="cover"
        source={require("../assets/star7.png")}
      />
      <Text
        style={[
          styles.recentSearches,
          styles.mt35_58,
          styles.ml1,
          styles.searchForATypo,
        ]}
      >
        Recent Searches
      </Text>
      <Image
        style={[styles.searchIcon, styles.mt_22_42, styles.ml20]}
        resizeMode="cover"
        source={require("../assets/search1.png")}
      />
      <Text style={[styles.moreTypo1, styles.mt_39_42, styles.ml78]}>
        All categories
      </Text>
      <Pressable
        style={[
          styles.moreWrapper,
          styles.mt14_579999999999998,
          styles.ml1,
          styles.search2ChildBorder,
        ]}
        onPress={() => navigation.navigate("Search3")}
      >
        <Text style={[styles.more, styles.moreTypo, styles.moreTypo1]}>
          +11 more
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  mt_12: {
    marginTop: -12,
  },
  ml1: {
    marginLeft: Margin.m_42xs,
  },
  mt57_58: {
    marginTop: 57.58,
  },
  mt14_579999999999998: {
    marginTop: Margin.m_2xs,
  },
  mt_40_42: {
    marginTop: Margin.m_174xs,
  },
  ml160: {
    marginLeft: Margin.m_166xl,
  },
  ml179: {
    marginLeft: Margin.m_177xl,
  },
  mt20_58: {
    marginTop: Margin.m_17xl,
  },
  ml115: {
    marginLeft: Margin.m_147xl,
  },
  mt_23_42: {
    marginTop: Margin.m_128xs,
  },
  ml41: {
    marginLeft: Margin.m_73xl,
  },
  mt_31_42: {
    marginTop: Margin.m_154xs,
  },
  ml19: {
    marginLeft: Margin.m_12xl,
  },
  ml18: {
    marginLeft: Margin.m_10xl,
  },
  ml177: {
    marginLeft: Margin.m_176xl,
  },
  mt_24_42: {
    marginTop: Margin.m_136xs,
  },
  ml134: {
    marginLeft: Margin.m_154xl,
  },
  ml198: {
    marginLeft: Margin.m_186xl,
  },
  mt32_58: {
    marginTop: Margin.m_51xl,
  },
  mt_41_42: {
    marginTop: Margin.m_175xs,
  },
  ml61: {
    marginLeft: Margin.m_108xl,
  },
  mt_21_42: {
    marginTop: Margin.m_114xs,
  },
  ml27: {
    marginLeft: Margin.m_33xl,
  },
  mt_20_42: {
    marginTop: Margin.m_109xs,
  },
  ml306: {
    marginLeft: Margin.m_220xl,
  },
  mt_13_420000000000002: {
    marginTop: Margin.m_85xs,
  },
  ml311: {
    marginLeft: Margin.m_222xl,
  },
  ml16: {
    marginLeft: Margin.m_xl,
  },
  mt35_58: {
    marginTop: 35.58,
  },
  mt_22_42: {
    marginTop: Margin.m_122xs,
  },
  ml20: {
    marginLeft: Margin.m_15xl,
  },
  mt_39_42: {
    marginTop: Margin.m_169xs,
  },
  ml78: {
    marginLeft: Margin.m_121xl,
  },
  search2ChildBorder: {
    height: 40,
    borderWidth: 1,
    borderColor: "#86d694",
    borderStyle: "solid",
    borderRadius: Border.br_6xl,
  },
  moreTypo1: {
    fontSize: FontSize.size_base,
    color: Color.black,
    fontFamily: FontFamily.sourceSansProRegular,
  },
  search2Child4Layout: {
    height: 63,
    width: 344,
    borderRadius: Border.br_3xl,
  },
  searchForATypo: {
    fontFamily: FontFamily.sourceSansProSemibold,
    fontWeight: "600",
    textAlign: "left",
  },
  moreTypo: {
    textAlign: "left",
    color: Color.black,
    fontFamily: FontFamily.sourceSansProRegular,
  },
  search2Child: {
    borderRadius: Border.br_md,
    backgroundColor: Color.darkseagreen_100,
    width: 56,
    height: 56,
  },
  search2Item: {
    width: 152,
  },
  search2Inner: {
    width: 169,
  },
  rectangleView: {
    width: 128,
  },
  search2Child1: {
    width: 98,
  },
  search2Child2: {
    width: 109,
  },
  rectanglePressable: {
    backgroundColor: Color.whitesmoke_100,
  },
  search2Child4: {
    backgroundColor: Color.whitesmoke_500,
  },
  searchForA: {
    color: Color.silver_100,
    fontSize: FontSize.size_xs,
  },
  airportResidentialRoad: {
    fontSize: FontSize.size_xs,
  },
  groupIcon: {
    height: 21,
    width: 18,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  chevronRight: {
    width: 11,
    height: 19,
  },
  ellipseIcon: {
    height: 18,
    opacity: 0,
    width: 18,
  },
  xIcon: {
    width: 12,
    height: 12,
  },
  starIcon: {
    width: 15,
    height: 14,
  },
  recentSearches: {
    fontSize: FontSize.size_5xl,
    color: Color.lightgreen,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  more: {
    position: "absolute",
    marginTop: -11,
    top: "50%",
    left: 12,
  },
  moreWrapper: {
    width: 90,
  },
  search2: {
    backgroundColor: Color.white,
    flex: 1,
    paddingLeft: Padding.p_xs,
    paddingTop: Padding.p_4xl,
    paddingRight: Padding.p_xs,
    width: "100%",
  },
});

export default Search2;
