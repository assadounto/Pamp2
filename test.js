const formatTimeForRails = (timeString) => {
  const currentDate = new Date();
  const [hours, minutes, period] = timeString.split(/:|\s/); // Split the time string using a regular expression

  let hourValue = parseInt(hours, 10);

  if (period.toLowerCase() === 'pm' && hourValue !== 12) {
    hourValue += 12; // Convert the hour to 24-hour format for PM times
  } else if (period.toLowerCase() === 'am' && hourValue === 12) {
    hourValue = 0; // Convert 12 AM to 0 (midnight) in 24-hour format
  }

  currentDate.setHours(hourValue);
  currentDate.setMinutes(parseInt(minutes, 10));

  return currentDate.toISOString().slice(11, 19);
};

console.log(formatTimeForRails('6:00 pm'))