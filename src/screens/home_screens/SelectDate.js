import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Calender from "../../../components/Calender";
import BHeader from "../../../components/BHeader";
import { useDispatch } from "react-redux";
import booking, { set_date } from "../../redux/booking";
import Blur from "../start_screens/Blur";
import Pop2 from "../start_screens/pop2";
import axios from "axios";
import { setbooking,setVendor,setvendorname,setvendorid  } from '../../redux/booking'
import { backendURL } from "../../services/http";
let monthNames =[
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
const SelectDate=({navigation,route})=>{
  const {rebooked,id,vendor}= route.params
 
    const formatDateForRails = (dateObj) => {
        const { day, month, year } = dateObj;
        
        // Convert month name to a numerical value
        const monthMap = {
          January: "01",
          February: "02",
          March: "03",
          April: "04",
          May: "05",
          June: "06",
          July: "07",
          August: "08",
          September: "09",
          October: "10",
          November: "11",
          December: "12"
        };
        
        // Format the date string in 'YYYY-MM-DD' format
        const formattedDate = `${year}-${monthMap[month]}-${day.toString().padStart(2, "0")}`;
        
        return formattedDate;
      };
    
      const formatTimeForRails = (timeString,dates) => {
        const currentDate = new Date(dates);
        const [hours, minutes] = timeString.split(':');
        
        currentDate.setHours(hours);
        currentDate.setMinutes(minutes);
      
        return currentDate.toISOString();
      };

    let date = new Date()
   
    const dispatch=useDispatch()
    const [option,setOption] =useState({
        day: date.getDate(), month: monthNames[date.getMonth()] , year: date.getFullYear()
    })

    dispatch(set_date(option))
    const [modal,setModal]= useState(false)
   const rebook=async(item)=>{
    let items = {
        date: formatDateForRails(option),
        time: formatTimeForRails(item.split(' ')[0],formatDateForRails(option)),
        booking_id: id,
        status: 'booked'
    }
    let {data}= await axios.patch(`${backendURL}/booking`,items)
     if (data.status=='ok'){
        setModal(true)
        setTimeout(() => {
          setModal(false);
           navigation.push('main');
        }, 3000);
     }
    console.log(data.status)
  
   }
    return(
        <><SafeAreaView>
            <BHeader title={'Select date & time'} />
            <Calender rebook={rebook} rebooked={rebooked} onSelect={(value) => setOption(value)} navigation={navigation} />
        </SafeAreaView>
        <Pop2 main={'Sucessfully rebooked appointment'} modal={modal}/>
        {
          modal&&   <Blur/>
        }
       
        </>
    )
}

export default SelectDate