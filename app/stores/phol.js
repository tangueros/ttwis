// google public hols stores

import { defineStore } from 'pinia'
import srcdata from '../../data/org-hols'
import locdata from '../../data/org-locals'

const gmurl = 'https://calendar.google.com/calendar/embed'
function calbase(c,p) {
  let loc = locdata[c] || false
  let timezone = loc ? loc.timezone : ''
  let cname = loc ? loc.countryname : ''
  let title = 'Public Holidays in '+cname

  return gmurl +
  "?bgcolor=%23ffffff"
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
  + "&src=" + encodeURIComponent(p)
  //+ "&src=" + encodeURIComponent(cals[1])
  //+ "&src=djM1OGpqaWVtbTd0bjA1Zm84Z2V2cHFyazU0c2lib2pAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20"
  //+ "&src=djhlaGF1Nm52NHEzcjNwZGFmOG52bWlxbzhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"

}

function calhas(c) {
  return srcdata[c] || false
}

function caldo(c,v) {
  let h = calhas(c)
  console.log('calhas ',c,' returns',h)
  if (h) return calbase(c,h)
  else   return false
}

export const usePholStore = defineStore({
  id: 'phol',
  state: () => ({
    error: null,
    loading: false,
  }),
  getters: {
    cid: (state) => {
      return (c) => srcdata[c] || false
    },
    curl: (state) => {
      return (c) => caldo(c)
    },
  },
  actions: {
  },

})
