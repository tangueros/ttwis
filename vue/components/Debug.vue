<template lang="pug">
.border.rounded
  b: i Some Debug Stuffs
  pre {{ val }}

  .button A Button

</template>

<script setup>
import { ref } from 'vue'

const val = ref('')

</script>
