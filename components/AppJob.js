




import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../src/Common_styles';
import { delete_rating, setCurrentServiceIndex, setServiceStatus } from '../src/redux/user'; // Replace with your actual Redux action creators
import { add_new_rating } from '../src/redux/user';
const AppJob = ({ services,time,setInfo,vendor }) => {
  const ratings = useSelector(state => state.user.existing_rating);
  const dispatch = useDispatch();


  const check=()=>{
  if (!ratings.includes(vendor.id)){
    dispatch(add_new_rating(vendor))
  } 
  }
  
  // Define the target date and time for appointment start
  const appointmentStartTime = new Date(time); // Replace with your desired appointment start time

  useEffect(() => {
//dispatch(delete_rating(vendor.id))
    const updateServiceStatus = () => {
      const currentDate = new Date();
      const minutesPassed = Math.floor((currentDate.getTime() - appointmentStartTime.getTime()) / 60000); // Calculate the minutes passed
      const appointmentDuration = services.reduce((total, service) => total + service.time, 0); // Calculate the total duration of the appointment

      if (minutesPassed < 0) {
        console.log('Appointment not started yet');
      } else if (minutesPassed >= appointmentDuration) {
        setInfo({color: colors.dg2.color,status: 'completed'})
      check()
      } else {
        let serviceIndex = 0;
        let accumulatedTime = 0;

        while (serviceIndex < services.length && accumulatedTime <= minutesPassed) {
          accumulatedTime += services[serviceIndex].time;
          serviceIndex++;
        }

        if (serviceIndex > 0) {
          const ongoingService = services[serviceIndex - 1];
          console.log('Ongoing service:', {color: ongoingService.color,status: 'ongoing'});
          setInfo({color: ongoingService.color,status: 'ongoing'})
        }
      }
    };

    updateServiceStatus();

    const timer = setInterval(updateServiceStatus, 60000); // Check and update the service status every 1 minute (60000 milliseconds)

    return () => {
      clearInterval(timer); // Clear the interval when the component unmounts
    };
  }, []);

  return null;
};

export default AppJob;
