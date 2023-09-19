
import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Alert } from "react-native";
import { Image, Text, View } from "react-native-animatable";
import { FontFamily } from "../GlobalStyles";
import { AirbnbRating } from "react-native-ratings";
import Emptyfav from "./EmptyFav";
import * as Progress from "react-native-progress";
import NotificationReviewCard from "./NotificationReviewCard";
import EmptyAppoiment from "./Empty_appoitment";
import { colors } from "../src/Common_styles";
import { useGetReviewsQuery } from "../src/redux/authapi";
import axios from "axios";
import { backendURL } from "../src/services/http";

const ReviewCont = ({ data }) => {
  const [reviewData, setReviewData] = useState(null);
  useEffect(() => {
    if (data) {
      console.log(data,'d')
      const ratingsSummary = generateRatingsSummary(data);
      setReviewData(ratingsSummary);
    }
  }, [data]);

  const ratings =(input)=> 
  Object.keys(input)
  .filter(key => key !== 'total_ratings') // exclude 'total_ratings' key
  .map(key => {
    return {
      rating: parseInt(key),
      value: input[key]
    };
  }).sort((a, b) => b.rating - a.rating);


  function generateRatingsSummary(ratings) {
    
    // Initial template
    let summary = {
      total_ratings: ratings.length,
      ratings: {
        "5": 0,
        "4": 0,
        "3": 0,
        "2": 0,
        "1": 0,
      },
      average_rating: 0.0,
    };

    // Iterate through ratings to populate the summary
    let totalScore = 0;
    for (let i = 0; i < ratings.length; i++) {
      let ratingValue = ratings[i].rating.toString();
      if (summary.ratings[ratingValue] !== undefined) {
        summary.ratings[ratingValue] += 1;
        totalScore += ratings[i].rating;
      }
    }

    // Calculate average rating
    if (ratings.length !== 0) {
      summary.average_rating = parseFloat(
        (totalScore / ratings.length).toFixed(2)
      );
    }

    console.log(summary, "xcxcxc");

    // Return the summary
    return summary;
  }

  return (
    <>
      <View style={styles.cont}>
        <View style={[styles.border, styles.child1]}>
          <Text style={[styles.rating]}>{reviewData?.average_rating}</Text>
          <AirbnbRating
            size={20}
            isDisabled
            type="custom"
            selectedColor="#86D694"
            unSelectedColor="#EFEFEF"
            ratingColor="#86D694"
            showRating={false}
            defaultRating={reviewData?.average_rating}
          />
          <Text style={styles.based}>based on {reviewData?.total_ratings} reviews</Text>
        </View>
        <View style={styles.child1}>
          {reviewData && ratings(reviewData.ratings).map((rate) => {
            return (
              <View
                key={rate.rating}
                style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
              >
                <Text style={styles.t1}>
                  {rate.rating}{'   '}
                  <Image source={require('../assets/star1.png')} />{'   '}
                </Text>
                <Progress.Bar
                  height={2}
                  color="#86D694"
                  borderWidth={1}
                  unfilledColor={rate.value === 0 ? "#EFEFEF" : undefined}
                  borderColor={rate.value === 0 ? "#EFEFEF" : undefined}
                  progress={rate.value}
                  width={75} // Adjust the width to make it slimmer
                />
              </View>
            );
          })}
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <NotificationReviewCard item={item} />}
        ListEmptyComponent={
          <>
            <Image
              style={styles.component44Child}
              resizeMode="cover"
              source={require("../assets/group-2142.png")}
             />
            <Text style={[styles.noAppointments]}>No reviews yet</Text>
          </>
        }
      />
    </>
  );
};

export default ReviewCont;

const styles= StyleSheet.create({
  noAppointments:{
    marginTop:30,
    color:colors.dg.color,
   textAlign:'center',
    fontFamily: FontFamily.sourceSansProRegular,
    fontSize:20
    
  },
  t1:{
    color:'#00463C',
    fontFamily: FontFamily.sourceSansProBold,
    fontSize:15,

  },
    based:{
      marginTop:10,
       color:'#BBB9BC',
       fontFamily: FontFamily.sourceSansProSemibold,
       fontSize:14

    },
    rating:{
        fontFamily:FontFamily.sourceSansProBold,
        fontSize:39,
        color:'#00463C'
    },
    child1:{
        alignItems:'center',
        flex:1,
       
    },
    border:{
        borderRightWidth:1,
        borderRightColor:'#B0EBBD',
    },
   cont:{
    paddingHorizontal:20,
    paddingVertical:40,
    display:'flex',
    flexDirection:'row',
    width: '90%',
    height:188,
    alignSelf: 'center',
    justifyContent: 'space-between',
    shadowColor: '#707070',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 2,
    shadowOffset: {width: 5, height: 0},
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom:20
   } ,
   component44Child: {
 alignSelf:'center',
 marginTop:30
  },
})