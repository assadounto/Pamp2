import * as React from "react";
import { useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageSourcePropType,
} from "react-native";
import { FontSize, Border, Color, FontFamily, Margin } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};

const ReviewContainer = ({ carImageUrl, propMarginTop }) => {
  const groupView5Style = useMemo(() => {
    return {
      ...getStyleValue("marginTop", propMarginTop),
    };
  }, [propMarginTop]);

  return (
    <View style={[styles.rectangleParent, styles.mt_219, groupView5Style]}>
      <View style={styles.groupChild} />
      <View style={styles.groupItem} />
      <Text style={styles.dAgo}>2d ago</Text>
      <View style={[styles.leaveAReviewWrapper, styles.leavePosition]}>
        <Text style={[styles.leaveAReview, styles.leavePosition]}>
          Leave a review
        </Text>
      </View>
      <Image
        style={styles.groupInner}
        resizeMode="cover"
        source={require("../assets/ellipse-62.png")}
      />
      <Text style={[styles.youCompletedAContainer, styles.tellUsAboutPosition]}>
        <Text
          style={styles.youCompletedA}
        >{`You completed a booking yesterday `}</Text>
        <Text style={styles.youCompletedA}>with Likkle salon</Text>
      </Text>
      <Text style={[styles.tellUsAbout, styles.tellUsAboutPosition]}>
        Tell us about your experience
      </Text>
      <Image style={styles.chatIcon} resizeMode="cover" source={carImageUrl} />
    </View>
  );
};

const styles = StyleSheet.create({
  leavePosition: {
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  tellUsAboutPosition: {
    fontSize: FontSize.size_4xs,
    marginLeft: -111,
    left: "50%",
    textAlign: "left",
    position: "absolute",
  },
  groupChild: {
    top: 9,
    right: 6,
    bottom: 0,
    left: 6,
    borderRadius: Border.br_lg,
    backgroundColor: Color.gray_500,
    position: "absolute",
  },
  groupItem: {
    top: 0,
    right: 0,
    bottom: 11,
    left: 0,
    borderRadius: Border.br_2xl,
    backgroundColor: Color.white,
    position: "absolute",
  },
  dAgo: {
    right: 18,
    fontSize: FontSize.size_6xs,
    textAlign: "left",
    color: Color.silver_300,
    fontFamily: FontFamily.sourceSansProSemibold,
    fontWeight: "600",
    top: 22,
    position: "absolute",
  },
  leaveAReview: {
    marginTop: -8,
    marginLeft: -43,
    fontSize: FontSize.size_3xs,
    fontWeight: "700",
    fontFamily: FontFamily.sourceSansProBold,
    color: Color.white,
    textAlign: "left",
  },
  leaveAReviewWrapper: {
    marginTop: 17,
    marginLeft: -123,
    borderRadius: Border.br_3xs,
    backgroundColor: Color.lightgreen,
    width: 248,
    height: 38,
  },
  groupInner: {
    left: 59,
    width: 9,
    height: 9,
    top: 22,
    position: "absolute",
  },
  youCompletedA: {
    margin: Margin.m_50xs,
  },
  youCompletedAContainer: {
    top: 19,
    color: Color.darkslategray_200,
    marginLeft: -111,
    fontFamily: FontFamily.sourceSansProSemibold,
    fontWeight: "600",
  },
  tellUsAbout: {
    marginTop: -23,
    fontFamily: FontFamily.sourceSansProRegular,
    top: "50%",
    marginLeft: -111,
    color: Color.silver_300,
  },
  chatIcon: {
    top: 23,
    left: 25,
    width: 22,
    height: 22,
    position: "absolute",
  },
  rectangleParent: {
    width: 372,
    height: 166,
    alignSelf: "center",
  },
});

export default ReviewContainer;
