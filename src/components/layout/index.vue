<template>
  <el-container v-if="navbarType === '左侧菜单模式'">
    <el-aside width="200px">
      <sidebar :showLogo="true"></sidebar>
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

  <el-container v-else-if="navbarType === '顶部菜单混合模式'">
    <el-header>
      <navbar :showLogo="true"></navbar>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <sidebar></sidebar>
      </el-aside>
      <!-- <home v-if="currentPath === '/'"></home>
        <router-view v-else /> -->
    </el-container>
  </el-container>

  <el-container v-else-if="navbarType === '顶部菜单模式'">
    <el-header>
      <navbar :showLogo="true">
        <template v-slot:sidebar>
          <sidebar mode="horizontal"></sidebar>
        </template>
      </navbar>
    </el-header>
    <el-container>
      <el-main><div @click="test">点我</div></el-main>
    </el-container>
  </el-container>

  <el-container v-else>
    <el-header>
      <navbar></navbar>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <sidebar mode="horizontal"></sidebar>
      </el-aside>
      <el-main><div @click="test">点我</div></el-main>
    </el-container>
  </el-container>
</template>


<script>
import Sidebar from './components/sidebar/index.vue'
import Navbar from './components/navbar/index.vue'
import Home from 'views/Home.vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  components: { Sidebar, Navbar, Home },
  setup() {
    const route = useRoute()
    const store = useStore()
    const type = ref(true)
    const test = () => {
      type.value = !type.value
    }
    const currentPath = computed(() => {
      return route.path
    })
    const navbarType = computed(() => {
      return store.state.navbarType
    })
    return {
      currentPath,
      type,
      test,
      navbarType,
    }
  },
}
</script>

<style></style>
