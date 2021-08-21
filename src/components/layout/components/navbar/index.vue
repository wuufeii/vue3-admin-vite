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
        <slot name="sidebar"></slot>
      </div>
      <div class="header-right">
        <full-screen></full-screen>
        <svg-icon name="language"></svg-icon>
        <setting class="navbar-icon" @click="showSetting" />
      </div>
    </div>
  </div>

  <system-setting ref="setting"></system-setting>
</template>

<script>
import { reactive, toRefs, computed } from 'vue'
import { Fold, Expand, Setting } from '@element-plus/icons'
import { SystemSetting, Logo } from '../layout.js'
import FullScreen from './FullScreens.vue'
import { useStore } from 'vuex'
export default {
  components: { Fold, Expand, Setting, SystemSetting, Logo, FullScreen },
  props: {
    showLogo: Boolean
  },
  setup(props) {
    const store = useStore()
    const data = reactive({
      setting: null
    })

    // 显示设置页面
    const showSetting = () => {
      data.setting.showDraw()
    }

    // 是否显示Logo
    const isShowLogo = computed(() => {
      return props.showLogo
    })

    // 是否折叠菜单
    const isCollapse = computed(() => {
      return store.state.isCollapse
    })

    // 切换菜单状态
    const changeCollapse = (value) => {
      store.commit('getCollapse', value)
    }

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
