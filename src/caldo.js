import { mergeOptions } from './helper/extralib'
import { getDateInfo, isAllDay, isSameDay,
  subtractOneDay, getFormattedDate,
} from './helper/datelib'


//Get all necessary data (dates, location, summary, description) and creates a list item
function transformationList (result, tagName, format) {
  var
    dateStart = getDateInfo(result.start.dateTime || result.start.date),
    dateEnd = getDateInfo(result.end.dateTime || result.end.date),
    dayNames = true // config.dayNames,
    moreDaysEvent = true,
    isAllDayEvent = isAllDay(dateStart, dateEnd);

  if (typeof result.end.date !== 'undefined') {
    dateEnd = subtractOneDay(dateEnd);
  }

  if (isSameDay(dateStart, dateEnd)) {
    moreDaysEvent = false;
  }

  var
    dateFormatted = getFormattedDate(dateStart, dateEnd, dayNames, moreDaysEvent, isAllDayEvent),
    output = '<' + tagName + '>',
    summary = result.summary || '',
    description = result.description || '',
    location = result.location || '',
    i;

  for (i = 0; i < format.length; i++) {
    format[i] = format[i].toString();

    if (format[i] === '*summary*') {
      output = output.concat(`<span class="summary">${summary}</span>`);
    } else if (format[i] === '*date*') {
      output = output.concat(`<span class="date">${dateFormatted}</span>`);
    } else if (format[i] === '*description*') {
      output = output.concat(`<span class="description">${description}</span>`);
    } else if (format[i] === '*location*') {
      output = output.concat(`<span class="location">${location}</span>`);
    } else {
      if ((format[i + 1] === '*location*' && location !== '') ||
        (format[i + 1] === '*summary*' && summary !== '') ||
        (format[i + 1] === '*date*' && dateFormatted !== '') ||
        (format[i + 1] === '*description*' && description !== '')) {

        output = output.concat(format[i]);
      }
    }
  }

  return output + '</' + tagName + '>';
}


function renderList (data, settings) {
  var result = [];

  //Remove cancelled events, sort by date
  result = data.items.filter(
    item => item &&
      item.hasOwnProperty('status') &&
      item.status !== 'cancelled'
  ).sort(comp).reverse();

  var
    pastCounter = 0,
    pastResult = [],
    upcomingCounter = 0,
    upcomingResult = [],
    upcomingResultTemp = [],
    i;

  var
    upcomingElem = document.querySelector(settings.upcomingSelector),
    pastElem = document.querySelector(settings.pastSelector)

  if (settings.pastTopN === -1) {
    settings.pastTopN = result.length;
  }
  if (settings.past === false) {
    settings.pastTopN = 0;
  }

  if (settings.upcomingTopN === -1) {
    settings.upcomingTopN = result.length;
  }
  if (settings.upcoming === false) {
    settings.upcomingTopN = 0;
  }

  for (i in result) {
    if (isPast(result[i].end.dateTime || result[i].end.date)) {
      if (pastCounter < settings.pastTopN) {
        pastResult.push(result[i]);
        pastCounter++;
      }
    } else {
      upcomingResultTemp.push(result[i]);
    }
  }

  upcomingResultTemp.reverse();

  for (i in upcomingResultTemp) {
    if (upcomingCounter < settings.upcomingTopN) {
      upcomingResult.push(upcomingResultTemp[i]);
      upcomingCounter++;
    }
  }
  for (i in pastResult) {
    pastElem.insertAdjacentHTML('beforeend',
      transformationList(pastResult[i], settings.itemsTagName, settings.format)
    )
  }
  for (i in upcomingResult) {
    upcomingElem.insertAdjacentHTML('beforeend',
      transformationList(upcomingResult[i], settings.itemsTagName, settings.format)
    );
  }
  if (upcomingElem.firstChild) {
    upcomingElem.insertAdjacentHTML('beforebegin',
      settings.upcomingHeading
    );
  }
  if (pastElem.firstChild) {
    pastElem.insertAdjacentHTML('beforebegin',
      settings.pastHeading
    );
  }
}


//Gets JSON from Google Calendar and transfroms it into html list items and appends it to past or upcoming events list
function makereq (calendarUrl, recurringEvents, timeMin, timeMax) {
  var finalURL = calendarUrl;
  if (recurringEvents) {
    finalURL = finalURL.concat('&singleEvents=true&orderBy=starttime');
  }
  if (timeMin) {
    finalURL = finalURL.concat('&timeMin=' + settings.timeMin);
  };
  if (timeMax) {
    finalURL = finalURL.concat('&timeMax=' + settings.timeMax);
  };
  return finalURL;
}

//Get JSON, parse it, transform into list items and append it to past or upcoming events list
function fetchreq(calurl) {
  var request = new XMLHttpRequest();
  request.open('GET', calurl, true);
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      return data
    } else {
      console.error(err);
    }
  };
  request.onerror = () => {
    console.error(err);
  };
  request.send();
}

//Gets JSON from Google Calendar and transfroms it into html list items and appends it to past or upcoming events list
function init (settings) {
  //config = settings;
  var finalURL = makereq(
    settings.calendarUrl,
    settings.recurringEvents, // true
    settings.timeMin,         // undefined
    settings.timeMax,         // undefined
  )
  var data = fetchreq(finalURL)

  renderList(data, settings);
}

/**
 * Format Google Calendar JSON output into human readable list
 *
 * Copyright 2017, Milan Lund
 *
 */

export default
function (settingsOverride) {
  var settings = {
    calendarUrl: 'https://www.googleapis.com/calendar/v3/calendars/milan.kacurak@gmail.com/events?key=AIzaSyCR3-ptjHE-_douJsn8o20oRwkxt-zHStY',
/////////////////////
    timeMin: undefined,
    timeMax: undefined,
    recurringEvents: true,
    past: true,
    upcoming: true,
    sameDayTimes: true,
    dayNames: true,
    pastTopN: -1,
    upcomingTopN: -1,
////////////////////
    format: [
      '*date*',
      ': ',
      '*summary*',
      ' &mdash; ',
      '*description*',
      ' in ',
      '*location*',
    ],
    upcomingSelector: '#events-upcoming',
    upcomingHeading: '<h2>Upcoming events</h2>',
    pastSelector: '#events-past',
    pastHeading: '<h2>Past events</h2>',
    itemsTagName: 'li',
  };

  settings = mergeOptions(settings, settingsOverride);
return settings
//  init(settings);
}

