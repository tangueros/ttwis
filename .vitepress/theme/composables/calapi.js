import { ref, onMounted, onUnmounted } from 'vue'

const apikey = 'AIzaSyCR3-ptjHE-_douJsn8o20oRwkxt-zHStY'
const myurl = ''
//'milan.kacurak@gmail.com'
//'v8ehau6nv4q3r3pdaf8nvmiqo8@group.calendar.google.com'
//https://jsonplaceholder.typicode.com/posts/1

import { day } from '../../../src/helper/daylib'
import {
  comp, //compare two start dates
  isPast, //date is older than now
} from '../../../src/helper/datelib'

export function inRange(dt) {
  const limit = 31 // 14 days
  return spread(dt)<=limit
}

export function spread(dt) {
  const then = day(dt)
  const today = day().startOf('day')
  return then.diff(today, 'day')
}

/*
{
  "kind": "calendar#event",
  "etag": "\"3347022935510000\"",
  "id": "0hlsprq0v57f70ojula3ld06tb",
  "status": "confirmed",
  "htmlLink": "https://www.google.com/calendar/event?eid=MGhsc3BycTB2NTdmNzBvanVsYTNsZDA2dGIgdjhlaGF1Nm52NHEzcjNwZGFmOG52bWlxbzhAZw",
  "created": "2023-01-12T08:07:07.000Z",
  "updated": "2023-01-12T08:17:47.755Z",
**"summary": "Welcome 2023 Milonga Mi Casa",
**"description": "\u003cu\u003e\u003c/u\u003eMilonga 3-6.30pm.  Casa Flamenco, 36B Circular Road (3/F), SG 049392.  Organizer: Carman (\u003ca href=\"https://www.facebook.com/carman.flamenca).\"\u003ehttps://www.facebook.com/carman.flamenca).\u003c/a\u003e Website: \u003ca href=\"https://www.facebook.com/CasaFlamenco.com.sg/.\"\u003ehttps://www.facebook.com/CasaFlamenco.com.sg/.\u003c/a\u003e \u003cbr\u003e---\u003cu\u003e\u003c/u\u003e\u003cbr\u003e\u003cu\u003e\u003c/u\u003eDJ: Jenny\u003cbr\u003eEntrada: $20 cash/paynow\u003cbr\u003e\u003cu\u003e\u003c/u\u003eReservation: \u003cu\u003e\u003c/u\u003e\u003cspan\u003e9837-6397\u003c/span\u003e\u003cbr\u003e\u003cspan\u003e\u003cbr\u003e\u003c/span\u003e\u003cbr\u003e\u003ca href=\"https://www.facebook.com/photo/?fbid=10159345753808348&set=gm.10161588177503532&idorvanity=50661258531\"\u003ehttps://www.facebook.com/photo/?fbid=10159345753808348&amp;set=gm.10161588177503532&amp;idorvanity=50661258531\u003c/a\u003e\u003cspan\u003e\u003cbr\u003e\u003c/span\u003e",
**"location": "Casa Flamenco, 36B Circular Road (3/F), SG 049392.",
**"start": {
    "dateTime": "2023-01-02T15:00:00+08:00",
    "timeZone": "Asia/Singapore"
  },
**"end": {
    "dateTime": "2023-01-02T18:30:00+08:00",
    "timeZone": "Asia/Singapore"
  },
  "creator": {
    "email": "kaceong@gmail.com"
  },
  "organizer": {
    "email": "v8ehau6nv4q3r3pdaf8nvmiqo8@group.calendar.google.com",
    "displayName": "tfinder Singapore SG",
    "self": true
  },
  "iCalUID": "0hlsprq0v57f70ojula3ld06tb@google.com",
  "sequence": 0,
  "guestsCanInviteOthers": false,
  "guestsCanSeeOtherGuests": false,
  "eventType": "default"
},
*/

export function useCal(url) {
  const cald = ref()
  const fetchurl = ref()

  function makeUrl(url) {
    fetchurl.value =
    'https://www.googleapis.com/calendar/v3/calendars/'
    + url + '/events?'
    + 'key=' + apikey
    + '&singleEvents=true&orderBy=starttime'
  }

  function getCal() {
    console.log('You clicked')
    var m = fetchurl.value
    //'https://jsonplaceholder.typicode.com/posts/1'

    fetch(m, {
      //method: 'POST',
      //headers: {'Content-Type': 'application/json'},
      //body: {postTitle: thistitle},
    })
    .catch(error=>{
      cald.value={}
      console.log('Error during fetch ', error)
    })
    .then(response=>response.json())
    .then(data=>
      //Remove cancelled events, sort by date
      data.items.filter(
        item => item &&
        item.hasOwnProperty('status') &&
        item.status !== 'cancelled'
      ).sort(comp)
      //return result
    )
    .then(data =>
      data.filter(
        item => item &&
        !isPast(item.end.dateTime || item.end.date)
      )
    )
    .then(data =>
      data.filter(
        item => item &&
        inRange(item.start.dateTime || item.start.date)
      )
    )
    .then(data => {
      console.log('Fetched ',data)
      cald.value = data
    })
  }

  makeUrl(url)
  return { cald, fetchurl, getCal, makeUrl }
}
