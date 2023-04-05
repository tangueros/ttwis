<template lang="pug">
//p {{ country }}
//pre {{ cal }}

div(v-if="cal.cid(country)")
  //-p {{ country }} : {{ cal.curl(country) }}
  iframe.embedded(
    :src="cal.curl(country)"
  )
  .mb-2.text-center.italic.text-xs
    a(:href="cal.curl(country)"
      target="_BLANK"
    ) Open in Google Calendar

div(v-else)
  p Sorry {{city}} has no definition
</template>

<script setup>
const props = defineProps([ 'country'])
import { usePholStore } from '../stores/phol'
const cal = usePholStore()

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

