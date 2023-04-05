---
title: Maps
---
# Venues (Cities)

_Click to switch city_

<template v-for="(i,j) in locdata">
<i>{{ i.countryname }}</i>
<span v-for="(k,l) in i.cities">
(<a @click="go(l)">{{ k.cityname }}</a>)
</span> |
</template>

---
<Gmap :city="thiscity" />


<script setup>
  import { ref } from 'vue'
  const thiscity = ref('sin')
  function go(x) { thiscity.value = x }
  import locdata from '../../data/org-locals'
</script>

## Data Definition

Each venue map is retrieved by a city (3-letter code based on airport IATA code or nearest acronym)

The venue maps to a Google Mymap file which can be created
by anyone, with world share permission (anyone with link can
view the map).

Define inside `/data/org-maps.js`

~~~
{
  'sin': '1JDSri3tFP97YMdRn8YKCqXy_tP4',
}
~~~

