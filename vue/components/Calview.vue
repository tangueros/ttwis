<template lang="pug">
section
  h2 Calendar for {{ city }}
  bcal(:cald="cald")
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCal, inRange, spread } from '../composables/calapi'

//city = which city to show
//url = which Gcalendar to show
const props = defineProps(['url', 'city'])
const {cald, fetchurl, getCal, makeUrl} = useCal(props.url)

onMounted(()=> getCal())
</script>

