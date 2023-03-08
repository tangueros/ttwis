<template lang="pug">
h1 Place: {{country}}

p [ some picture of this country ]

h2 Website and Facebook

p
  | Click to open
  |
  a(:href="linkurl"
    target='_BLANK'
  ) {{ linkurl }}


h2 Venues (Google Map)

a(:href="'https://www.google.com/maps/d/viewer?' + mapurl"
  target="_BLANK"
) Open in Google Map
p
iframe.embedded(
  :src="'https://www.google.com/maps/d/embed?' + mapurl"
)


h2 Schedule (Google Agenda)

a(:href="'https://calendar.google.com/calendar/embed?' + calurl"
  target="_BLANK"
) Open in Google Calendar
p
  | Aggregation of:
  br
  | 1) Events Calendar
  br
  | 2) Public Holidays Calendar

iframe.embedded(
  :src="'https://calendar.google.com/calendar/embed?' + calurl"
)


h2 Schedule (via TTWIS-Cal)
a(:href="'/ttwis/embed?' + code"
  target="_BLANK"
) Open in New Page
p
iframe.embedded(
  :src="'/ttwis/embed?' + code"
)


</template>

<script setup>
const props = defineProps(['country', 'code'])
import { ref } from 'vue'
//import data from '../../data/organisers.yaml'
//console.log('Read Data ', data)
//  frameborder="0"
//  scrolling="no"

// try to map from code to followings
// props.code =>
//          country picture
//          timezone
//          linkurl (public)
//          gmap (shareable)
//          gcal (shareable)
//
/*
MAPS:
https://www.google.com/maps/d/u/0/edit?
mid=1JDSri3tFP97YMdRn8YKCqXy_tP4
&ll=1.294456296132084%2C103.84361656855013
&z=13

https://www.google.com/maps/d/u/0/viewer?
mid=1JDSri3tFP97YMdRn8YKCqXy_tP4
&ll=1.2944568032681885%2C103.84361656855013
&z=13

https://www.google.com/maps/d/u/0/viewer?
mid=19Q_RR0JbSNlkjjwwzW2SOJAhO_Q
&ll=22.295591142802817%2C114.16426645000001
&z=14

Events
https://calendar.google.com/calendar/embed?
src=v8ehau6nv4q3r3pdaf8nvmiqo8%40group.calendar.google.com
&ctz=Asia%2FSingapore

Holiday
https://calendar.google.com/calendar/embed?
src=v358jjiemm7tn05fo8gevpqrk54siboj%40import.calendar.google.com
&ctz=Asia%2FSingapore

<iframe src="https://calendar.google.com/calendar/embed?
src=v8ehau6nv4q3r3pdaf8nvmiqo8%40group.calendar.google.com
&ctz=Asia%2FSingapore"
style="border: 0"
width="800" height="600"
frameborder="0"
scrolling="no"
></iframe>

*/

//const thisdata2 = data[ props.code ]
const thisdata = {
  "country": "Singapore",
  "linkurl": "https://sites.google.com/view/ttwis/home",
  "timezone": "Asia/Singapore",
  "mapvenues": "1JDSri3tFP97YMdRn8YKCqXy_tP4",
  "cals": [
    //"djM1OGpqaWVtbTd0bjA1Zm84Z2V2cHFyazU0c2lib2pAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20",
    //"djhlaGF1Nm52NHEzcjNwZGFmOG52bWlxbzhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"

    "v8ehau6nv4q3r3pdaf8nvmiqo8@group.calendar.google.com", // events
    "v358jjiemm7tn05fo8gevpqrk54siboj@import.calendar.google.com", // holidays
  ]
}
//src=v8ehau6nv4q3r3pdaf8nvmiqo8%40group.calendar.google.com
//src=v358jjiemm7tn05fo8gevpqrk54siboj%40import.calendar.google.com



const timezone = thisdata.timezone
const title = props.country + " Tango"

const linkurl = thisdata.linkurl
//'https://sites.google.com/view/ttwis/home'

const mapurl =
//"https://www.google.com/maps/d/embed?" +
"mid=" + thisdata.mapvenues
+ "&ehbc=2E312F"


const calurl =
//"https://calendar.google.com/calendar/embed?"+
//"height=480" +
"&bgcolor=%23ffffff"
+ "&mode=AGENDA" // agenda view
+ "&wkst=2" // week starts on Monday
//+ "&showTitle=0"
//+ "&showPrint=0"
//+ "&showCalendars=1"
//+ "&showTz=1"
+ "&title=" + encodeURIComponent(title)
+ "&ctz=" + encodeURIComponent(timezone)
//+ "&color=%230000F4" // #4285F4
//+ "&color=%23EF6C00" // #EF6C00
+ "&src=" + encodeURIComponent(thisdata.cals[0])
+ "&src=" + encodeURIComponent(thisdata.cals[1])
//+ "&src=djM1OGpqaWVtbTd0bjA1Zm84Z2V2cHFyazU0c2lib2pAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20"
//+ "&src=djhlaGF1Nm52NHEzcjNwZGFmOG52bWlxbzhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"

</script>

<style>
/*
const calurl =
"https://calendar.google.com/calendar/embed?"
+ "eopt=0"
+ "&amp;" + "deb=-"
+ "&amp;" + "embed_style=WyJhdDplbWI6c3QiLCIjZTBlMGUwIiwiI2VkZWRlZCIsIiM0MTg0ZjMiLCJyb2JvdG8iLCIjNjM2MzYzIiw1MDAsIiNmZmYiXQo"
+ "&amp;" + "color=%230B8043"
+ "&amp;" + "src=ZW4uc2luZ2Fwb3JlI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t"
+ "&amp;" + "color=%23EF6C00"
+ "&amp;" + "src=djhlaGF1Nm52NHEzcjNwZGFmOG52bWlxbzhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"

iframe
  src="https://calendar.google.com/calendar/embed?
  height=480&wkst=2&bgcolor=%23ffffff&ctz=Asia%2FSingapore&mode=AGENDA&title=Singapore%20Tango&src=djM1OGpqaWVtbTd0bjA1Zm84Z2V2cHFyazU0c2lib2pAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=djhlaGF1Nm52NHEzcjNwZGFmOG52bWlxbzhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%234285F4&color=%23EF6C00"
  style="border-width:0"
  width="640"
  height="480"
  frameborder="0"
  scrolling="no"


~~~
iframe
  class="YMEQtf KfXz0b"
  frameborder="0"
  allowfullscreen
  sandbox="allow-scripts allow-popups
  allow-forms allow-same-origin
  allow-popups-to-escape-sandbox
  allow-downloads allow-modals"
src
"https://calendar.google.com/calendar/embed?color=%230B8043&amp;color=%23EF6C00&amp;deb=-&amp;embed_style=WyJhdDplbWI6c3QiLCIjZTBlMGUwIiwiI2VkZWRlZCIsIiM0MTg0ZjMiLCJyb2JvdG8iLCIjNjM2MzYzIiw1MDAsIiNmZmYiXQo&amp;eopt=0&amp;mode=agenda&amp;showCalendars=1&amp;showPrint=0&amp;showTitle=0&amp;showTz=1&amp;src=ZW4uc2luZ2Fwb3JlI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;src=djhlaGF1Nm52NHEzcjNwZGFmOG52bWlxbzhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"

iframe
  src="https://calendar.google.com/calendar/u/0/embed?bgcolor=%23ffffff&color=%230B8043&color=%23EF6C00&ctz=Asia/Singapore&height=600&mode=AGENDA&showTz=0&src=ZW4uc2luZ2Fwb3JlI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=djhlaGF1Nm52NHEzcjNwZGFmOG52bWlxbzhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&title=Singapore+Social+Tango&wkst=2"
  width="640"
  height="480"
~~~

## Reformatted Schedule

Social Events

Public Holidays

https://calendar.google.com/calendar/embed?bgcolor=%23ffffff&color=%230B8043&color=%23EF6C00&ctz=Asia/Singapore&height=600&mode=AGENDA&showTz=0&src=ZW4uc2luZ2Fwb3JlI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=djhlaGF1Nm52NHEzcjNwZGFmOG52bWlxbzhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&title=Singapore+Social+Tango&wkst=2

## Aggregated Calendar

iframe
  src=
"https://calendar.google.com/calendar/embed?color=%230B8043&amp;color=%23EF6C00&amp;deb=-&amp;embed_style=WyJhdDplbWI6c3QiLCIjZTBlMGUwIiwiI2VkZWRlZCIsIiM0MTg0ZjMiLCJyb2JvdG8iLCIjNjM2MzYzIiw1MDAsIiNmZmYiXQo&amp;eopt=0&amp;mode=agenda&amp;showCalendars=1&amp;showPrint=0&amp;showTitle=0&amp;showTz=1&amp;src=ZW4uc2luZ2Fwb3JlI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;src=djhlaGF1Nm52NHEzcjNwZGFmOG52bWlxbzhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"

  style="border: 0"
  width="640"
  height="480"
  frameborder="0"
  scrolling="no"


~~~
iframe
  src="https://calendar.google.com/calendar/embed?
  height=480
  &mode=AGENDA
  &wkst=2
  &ctz=Asia%2FSingapore
  &bgcolor=%23ffffff
  &color=%234285F4
  &color=%23EF6C00
  &src=djM1OGpqaWVtbTd0bjA1Zm84Z2V2cHFyazU0c2lib2pAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20
  &src=djhlaGF1Nm52NHEzcjNwZGFmOG52bWlxbzhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ
  &title=Singapore%20Tango"

  style="border: 0"
  width="640"
  height="480"
  frameborder="0"
  scrolling="no"
/iframe
~~~

~~~
&lt;iframe
  width="640" height="480"
  src="{{mapurl}}"
&gt;
&lt;/iframe&gt;
~~~

*/
.embedded {
  border: 1px solid red;
  width: 100%;
  height: 400px;
}
</style>
