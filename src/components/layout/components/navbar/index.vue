<template>
  <div class="header-content">
    <logo v-if="isShowLogo"></logo>
    <div class="header" :class="{ 'has-logo': isShowLogo }">
      <div class="header-left">
        <fold v-if="!isCollapse" class="navbar-icon _fold" @click="changeCollapse(true)"/>
        <expand v-else class="navbar-icon _fold" @click="changeCollapse(false)"/>
        <slot name="sidebar"></slot>
      </div>
      <div class="header-right">
        <setting class="navbar-icon" @click="showSetting" />
      </div>
    </div>
  </div>

  <system-setting ref="setting"></system-setting>
</template>

<script>
import { ref, computed } from 'vue'
import { Fold, Expand, Setting } from '@element-plus/icons'
import { SystemSetting, Logo } from '../layout.js'
import {useStore} from 'vuex'
export default {
  components: { Fold, Expand, Setting, SystemSetting, Logo },
  props: {
    showLogo: Boolean,
  },
  setup(props) {
    const setting = ref(null)
    const store = useStore()
    // 显示设置页面
    const showSetting = () => {
      setting.value.showDraw()
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

    return {
      setting,
      showSetting,
      isShowLogo,
      isCollapse,
      changeCollapse
    }
  },
}
</script>

<style></style>
