<template>
  <el-container class="">
    <el-aside width="200px">
      <sidebar></sidebar>
    </el-aside>
    <el-container>
      <el-header>
        <navbar></navbar>
      </el-header>
      <el-main>
        <home v-if="currentPath === '/'"></home>
        <router-view v-else />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Sidebar from './components/sidebar/Sidebar.vue'
import Navbar from './components/navbar/index.vue'
import Home from 'views/Home.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
export default {
  components: { Sidebar, Navbar, Home },
  setup() {
    let route = useRoute()
    let currentPath = computed(() => {
      return route.path
    })
    return {
      currentPath,
    }
  },
}
</script>

<style></style>
