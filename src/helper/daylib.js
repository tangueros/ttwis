import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import isoWeek from 'dayjs/plugin/isoWeek'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(advancedFormat)
dayjs.extend(localizedFormat)
dayjs.extend(isoWeek)
dayjs.extend(isLeapYear)
dayjs.extend(isoWeeksInYear)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)

export const day = dayjs
// Dow = 'ddd'
const nicedatef = 'D-MMM-YYYY'
const nicetimef = 'h:mma'

export function nicedate(d) {
  const dd = dayjs(d)
  return dd.format(nicedatef)
}

export function nicetime(d) {
  const dd = dayjs(d)
  return dd.format(nicetimef)
}


