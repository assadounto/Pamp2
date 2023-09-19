import React from "react"
import { SafeAreaView } from "react-native"
import { Text } from "react-native-animatable"
import BHeader from "../../../components/BHeader"
import ReviewCont from "../../../components/ReviewCont"
import ReviewContainer from "../../../components/ReviewContainer"

const Ratings=({route})=>{
    const {data}= route.params
    console.log(data,'m')
    return( 
        <SafeAreaView>
               <BHeader title="Rating and reviews" color={'#86D694'}/>
              <ReviewCont data={data}/>
        </SafeAreaView>
       
    )
}

export default Ratings