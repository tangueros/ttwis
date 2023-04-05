---
title: Maps
---
# Holidays (Countries)

_Click to switch country_

<template v-for="(i,j) in locdata">
<a @click="go(j)">{{ i.countryname }}</a> |
</template>

---
<Gcal :country="thisplace" />


<script setup>
  import { ref } from 'vue'
  const thisplace = ref('sg')
  function go(x) { thisplace.value = x }
  import locdata from '../../data/org-locals'
</script>

## Data Definition

Each holiday is retrieved by a country (2-letter code based on DNS domain country or nearest acronym)

The actual data is a Google Calendar which can be created
by anyone, with world share permission (anyone with link can
view details of events).

This project imports the `ics` files exported by
`https://www.officeholidays.com`, into
temporary accounts and exports them as Google
Calendar shares.

Define inside `/data/org-maps.js`

~~~
{
  'sg': 'v358jjiemm7tn05fo8gevpqrk54siboj@import.calendar.google.com',
  //source data from https://www.officeholidays.com/ics/singapore
}
~~~

