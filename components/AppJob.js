import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../src/Common_styles';
import { setCurrentServiceIndex, setServiceStatus } from '../src/redux/user'; // Replace with your actual Redux action creators

const AppJob = ({ services,time,setInfo }) => {
  const currentServiceIndex = useSelector(state => state.user.currentServiceIndex);
  const serviceStatus = useSelector(state => state.user.serviceStatus);
  const dispatch = useDispatch();

  // Define the target date and time for appointment start
  const appointmentStartTime = new Date(time); // Replace with your desired appointment start time

  useEffect(() => {
    const updateServiceStatus = () => {
      const currentDate = new Date();
      const minutesPassed = Math.floor((currentDate.getTime() - appointmentStartTime.getTime()) / 60000); // Calculate the minutes passed
      const appointmentDuration = services.reduce((total, service) => total + service.time, 0); // Calculate the total duration of the appointment

      if (minutesPassed < 0) {
        console.log('Appointment not started yet');
      } else if (minutesPassed >= appointmentDuration) {
       // setInfo({color: colors.dg.color,status: 'completed'})
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
