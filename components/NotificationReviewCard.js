import { useTheme } from '@rneui/themed';
import { makeStyles } from '@rneui/themed';
import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FontFamily, FontSize, Color } from "../GlobalStyles";
import { AirbnbRating } from "react-native-ratings";
import { colors } from "../src/Common_styles";
import { horizontalScale } from "../src/Dimensions";

const NotificationReviewCard = ({ item ,index}) => {
  const styles = useStyles();
  const { theme } = useTheme();
  return (
    <View style={[styles.ellipseParent, { borderTopWidth: index===0? 0.5:0,  }]}>
      
      <Image
        style={styles.frameChild}
        resizeMode="cover"
        source={{ uri: item.userimg }}
      />
      <Text style={styles.jessi}>{item.username}</Text>
      <Text style={[styles.july2022, styles.july2022Typo]}>{item.date}</Text>
      <Text
        style={[styles.likkleSalonIs, styles.july2022Typo]}
      >{item.description}</Text>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  july2022Typo: {
    fontFamily: FontFamily.sourceSansProRegular,
    textAlign: "left",
    left: 53,
    flexWrap: 'wrap',
    width: 250,


  },
  frameChild: {
    borderRadius: 50,
    top: 0,
    left: -3,
    width: 48,
    height: 48,
    marginTop:20,
    marginLeft:15,
    position: "absolute",
  },
  jessi: {
    top: 1,
    fontSize: 18,
    width: horizontalScale(150),
    fontFamily: FontFamily.sourceSansProSemibold,
    color: theme.colors.dg,
    textAlign: "left",
    left: 53,

  },
  july2022: {

    fontSize: 10,
    color: theme.colors.lg

  },
  likkleSalonIs: {

    fontSize: 15,
    letterSpacing: 0.8,
    color: theme.colors.dg,
  },
  ellipseParent: {
    flex: 1,
    width: '85%',
  
    borderColor:theme.colors.tabColor,
   
    borderBottomWidth:0.5,
    alignSelf: "center",

    padding:20
  },
}));

export default NotificationReviewCard;
