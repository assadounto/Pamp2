import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Color, FontFamily, FontSize, Border, Margin } from "../GlobalStyles";

const LikkleSalonContainer = () => {
  return (
    <View
      style={[
        styles.rectangleParent,
        styles.starIconPosition,
        styles.likkleSalonPosition,
      ]}
    >
      <Image
        style={styles.groupChild}
        resizeMode="cover"
        source={require("../assets/rectangle-1005.png")}
      />
      <View style={styles.likkleSalonParent}>
        <Text
          style={[
            styles.likkleSalon,
            styles.textFlexBox,
            styles.starIconPosition,
            styles.likkleSalonPosition,
          ]}
        >
          Likkle salon
        </Text>
        <Text
          style={[
            styles.airportResidentialRoadContainer,
            styles.kmTypo,
            styles.starIconPosition,
          ]}
        >
          <Text style={styles.airportResidentialRoad}>
            Airport Residential Road,
          </Text>
          <Text style={styles.airportResidentialRoad}> Hill St</Text>
        </Text>
        <Image
          style={[styles.groupItem, styles.kmPosition]}
          resizeMode="cover"
          source={require("../assets/group-1827.png")}
        />
        <Image
          style={[styles.starIcon, styles.starIconPosition]}
          resizeMode="cover"
          source={require("../assets/star10.png")}
        />
        <Text style={[styles.text, styles.kmPosition, styles.textFlexBox]}>
          4.5
        </Text>
        <Text style={[styles.km, styles.kmPosition, styles.kmTypo]}>
          2.3 km
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  starIconPosition: {
    left: 0,
    position: "absolute",
  },
  likkleSalonPosition: {
    top: 0,
    left: 0,
  },
  textFlexBox: {
    textAlign: "left",
    color: Color.darkslategray_200,
  },
  kmTypo: {
    fontFamily: FontFamily.sourceSansProRegular,
    fontSize: FontSize.size_3xs,
    textAlign: "left",
    color: Color.darkslategray_200,
  },
  kmPosition: {
    left: "50%",
    position: "absolute",
  },
  groupChild: {
    top: 13,
    bottom: 12,
    left: 16,
    borderRadius: Border.br_2xs,
    maxHeight: "100%",
    width: 110,
    position: "absolute",
  },
  likkleSalon: {
    fontSize: FontSize.size_sm,
    fontWeight: "600",
    fontFamily: FontFamily.sourceSansProSemibold,
  },
  airportResidentialRoad: {
    margin: Margin.m_50xs,
  },
  airportResidentialRoadContainer: {
    marginTop: -19.5,
    top: "50%",
  },
  groupItem: {
    marginLeft: -8.56,
    bottom: 6,
    width: 9,
    height: 11,
  },
  starIcon: {
    bottom: 5,
    width: 13,
    height: 12,
  },
  text: {
    marginLeft: -46.44,
    fontSize: FontSize.size_2xs,
    fontWeight: "700",
    fontFamily: FontFamily.sourceSansProBold,
    bottom: 0,
  },
  km: {
    marginLeft: 8.56,
    bottom: 2,
  },
  likkleSalonParent: {
    right: 43,
    bottom: 19,
    width: 135,
    height: 93,
    position: "absolute",
  },
  rectangleParent: {
    right: 0,
    borderRadius: Border.br_2xl,
    backgroundColor: Color.white,
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 16,
    elevation: 16,
    shadowOpacity: 1,
    bottom: 0,
  },
});

export default LikkleSalonContainer;
