// google mymap stores

import { defineStore } from 'pinia'
import srcdata from '../../data/org-maps'

const srcurl = 'https://jsonplaceholder.typicode.com/posts'

const gmurl = 'https://www.google.com/maps/d/'
function mapbase(p, v) {
  return gmurl +
  (v? 'viewer' : 'embed' ) +
  "?mid=" + p +
  "&ehbc=2E312F"
}

function maphas(c) {
  return srcdata[c] || false
}

function mapdo(c,v) {
  let h = maphas(c)
  console.log('maphas ',c,' returns',h)
  if (h) return mapbase(h,v)
  else   return false

}

export const useMapStore = defineStore({
  id: 'map',
  state: () => ({
    error: null,
    loading: false,
  }),
  getters: {
    mid: (state) => {
      return (c) => srcdata[c] || false
    },
    murl: (state) => {
      return (c,v) => mapdo(c,v)
    },
  },
  actions: {
  },

})


/*
    go(id) {
      this.post = null
      this.error = null
      this.loading = true
      try {
        this.city = id.toLowerCase() // lowercase only?
        this.post = srcdata[this.city]
        console.log (this.city, this.post)
      }
      catch (error) {
        this.error = error
      }
      finally {
        this.loading = false
      }
    },
    async fetchAll() {
      this.posts = []
      this.loading = true
      try {
        this.posts = await fetch(srcurl)
        .then((response) => response.json())
      }
      catch (error) {
        this.error = error
      }
      finally {
        this.loading = false
      }
    },
    async fetchPost(id) {
      this.post = null
      this.loading = true
      try {
        this.post = await fetch(srcurl + `/${id}`)
        .then((response) => response.json())
      }
      catch (error) {
        this.error = error
      }
      finally {
        this.loading = false
      }
    },
*/
