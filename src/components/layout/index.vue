<template>
  <el-container v-if="navbarType === '左侧菜单模式'">
    <el-aside :width="sidebarWidth">
      <sidebar :showLogo="true"></sidebar>
    </el-aside>
    <el-container>
      <el-header>
        <navbar></navbar>
      </el-header>
      <tabs></tabs>
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
      <el-aside :width="sidebarWidth">
        <sidebar></sidebar>
      </el-aside>
      <el-main>
        <home v-if="currentPath === '/'"></home>
        <router-view v-else />
      </el-main>
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
      <el-main>
        <home v-if="currentPath === '/'"></home>
        <router-view v-else />
      </el-main>
    </el-container>
  </el-container>

  <el-container v-else>
    <el-aside width="80px">
      <sidebar :showLogo="true" :collapse="true"></sidebar>
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
// import Sidebar from './components/sidebar/index.vue'
// import Navbar from './components/navbar/index.vue'
import {Sidebar, Navbar, Tabs} from './components/layout.js'
import Home from 'views/Home.vue'
import { reactive, toRefs, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  components: { Sidebar, Navbar, Tabs, Home },
  setup() {
    const route = useRoute()
    const store = useStore()

    // 获取当前路径
    const currentPath = computed(() => {
      return route.path
    })

    // 导航栏类型
    const navbarType = computed(() => {
      return store.state.navbarType
    })

    // 是否折叠菜单
    const isCollapse = computed(() => {
      return store.state.isCollapse
    })

    // 侧边栏宽度
    const sidebarWidth = computed(() => {
      return store.state.isCollapse ? '64px' : '200px'
    })
    return {
      currentPath,
      navbarType,
      isCollapse,
      sidebarWidth
    }
  }
}
</script>

<style></style>
