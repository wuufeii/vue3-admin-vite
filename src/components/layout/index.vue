<template>
  <layout>
    <template #home>
      <!-- <home></home> -->
      <router-view />
    </template>
  </layout>
</template>

<script>
import Layout from './Layout.vue'
import Home from 'views/Home.vue'
export default {
  components: { Layout, Home }
}
</script>

<style></style>
