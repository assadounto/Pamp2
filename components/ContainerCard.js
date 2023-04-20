import * as React from "react";
import { useMemo } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  ImageSourcePropType,
} from "react-native";
import { FontFamily, Color, Border, FontSize } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};

const ContainerCard = ({
  serviceImageUrl,
  serviceProviderImageUrl,
  serviceTimeText,
  serviceProviderName,
  serviceTypeText,
  serviceTimeRangeText,
  waitingMarginTop,
  next14DaysThur11am1pmBackgroundColor,
  propRight,
}) => {
  const groupView1Style = useMemo(() => {
    return {
      ...getStyleValue("marginTop", waitingMarginTop),
    };
  }, [waitingMarginTop]);

  const rectangleViewStyle = useMemo(() => {
    return {
      ...getStyleValue("backgroundColor", next14DaysThur11am1pmBackgroundColor),
    };
  }, [next14DaysThur11am1pmBackgroundColor]);

  const waitingStyle = useMemo(() => {
    return {
      ...getStyleValue("right", propRight),
    };
  }, [propRight]);

  return (
    <View
      style={[
        styles.path663Parent,
        styles.mt14_259999999999998,
        groupView1Style,
      ]}
    >
      <Image
        style={[styles.path663Icon, styles.groupItemPosition]}
        resizeMode="cover"
        source={serviceImageUrl}
      />
      <Image
        style={[styles.groupChild, styles.groupChildPosition]}
        resizeMode="cover"
        source={serviceProviderImageUrl}
      />
      <View
        style={[styles.groupItem, styles.groupItemPosition, rectangleViewStyle]}
      />
      <Text style={[styles.waiting, styles.waitingTypo, waitingStyle]}>
        {serviceTimeText}
      </Text>
      <Text style={[styles.ashantee, styles.sewInPosition]}>
        {serviceProviderName}
      </Text>
      <Text style={[styles.sewIn, styles.sewInPosition]}>
        {serviceTypeText}
      </Text>
      <Text
        style={[
          styles.next14Days,
          styles.waitingTypo,
          styles.groupChildPosition,
        ]}
      >
        {serviceTimeRangeText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  groupItemPosition: {
    top: 15,
    position: "absolute",
  },
  groupChildPosition: {
    left: "50%",
    marginLeft: -105.5,
  },
  waitingTypo: {
    textAlign: "left",
    fontFamily: FontFamily.sourceSansProSemibold,
    fontWeight: "600",
    top: "50%",
    position: "absolute",
  },
  sewInPosition: {
    color: Color.darkslategray_200,
    textAlign: "left",
    left: "50%",
    position: "absolute",
  },
  path663Icon: {
    left: 15,
    width: 49,
    height: 49,
  },
  groupChild: {
    marginTop: -20,
    width: 9,
    height: 9,
    top: "50%",
    left: "50%",
    position: "absolute",
  },
  groupItem: {
    right: 21,
    borderRadius: Border.br_6xl,
    backgroundColor: Color.silver_300,
    width: 78,
    height: 24,
  },
  waiting: {
    marginTop: -48,
    right: 42,
    fontSize: FontSize.size_6xs,
    color: Color.white,
  },
  ashantee: {
    top: 13,
    fontSize: FontSize.size_xl,
    fontWeight: "700",
    fontFamily: FontFamily.sourceSansProBold,
    color: Color.darkslategray_200,
    marginLeft: -105.5,
  },
  sewIn: {
    marginTop: -27,
    marginLeft: -87.5,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.sourceSansProSemibold,
    fontWeight: "600",
    color: Color.darkslategray_200,
    top: "50%",
  },
  next14Days: {
    marginTop: 6,
    fontSize: FontSize.size_sm,
    color: Color.silver_300,
  },
  path663Parent: {
    borderRadius: Border.br_3xl,
    backgroundColor: Color.white,
    width: 361,
    height: 138,
    alignSelf: "flex-end",
  },
});

export default ContainerCard;
