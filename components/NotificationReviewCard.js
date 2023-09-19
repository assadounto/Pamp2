import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FontFamily, FontSize, Color } from "../GlobalStyles";
import { AirbnbRating } from "react-native-ratings";
import { colors } from "../src/Common_styles";

const NotificationReviewCard = ({item}) => {
  return (
    <View style={styles.ellipseParent}>
      <View style={{position:'absolute',right:10,transform: [{ scaleX: -1 }]}}>
      <AirbnbRating
            size={20}
            
            isDisabled
            type="custom"
            selectedColor="#86D694"
            unSelectedColor="white"
            ratingColor="#86D694"
            showRating={false}
            defaultRating={item.rating}
            direction="reverse"
          />
      </View>
      <Image
        style={styles.frameChild}
        resizeMode="cover"
        source={{uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}}
      />
      <Text style={styles.jessi}>{item.username}</Text>
      <Text style={[styles.july2022, styles.july2022Typo]}>July 2022</Text>
      <Text
        style={[styles.likkleSalonIs, styles.july2022Typo]}
      >{item.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  july2022Typo: {
    fontFamily: FontFamily.sourceSansProRegular,
    textAlign: "left",
    left: 53,
     flexWrap:'wrap',
    width:300,
    color: colors.dg.color
    
  },
  frameChild: {
    borderRadius:50,
    top: 0,
    left: -3,
    width: 48,
    height: 48,
    position: "absolute",
  },
  jessi: {
    top: 1,
    fontSize: FontSize.size_lg,
    fontWeight: "600",
    fontFamily: FontFamily.sourceSansProSemibold,
    color: Color.darkslategray_300,
    textAlign: "left",
    left: 53,
    position: "absolute",
  },
  july2022: {
    top: 21,
    fontSize: FontSize.size_3xs,
    color: Color.lightgreen,
  },
  likkleSalonIs: {
    marginVertical:30,
    fontSize: FontSize.size_sm,
    letterSpacing: 0.8,
    color: Color.gray_200,
  },
  ellipseParent: {
     flex:1,
    width: '85%',
   
    height: 140,
    alignSelf: "center",
    marginTop: 20,
  },
});

export default NotificationReviewCard;
