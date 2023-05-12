---
title: Producers
---
# Producers (Cities)

_Click to switch city_

<template v-for="(i,j) in locdata">
<i>{{ i.countryname }}</i>
<span v-for="(k,l) in i.cities">
(<a @click="go(l)">{{ k.cityname }}</a>)
</span> |
</template>

---

<Calview
ourl="milan.kacurak@gmail.com"
sgurl='v8ehau6nv4q3r3pdaf8nvmiqo8@group.calendar.google.com'
url="iekkk1k2l8sgqrcu30t623mpr0@group.calendar.google.com"
:city="thiscity"
/>



<script setup>
  import { ref } from 'vue'
  const thiscity = ref('sin')
  function go(x) { thiscity.value = x }
  import locdata from '../../data/org-locals'
</script>

## Data Definition

Each venue map is retrieved by a city (3-letter code based on airport IATA code or nearest acronym)

The venue maps to an array of Google Calendars
representing one or more event calendars.

Define inside `/data/org-maps.js`

~~~
{
  'sin': '1JDSri3tFP97YMdRn8YKCqXy_tP4',
}
~~~

