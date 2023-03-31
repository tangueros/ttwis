<template lang="pug">
div(v-if="!thisCity")
  p Bad Config Data; no {{ code }}
  p Please check

div(v-else)
  p Good Config Data with {{ code }}
  .codeblock
    .language-
      pre.shiki.material-theme-palenight
        | {{ thisCity }}

  h1 Place: {{country}}
  p Timezone: {{ thisCity.timezone }}
  p [ some picture of this country ]
  h2 Website and Facebook
  p
    | Click to open
    |
    a(:href="thisCity.linkurl"
      target='_BLANK'
    ) {{ thisCity.linkurl }}

  h2 Venues (Google Map)

  a(:href="mapurl1"
    target="_BLANK"
  ) Open in Google Map
  p
  iframe.embedded(
    :src="mapurl2"
  )


  h2 Schedule (Google Agenda)

  a(:href="calurl"
    target="_BLANK"
  ) Open in Google Calendar
  p
    | Aggregation of:
    br
    | 1) Events Calendar
    br
    | 2) {{ country}} Public Holidays Calendar

  iframe.embedded(
    :src="calurl"
  )

  h2 Schedule (via TTWIS-Cal)
  a(:href="'/ttwis/embed?' + code"
    target="_BLANK"
  ) Open in New Page)
  p
  iframe.embedded(
    :src="'/ttwis/embed?' + code"
  )
</template>

<script setup>
import { ref, computed, } from 'vue'
const props = defineProps(['country', 'code'])
import { useConfig } from '../composables/configdata'
const {
  isValid, thisCity,
  calurl,
  mapurl1, mapurl2,
} = useConfig(props.code, props.country)
</script>

<style>
.embedded {
  border: 1px solid red;
  width: 100%;
  height: 400px;
}
.codeblock {
  color: #A6ACCD;
}

</style>
