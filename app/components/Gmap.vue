<template lang="pug">
//-
  b.capitalize.text-sm
    | {{ city }}
  p Map of {{ city }} is
  pre {{ map }}
    | :
    | {{ map.mid(city) }}
  br
  i URL = {{ map.murl(city,false) }}

div(v-if="map.mid(city)")
  iframe.embedded(
    :src="map.murl(city,false)"
  )
  .mb-2.text-center.italic.text-xs
    a(:href="map.murl(city,true)"
      target="_BLANK"
    ) Open in Google Map

div(v-else)
  p Sorry {{city}} has no definition


</template>

<script setup>
const props = defineProps(['city'])

import { useMapStore } from '../stores/map'
const map = useMapStore()
//map.go(props.city)

</script>

<style scoped>
.embedded {
  width: 400px;
  height: 300px;
  background-color: #aac;
  padding: 8px;
  border: 1px solid red;
  margin: 0 auto;
}
</style>

