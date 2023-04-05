<template lang="pug">
.border.rounded.p-3.mb-1
  b: i Some Debug Stuffs for {{id}}
  br
  .btn.btn-outline.btn-sm(
    @click="m.increment"
  ) Increment

  .btn.btn-outline.btn-sm(
    @click="m.$reset"
  ) Reset
  hr
  pre M = {{ m }}
  hr
  pre N = {{ n }}
  .btn.btn-outline.btn-sm(
    @click="bounce()"
  ) Bounce



</template>

<script setup>
import { ref } from 'vue'
//const val = ref('')

const props = defineProps(['id'])

import { useCounterStore } from '../stores/counter'
const m = useCounterStore()

const n = ref(props.id)
function bounce() {n.value ++}

</script>
