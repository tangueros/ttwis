function calculateDate (dateInfo, amount) {
  var date = getDateFormatted(dateInfo);
  date.setTime(date.getTime() + amount);
  return getDateInfo(date);
}

//Add one day
function addOneDay (dateInfo) {
  return calculateDate(dateInfo, 86400000)
}

//Subtract one day
export function subtractOneDay (dateInfo) {
  return calculateDate(dateInfo, -86400000)
}

//Subtract one minute
function subtractOneMinute (dateInfo) {
  return calculateDate(dateInfo, -60000)
}

//Compare dates
export function comp (a, b) {
  return
  new Date(
    a.start.dateTime || a.start.date
  ).getTime()
  -
  new Date(
    b.start.dateTime || b.start.date
  ).getTime()
}

export function isSameDay (dateStart, dateEnd) {
  var isSame = true;
  for (var i = 0; i < 3; i++) {
    if (dateStart[i] !== dateEnd[i]) {
      isSame = false;
    }
  }
  return isSame;
}

export function isAllDay (dateStart, dateEnd) {
  var dateEndTemp = subtractOneDay(dateEnd);
  var isAll = true;
  for (var i = 0; i < 3; i++) {
    if (dateStart[i] !== dateEndTemp[i]) {
      isAll = false;
    }
  }
  return isAll;
}

//Check if date is later then now
export function isPast (date) {
  var compareDate = new Date(date),
      now = new Date();
  if (now.getTime() > compareDate.getTime()) {
    return true;
  }
  return false;
}

//Get month name according to index
function getMonthName (month) {
  var monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  return monthNames[month];
}

function getDayName (day) {
  var dayNames = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday'
  ];
  return dayNames[day];
}

function getDayNameFormatted (dateFormatted) {
  return getDayName(getDateFormatted(dateFormatted).getDay()) + ' ';
}

function getDateFormatted (dateInfo) {
  return new Date(
    dateInfo[2],
    dateInfo[1],
    dateInfo[0],
    dateInfo[3],
    dateInfo[4] + 0,
    0
  );
}

//Get temp array with information abou day in followin format: [day number, month number, year, hours, minutes]
export function getDateInfo (date) {
  date = new Date(date);
  return [
    date.getDate(),
    date.getMonth(),
    date.getFullYear(),
    date.getHours(),
    date.getMinutes(),
    0, 0];
}

//Transformations for formatting date into human readable format
function formatDateSameDay (dateStart, dateEnd, dayNames, moreDaysEvent, isAllDayEvent) {
  var formattedTime = '',
    dayNameStart = '';
  if (dayNames) {
    dayNameStart = getDayNameFormatted(dateStart);
  }
  if (config.sameDayTimes && !moreDaysEvent && !isAllDayEvent) {
    formattedTime = ' from ' + getFormattedTime(dateStart) + ' - ' + getFormattedTime(dateEnd);
  }
  //month day, year time-time
  return
    dayNameStart + getMonthName(dateStart[1]) + ' ' +
    dateStart[0] + ', ' + dateStart[2] + formattedTime;
}

function formatDateOneDay (dateStart, dayNames) {
  var dayName = '';
  if (dayNames) {
    dayName = getDayNameFormatted(dateStart);
  }
  //month day, year
  return
    dayName + getMonthName(dateStart[1]) + ' ' +
    dateStart[0] + ', ' + dateStart[2];
}

function formatDateDifferentDay (dateStart, dateEnd, dayNames) {
  var dayNameStart = '',
    dayNameEnd = '';
  if (dayNames) {
    dayNameStart = getDayNameFormatted(dateStart);
    dayNameEnd = getDayNameFormatted(dateEnd);
  }
  //month day-day, year
  return
    dayNameStart + getMonthName(dateStart[1]) + ' ' +
    dateStart[0] + '-' + dayNameEnd + dateEnd[0] + ', ' +
    dateStart[2];
}

function formatDateDifferentMonth (dateStart, dateEnd, dayNames) {
  var dayNameStart = '',
      dayNameEnd = '';
  if (dayNames) {
    dayNameStart = getDayNameFormatted(dateStart);
    dayNameEnd = getDayNameFormatted(dateEnd);
  }
  //month day - month day, year
  return
    dayNameStart + getMonthName(dateStart[1]) + ' ' +
    dateStart[0] + '-' +
    dayNameEnd + getMonthName(dateEnd[1]) + ' ' +
    dateEnd[0] + ', ' + dateStart[2];
}

function formatDateDifferentYear (dateStart, dateEnd, dayNames) {
  var dayNameStart = '',
      dayNameEnd = '';
  if (dayNames) {
    dayNameStart = getDayNameFormatted(dateStart);
    dayNameEnd = getDayNameFormatted(dateEnd);
  }
  //month day, year - month day, year
  return
    dayNameStart + getMonthName(dateStart[1]) + ' ' +
    dateStart[0] + ', ' + dateStart[2] + '-' +
    dayNameEnd + getMonthName(dateEnd[1]) + ' ' +
    dateEnd[0] + ', ' + dateEnd[2];
}

//Check differences between dates and format them
export function getFormattedDate (dateStart, dateEnd, dayNames, moreDaysEvent, isAllDayEvent) {
  var formattedDate = '';
  if (dateStart[0] === dateEnd[0]) {
    if (dateStart[1] === dateEnd[1]) {
      if (dateStart[2] === dateEnd[2]) {
        //month day, year
        formattedDate = formatDateSameDay(dateStart, dateEnd, dayNames, moreDaysEvent, isAllDayEvent);
      } else {
        //month day, year - month day, year
        formattedDate = formatDateDifferentYear(dateStart, dateEnd, dayNames);
      }
    } else {
      if (dateStart[2] === dateEnd[2]) {
        //month day - month day, year
          formattedDate = formatDateDifferentMonth(dateStart, dateEnd, dayNames);
        } else {
          //month day, year - month day, year
          formattedDate = formatDateDifferentYear(dateStart, dateEnd, dayNames);
        }
      }
    } else {
      if (dateStart[1] === dateEnd[1]) {
        if (dateStart[2] === dateEnd[2]) {
          //month day-day, year
          formattedDate = formatDateDifferentDay(dateStart, dateEnd, dayNames);
        } else {
          //month day, year - month day, year
          formattedDate = formatDateDifferentYear(dateStart, dateEnd, dayNames);
        }
    } else {
      if (dateStart[2] === dateEnd[2]) {
        //month day - month day, year
        formattedDate = formatDateDifferentMonth(dateStart, dateEnd, dayNames);
      } else {
        //month day, year - month day, year
        formattedDate = formatDateDifferentYear(dateStart, dateEnd, dayNames);
      }
    }
  }
  return formattedDate;
}

function getFormattedTime (date) {
  var formattedTime = '',
      period = 'AM',
      hour = date[3],
      minute = date[4];
  // Handle afternoon.
  if (hour >= 12) {
    period = 'PM';
    if (hour >= 13) {
      hour -= 12;
    }
  }
  // Handle midnight.
  if (hour === 0) {
    hour = 12;
  }
  // Ensure 2-digit minute value.
  minute = (minute < 10 ? '0' : '') + minute;
  // Format time.
  formattedTime = hour + ':' + minute + period;
  return formattedTime;
}
