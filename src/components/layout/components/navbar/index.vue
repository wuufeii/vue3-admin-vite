<template>
  <div class="header-content">
    <logo v-if="isShowLogo"></logo>
    <div class="header" :class="{ 'has-logo': isShowLogo }">
      <div class="header-left">
        <fold
          v-if="!isCollapse"
          class="navbar-icon _fold"
          @click="changeCollapse(true)"
        />
        <expand
          v-else
          class="navbar-icon _fold"
          @click="changeCollapse(false)"
        />
        <el-breadcrumb separator="/">
          <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item> -->
          <el-breadcrumb-item v-for="item in breadcrumb" :key="item.menuId">
            {{ item.menuName }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <slot name="sidebar"></slot>
      </div>
      <div class="header-right">
        <full-screen></full-screen>
        <svg-icon name="language"></svg-icon>
        <user-info></user-info>
        <setting class="navbar-icon" @click="showSetting" />
      </div>
    </div>
  </div>
  <system-setting ref="setting"></system-setting>
</template>

<script>
import { reactive, toRefs, computed, watch } from 'vue'
import { Fold, Expand, Setting } from '@element-plus/icons'
import SystemSetting from '../setting/index.vue'
import Logo from '../Logo.vue'
import FullScreen from './FullScreen.vue'
import { useStore } from 'vuex'
import { getBreadcrumb } from 'utils/storage'
import UserInfo from './UserInfo.vue'
export default {
  components: {
    Fold,
    Expand,
    Setting,
    SystemSetting,
    Logo,
    FullScreen,
    UserInfo
  },
  props: {
    showLogo: Boolean
  },
  setup(props) {
    const store = useStore()
    const data = reactive({
      setting: null,
      breadcrumb: getBreadcrumb()
    })

    // 显示设置页面
    const showSetting = () => data.setting.showDraw()

    // 是否显示Logo
    const isShowLogo = computed(() => {
      return props.showLogo
    })

    // 是否折叠菜单
    const isCollapse = computed(() => {
      return store.state.isCollapse
    })

    // 切换菜单状态
    const changeCollapse = (value) => store.commit('getCollapse', value)

    watch(
      () => store.state.activeMenu,
      (value, old) => (data.breadcrumb = getBreadcrumb())
    )

    const params = toRefs(data)

    return {
      ...params,
      showSetting,
      isShowLogo,
      isCollapse,
      changeCollapse
    }
  }
}
</script>

<style></style>
