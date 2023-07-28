import React from "react";
import { StyleSheet ,FlatList} from "react-native";
import { Icon } from "@rneui/base";
import { Image, Text, View, } from "react-native-animatable";
import { FontFamily } from "../GlobalStyles";
import { AirbnbRating} from "react-native-ratings";
import Emptyfav from "./EmptyFav";
import * as Progress from 'react-native-progress';
import NotificationReviewCard from "./NotificationReviewCard";
import EmptyAppoiment from "./Empty_appoitment";
import { colors } from "../src/Common_styles";
const ReviewCont=()=>{
  const rates=[
    {
       rating: 5,
       value: 1.5
    },
    {
      rating: 4,
      value: 0
   },
   {
    rating: 3,
    value: 0
 },
 {
  rating: 2,
  value: 0
},
{
  rating: 1,
  value: 0
}
]
  return(
    <><View style={styles.cont}>
      <View style={[styles.border, styles.child1]}>
        <Text style={[styles.rating]}>5.0</Text>
        <AirbnbRating
        size={20}
          type='custom'
       selectedColor="#86D694"
    ratingBackgroundColor="white"
    ratingColor="#86D694"
    showRating={false}
    defaultRating={5}
          />

        <Text style={styles.based}>based on 0 reviews</Text>
      </View>
      <View style={styles.child1}>
        {rates.map((rate) => {
          return (
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.t1}>
              {rate.rating}{'   '}
              <Image source={require('../assets/star1.png')} />{'   '}
            </Text>
            <Progress.Bar
              height={2}
              color="#86D694"
              borderWidth={1}
              unfilledColor={rate.value === 0 ? '#EFEFEF' : undefined}
              borderColor={rate.value === 0 ? '#EFEFEF' : undefined}
              progress={rate.value}
              width={75} // Adjust the width to make it slimmer
            />
          </View>
          
          );
        })}

      </View>

    </View><FlatList
        data={[]}
        renderItem={({ item }) => <NotificationReviewCard />}
        ListEmptyComponent={<><Image
          style={styles.component44Child}
          resizeMode="cover"
          source={require("../assets/group-2142.png")} />
          <Text style={[styles.noAppointments]}>
            No reviews yet
          </Text></>
      }
        /></>
  )
}

export default ReviewCont

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