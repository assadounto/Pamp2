import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FontFamily, FontSize, Color } from "../GlobalStyles";
import { AirbnbRating } from "react-native-ratings";
import { colors } from "../src/Common_styles";
import { horizontalScale } from "../src/Dimensions";

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
        source={{uri: item.userimg}}
      />
      <Text style={styles.jessi}>{item.username}</Text>
      <Text style={[styles.july2022, styles.july2022Typo]}>{item.date}</Text>
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
    fontSize: 18,
    width: horizontalScale(150),
    fontFamily: FontFamily.sourceSansProSemibold,
    color: colors.dg.color,
    textAlign: "left",
    left: 53,

  },
  july2022: {

    fontSize: 10,
    color:colors.dg2.color
    
  },
  likkleSalonIs: {
  
    fontSize: 15,
    letterSpacing: 0.8,
    color: Color.gray_200,
  },
  ellipseParent: {
     flex:1,
    width: '85%',
    alignSelf: "center",
    marginTop: 20,
  },
});

export default NotificationReviewCard;
