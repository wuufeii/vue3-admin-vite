<template>
  <div class="header-content">
    <logo v-if="isShowLogo"></logo>
    <div class="header" :class="{ 'has-logo': isShowLogo }">
      <div class="header-left">
        <fold class="navbar-icon _fold" />
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
import { Fold, Setting } from '@element-plus/icons'
import { SystemSetting, Logo } from '../layout.js'
export default {
  components: { Fold, Setting, SystemSetting, Logo },
  props: {
    showLogo: Boolean,
  },
  setup(props) {
    const setting = ref(null)
    const showSetting = () => {
      // 显示设置页
      setting.value.showDraw()
    }
    const isShowLogo = computed(() => {
      return props.showLogo
    })
    return {
      setting,
      showSetting,
      isShowLogo,
    }
  },
}
</script>

<style></style>
