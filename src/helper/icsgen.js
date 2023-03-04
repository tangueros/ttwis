// generate ics format file

import { day } from "./daylib"

// name
// location description
// start_date end_date start_time end_time
// is_all_day is_us_format
// repetition_freq repetition_interval is_repeated
// has_alarm alarm_time_value alarm_time_unit

// output =
// create_event_start_string
//
// if (is_all_day) && !(is_us_date)
//   create_all_day_non_us_date
// if !(is_all_day) && !(is_us_date)
//   create_non_all_day_non_us_date
// if (is_all_day) && (is_us_date)
//   create_all_day_us_date
// if !(is_all_day) && (is_us_date)
//   create_non_all_day_us_date
//
// if (is_repeated)
//   create_event_repetition
//
// create_event_name
// create_event_location
// create_event_description
//
// if (has_alarm)
//   create_alarm_string
//
// create_event_end_string


function create_event_start_string () {
  return "BEGIN:VEVENT\n"
}

function create_event_end_string () {
  return "END:VEVENT\n"
}

function create_event_name (name) {
  return "SUMMARY:" + name + "\n"
}

function create_event_location (location) {
  return "LOCATION:" + location + "\n"
}

function create_event_description (desc) {
  var description = desc
  //description.gsub!("\r\n", "\\n")
  return "DESCRIPTION:" + description + "\n"
}

function create_event_repetition (freq, interval) {
  return "RRULE:" + "FREQ=" + freq + ";" +
  "INTERVAL=" + interval + "\n"
}

function create_alarm_string (time_value, time_unit, name) {
  return "BEGIN:VALARM\n" +
    "TRIGGER:-PT" + time_value + time_unit + "\n" +
    "ACTION:DISPLAY\n" +
    "DESCRIPTION:" + name + "\n" +
    "END:VALARM\n"
}

function create_all_day (start_date, end_date) {
  // Input: 31.12.2012 or 12/31/2012
  // Output: 20121231
  return "DTSTART;VALUE=DATE:" +
  day(start_date).format('YYYYMMDD')
  + "\n" +
  "DTEND;VALUE=DATE:" +
  day(end_date).format('YYYYMMDD')
  + "\n"
}

function create_non_all_day (start_date, end_date) {
  // Input: 31.12.2012 13:00 or 12/31/2012 13:00
  // Output: 20121231T130000
  return "DTSTART:" +
  day(start_date).format('YYYYMMDDTHHmm00')
  +"\n" +
  "DTEND:" +
  day(end_date).format('YYYYMMDDTHHmm00')
  + "\n"
}


export function getics (gitem) {
  var output

  output = create_event_start_string()

  output +=
    //is_all_day
    (gitem.start.date)
    ? create_all_day(gitem.start.date, gitem.end.date)
    : create_non_all_day(gitem.start.dateTime, gitem.end.dateTime)

  /* output +=
    is_repeated
    ? create_event_repetition(freq, interval)
  */

  output +=
    create_event_name(gitem.summary)
    + create_event_location(gitem.location)
    + create_event_description(gitem.description)

  /* output +=
    has_alarm
    ? create_alarm_string(time_value, time_unit, gitem.summary)
  */

  output += create_event_end_string()

  return output
}
