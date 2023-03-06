<template lang="pug">
section
  h2 Calendar View
  p The URL is {{ url}}
  p The fetch is {{ fetchurl }}
  button(@click='getCal()') Click to Get

  hr
  p ICS is
  pre {{ ics }}
  hr
  template(v-if="!cald")
    p No Cal Data
  template(v-else)
    p Have Cal Data
    .calcard(v-for="i in cald")
      //-p {{ isnewday(i.start.dateTime) }}
      .daterow(v-if="isnewday(i.start.dateTime)")
        | {{ day(i.start.dateTime).format('dddd D-MMM-YYYY')}}
      .timerow(@click="i.expanded = !i.expanded")
        .cell0
          | {{ day(i.start.dateTime).format('h:mma') }}
          br
          | {{ day(i.end.dateTime).format('h:mma') }}
        .cell1 {{i.summary}}
        .cell2 {{ firstpart(i.location)}}
      .timeexpanded(v-if="i.expanded")
        .row
          .col0 When
          .col1 {{ niceformat(i) }}
        .row
          .col0 Where
          .col1 {{i.location}}
        .row
          .col0 Details
          .col1(v-html='i.description')
        .row
          .col0 Actions
          .col1
            a(:href='getcallink(i)'
              target="_BLANK"
            )
              | [Copy Event to&nbsp;
              img(border="0"
                src="https://www.google.com/calendar/images/ext/gc_button1_en.gif")
              | ]
            | &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            a(:href='getmaplink(i.location)'
              target="_BLANK"
            )
              | [View location in Google Map]&nbsp;
              //-img(border="0"
                src="https://www.google.com/calendar/images/ext/gc_button1_en.gif")
            | &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            br
            button(@click='genics(i)') [Copy Event to Apple Ical ICS]

      .timebottom

</template>


<script setup>
const props = defineProps(['url'])
import { ref, onMounted, onUnmounted } from 'vue'
import { day, nicedate, nicetime } from '../helper/daylib'
import { getics } from '../helper/icsgen'
import { useCal, inRange, spread } from '../composables/calapi'
const {cald, fetchurl, getCal, makeUrl} = useCal(props.url)

onMounted(()=> getCal())

function niceformat(dt) {
  // ddd h:ma--h:ma (D-MMM-YYYY)
  return day(dt.start.dateTime).format('ddd') + ' '
    + nicetime(dt.start.dateTime) + '--'
    + nicetime(dt.end.dateTime)
    + ' (' + nicedate(dt.start.dateTime) + ')'
}

function firstpart(ds) {
  const regex = /^[^,]+/
  const found = ds.match(regex)
  return found[0]
}

var lastdt = day().startOf('day').subtract(1,'day')
function isnewday(dt) {
  const dd = day(dt).startOf('day')
  //console.log(
  //  'check ', dd.format('D-MMM'), lastdt.format('D-MMM'),
  //  dd.isSame(lastdt,'day') )

  if (dd.isSame(lastdt,'day')) {
    return false; // not a new day
  }
  lastdt = dd
  return true; // yes a new day
}

//https://maps.google.com/maps?hl=en&q=Casa%20Flamenco%2C%2036B%20Circular%20Road%20%283%2FF%29%2C%20SG%20049392.
function getmaplink(address) {
  var m = 'https://maps.google.com/maps?hl=en&q='
  + encodeURIComponent(address)
  return m
}

//https://calendar.google.com/calendar/u/0/r/eventedit/copy/NTNob3VoNmtsMDVzcmZpcGVtMHBnaDE1ZmNfMjAyMzAzMDZUMTIwMDAwWiB2OGVoYXU2bnY0cTNyM3BkYWY4bnZtaXFvOEBn
function getcallink(i) {
  const email = i.organizer.email
  const eid = i.htmlLink.match(/[a-zA-Z0-9]+$/)
  console.log('Matched', eid)
  var m = 'https://calendar.google.com/calendar/event?action=TEMPLATE'
  + '&tmeid=' + encodeURIComponent(eid[0])
  + '&tmsrc=' + encodeURIComponent(email)
  return m
}

const ics=ref('')
function genics(i) {
  ics.value = getics(i)
}

//https://calendar.google.com/calendar/event?action=TEMPLATE&tmesrc=v8ehau6nv4q3r3pdaf8nvmiqo8@group.calendar.google.com&tmeid=MWE4ajFmYnNzZ3IzYjdoaTM0Ym80YXYzcWNfMjAyMzAzMDdUMTIwMDAwWiB2OGVoYXU2bnY0cTNyM3BkYWY4bnZtaXFvOEBn
/*
<a target="_blank"
href="https://calendar.google.com/calendar/event?action=TEMPLATE&amp;tmeid=MWE4ajFmYnNzZ3IzYjdoaTM0Ym80YXYzcWNfMjAyMzAzMDdUMTIwMDAwWiB2OGVoYXU2bnY0cTNyM3BkYWY4bnZtaXFvOEBn&amp;tmsrc=v8ehau6nv4q3r3pdaf8nvmiqo8%40group.calendar.google.com&amp;scp=ALL"
><img border="0" src="https://www.google.com/calendar/images/ext/gc_button1_en.gif"></a>

https://calendar.google.com/calendar/event
?action=TEMPLATE
&tmeid=MWE4ajFmYnNzZ3IzYjdoaTM0Ym80YXYzcWNfMjAyMzAzMDdUMTIwMDAwWiB2OGVoYXU2bnY0cTNyM3BkYWY4bnZtaXFvOEBn
&tmsrc=v8ehau6nv4q3r3pdaf8nvmiqo8%40group.calendar.google.com

htmlLink eid=
organiser.email

https://calendar.google.com/calendar/event
?action=TEMPLATE
&tmsrc=v8ehau6nv4q3r3pdaf8nvmiqo8%40group.calendar.google.com
&tmeid=MWE4ajFmYnNzZ3IzYjdoaTM0Ym80YXYzcWNfMjAyMzAzMDdUMTIwMDAwWiB2OGVoYXU2bnY0cTNyM3BkYWY4bnZtaXFvOEBn
*/


/*
import { pages, routes } from './'
import { useRoute } from 'vitepress'
import { getPage, getParents, getSiblings, normalize } from '../../src/browser'
const route = useRoute()
const page = getPage(route.path, routes)
const parents = getParents(route.path, routes)
const siblings = getSiblings(route.path, routes)

    a(v-for="p in routes"
      :key="p"
      href="normalize(p.path)"
      ) {{ p }}
import { useRoute } from 'vitepress'



            br
            a(target="_blank"
              ohref="https://calendar.google.com/calendar/event?action=TEMPLATE&amp;tmeid=MWE4ajFmYnNzZ3IzYjdoaTM0Ym80YXYzcWNfMjAyMzAzMDdUMTIwMDAwWiB2OGVoYXU2bnY0cTNyM3BkYWY4bnZtaXFvOEBn&amp;tmsrc=v8ehau6nv4q3r3pdaf8nvmiqo8%40group.calendar.google.com&amp;scp=ALL"
              xhref="https://calendar.google.com/calendar/u/0/r/eventedit/copy/MWE4ajFmYnNzZ3IzYjdoaTM0Ym80YXYzcWNfMjAyMzAzMTRUMTIwMDAwWiB2OGVoYXU2bnY0cTNyM3BkYWY4bnZtaXFvOEBn/a2FjZW9uZ0BnbWFpbC5jb20?scp=ALL"
              href="https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=MWE4ajFmYnNzZ3IzYjdoaTM0Ym80YXYzcWNfMjAyMzAzMDdUMTIwMDAwWiB2OGVoYXU2bnY0cTNyM3BkYWY4bnZtaXFvOEBn&tmsrc=v8ehau6nv4q3r3pdaf8nvmiqo8%40group.calendar.google.com"
            )
              | https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=MWE4ajFmYnNzZ3IzYjdoaTM0Ym80YXYzcWNfMjAyMzAzMDdUMTIwMDAwWiB2OGVoYXU2bnY0cTNyM3BkYWY4bnZtaXFvOEBn&tmsrc=v8ehau6nv4q3r3pdaf8nvmiqo8%40group.calendar.google.com
            br

*/
</script>


<style scoped>
.calcard {
  xborder: 1px solid red;
  padding: 2px;
}
.title, .timeslot, .location {
  background-color:#CEE;
}
.title {
  font-weight: bold;
  font-style: italic;
  font-size: 100%;
}
.timeslot{
  font-size: 120%;
  font-face: bold;
}
.location {
  font-style: italic;
  font-size: 60%;
  font-weight: bold;
  text-align: center;
}
.col {
  display: flex;
}
.desc {
  font-size: 80%;
  background-color:#FFF;
  padding: 4px;
  xflex: 2 0 ;
  overflow: hidden;
}
.aside {
  font-size: 100%;
  font-face: italic;
  font-weight: bold;
  flex: 0 0 10rem ;
  background-color:#DCF;
  overflow: hidden;
}

.timebottom {
  border-bottom: 1px solid red;
}
.timerow {
  display: flex;
  gap: 10px;
  cursor: pointer;
}
.cell0, .cell1, .cell2 {
  flex: 2 0 5em;
  border-right: 1px solid #CCC;
}
.cell0 {
  flex: 0 0 5em;
  font-size: 70%;
  line-height: 1.5;
}
.cell1 {
  font-weight: bold;
  font-style: italic;
  font-size: 90%;
}
.cell2 {
  font-style: italic;
  font-size: 70%;
}
.daterow {
  background-color: #DEE;
  color: #A33;
  font-weight: bold;
  font-size: 110%;
  padding: 4px 2px;
}
.timeexpanded {
  background-color: #EEE;
  xoverflow: hidden;
}
.row {
  display: flex;
  font-size: 80%;
}
.col0, .col1 {
  flex: 2 0 5em;
}
.col0 {
  font-weight: bold;
  flex: 0 0 5em;
}
.col1 img{
  display: inline;
  vertical-align: middle;
}
</style>
