export function convertMinutesToHoursAndMinutes(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
  
    let hoursString = '';
    let minutesString = '';
  
    if (hours === 1) {
      hoursString = '1 hour';
    } else if (hours > 1) {
      hoursString = `${hours} hours`;
    }
  
    if (remainingMinutes === 1) {
      minutesString = '1 minute';
    } else if (remainingMinutes > 1) {
      minutesString = `${remainingMinutes} mins`;
    }
  
    if (hoursString && minutesString) {
      return `${hoursString} ${minutesString}`;
    } else {
      return `${hoursString}${minutesString}`;
    }
  }
  
  export function modifyItemList(itemList, itemName, addName) {
    const itemIndex = itemList.indexOf(itemName);
  
    if (addName) {
      if (itemIndex === -1) {
        itemList.push(itemName);
      }
    } else {
      if (itemIndex !== -1) {
        itemList.splice(itemIndex, 1);
      }
    }
  
    const itemListLength = itemList.length;
  
    if (itemListLength === 0) {
      return '';
    } else if (itemListLength === 1) {
      return itemList[0];
    } else if (itemListLength === 2) {
      return `${itemList[0]} and ${itemList[1]}`;
    } else {
      return `${itemList.slice(0, -1).join(', ')} and ${itemList[itemListLength - 1]}`;
    }
  }

  export function addMinutesToTime(time, minutesToAdd) {
    // Convert input time to Date object
    const timeDate = new Date(`January 1, 2022 ${time}`);
  
    // Add minutes to the Date object
    timeDate.setMinutes(timeDate.getMinutes() + minutesToAdd);
  
    // Convert Date object back to string in "hh:mm am/pm" format
    const finalTime = timeDate.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  
    return finalTime;
  }
  
  export function getTotalByKey(arr, key) {
    return arr.reduce((total, obj) => obj[key] ? total + obj[key] : total, 0);
  }
 export  const checkVendorStatus = (openingHours) => {
    const currentDate = new Date();
    const currentDay = currentDate.toLocaleString('en-US', { weekday: 'long' });
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
  
    const vendor = openingHours.find((item) => item.day === currentDay);
  
    if (!vendor || !vendor.opening_time || !vendor.closing_time || !vendor.opened) {
      return 'Closed';
    }
  
  
    const openingHour = parseInt(vendor.opening_time.split(':')[0]);
    const openingMinute = parseInt(vendor.opening_time.split(':')[1]);
    const closingHour = parseInt(vendor.closing_time.split(':')[0]);
    const closingMinute = parseInt(vendor.closing_time.split(':')[1]);
  
    if (currentDay === 'Saturday' || currentDay === 'Sunday') {
      return 'Open';
    }
  
    if (
      currentHour > openingHour &&
      currentHour < closingHour
    ) {
      return 'Open';
    } else if (
      currentHour === openingHour &&
      currentMinute >= openingMinute
    ) {
      return 'Open';
    } else if (
      currentHour === closingHour &&
      currentMinute <= closingMinute
    ) {
      return 'Open';
    } else {
      return 'Closed';
    }
  };
  

  export function formatDate(createdDate) {
    const date = new Date(createdDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // January is 0
    const year = date.getFullYear();
  
    // Format day and month with leading zeros if necessary
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    // Create the formatted date string
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
  
    return formattedDate;
  }
  export const generateTimeRange = (openingTime, closingTime) => {
    // Function to format hour and minute values
    const formatHourMinute = (hours, minutes) => {
      const period = hours >= 12 ? "pm" : "am";
      const formattedHours = hours > 12 ? hours - 12 : hours;
      return `${formattedHours}:${minutes.toString().padStart(2, "0")}${period}`;
    };
  
    // Extract hours and minutes from opening and closing times
    const [openingHours, openingMinutes] = openingTime.split(":").map(Number);
    const [closingHours, closingMinutes] = closingTime.split(":").map(Number);
  
    // Format the time range string
    const timeRange = `${formatHourMinute(openingHours, openingMinutes)} - ${formatHourMinute(closingHours, closingMinutes)}`;
  
    return timeRange;
  };

  export function formatDateToAgo(railsCreatedAt) {
    const currentTime = new Date();
    const createdAt = new Date(railsCreatedAt);
    const elapsed = currentTime - createdAt;
  
    const seconds = Math.floor(elapsed / 1000);
    if (seconds < 60) {
      return seconds + "s ago";
    }
  
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return minutes + "m ago";
    }
  
    const hours = Math.floor(minutes / 60);
    return hours + "h ago";
  }


 export const formatDateForRails = (dateObj) => {
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

 export const formatTimeForRails = (timeString) => {
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
  

  const areObjectsEqual = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (const key of keys1) {
      const val1 = obj1[key];
      const val2 = obj2[key];
  
      // Convert values to lowercase for case-insensitive comparison
      const normalizedVal1 = typeof val1 === 'string' ? val1.toLowerCase() : val1;
      const normalizedVal2 = typeof val2 === 'string' ? val2.toLowerCase() : val2;
  
      if (normalizedVal1 !== normalizedVal2) {
        return false;
      }
    }
  
    return true;
  };
  