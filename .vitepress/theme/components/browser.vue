<script setup>
/*
import { pages, routes } from './'
import { useRoute } from 'vitepress'
import { getPage, getParents, getSiblings, normalize } from '../../src/browser'
const route = useRoute()
const page = getPage(route.path, routes)
const parents = getParents(route.path, routes)
const siblings = getSiblings(route.path, routes)

    a(v-for="p in routes"
      :key="p"
      href="normalize(p.path)"
      ) {{ p }}
*/
</script>

<template lang="pug">
section
  h2 All routes
  .list routes expanded
  h2 Pages
  p { { pages } }
  h2 Page
  p { { page } }
  h3 Parents
  p { { parents } }
  h3 Siblings
  p { { siblings } }

</template>

<style scoped>
section {
  border: 1px solid red;
  padding: 4px;
  background: #EEFFAA;
}
.list {
  display: flex;
  flex-flow: column;
}
</style>
