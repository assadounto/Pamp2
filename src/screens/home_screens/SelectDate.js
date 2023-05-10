import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Calender from "../../../components/Calender";
import BHeader from "../../../components/BHeader";
import { useDispatch } from "react-redux";
import { set_date } from "../../redux/booking";
let monthNames =[
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
const SelectDate=({navigation})=>{
    let date = new Date()
    console.log(date.getDay(),date.getFullYear(),monthNames[date.getMonth()])
    const dispatch=useDispatch()
    const [option,setOption] =useState({
        day: date.getDay(), month: monthNames[date.getMonth()] , year: date.getFullYear()
    })
    console.log(option)
    dispatch(set_date(option))
    return(
        <SafeAreaView>
            <BHeader title={'Select date & time'}/>
            <Calender  onSelect={(value)=> setOption(value)} navigation={navigation} />
        </SafeAreaView>
    )
}

export default SelectDate