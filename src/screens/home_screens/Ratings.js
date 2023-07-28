import React from "react"
import { SafeAreaView } from "react-native"
import { Text } from "react-native-animatable"
import BHeader from "../../../components/BHeader"
import ReviewCont from "../../../components/ReviewCont"
import ReviewContainer from "../../../components/ReviewContainer"

const Ratings=()=>{
    return( 
        <SafeAreaView>
               <BHeader title="Rating and reviews"/>
              <ReviewCont/>
        </SafeAreaView>
       
    )
}

export default Ratings