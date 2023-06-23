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
  
    if (!vendor.opened) {
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
