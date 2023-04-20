import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Calender from "../../../components/Calender";
import BHeader from "../../../components/BHeader";

const SelectDate=({navigation})=>{
    const [option,setOption] =useState({
    })

    const dates=[
        {
            day: 'Tue',
            aday: 11
        },
        {
            day: 'Wed',
            aday: 12
        },
        {
            day: 'Thu',
            aday: 13
        },
        {
            day: 'Fri',
            aday: 14
        },
        {
            day: 'Sat',
            aday: 15
        },

    ]
    const dates2=[
        {
            day: 'Tue',
            aday: 11
        },
        {
            day: 'Wed',
            aday: 12
        },
        {
            day: 'Thu',
            aday: 13
        },
        {
            day: 'Fri',
            aday: 14
        },
        {
            day: 'Sat',
            aday: 15
        },
        {
            day: 'Sun',
            aday: 16
        },
        {
            day: 'Mon',
            aday: 17
        },
        {
            day: 'Tues',
            aday: 18
        },
        {
            day: 'Wed',
            aday: 19
        },
        {
            day: 'Thu',
            aday: 20
        },
        {
            day: 'Fri',
            aday: 21
        },
        {
            day: 'Sat',
            aday: 22
        },
        {
            day: 'Sun',
            aday: 23
        },
        {
            day: 'Mon',
            aday: 24
        },
        {
            day: 'Tue',
            aday: 25
        },
        {
            day: 'Wed',
            aday: 26
        },
        {
            day: 'Thu',
            aday: 27
        },
        {
            day: 'Fri',
            aday: 28
        },
        {
            day: 'Sat',
            aday: 29
        },
        {
            day: 'Sun',
            aday: 30
        },
        
        
        

    ]
    return(
        <SafeAreaView>
            <BHeader title={'Select date & time'}/>
            <Calender data={dates2} onSelect={(value)=> setOption(value)} navigation={navigation} />
        </SafeAreaView>
    )
}

export default SelectDate