<template>
  <div class="header">
    <div class="header-left">
      <fold class="navbar-icon" />
    </div>
    <div class="header-right">
      <setting class="navbar-icon" @click="showSetting"/>
    </div>
  </div>
  <system-setting ref="setting"></system-setting>
</template>

<script>
import {ref} from 'vue'
import { Fold, Setting } from '@element-plus/icons'
import SystemSetting from './Setting.vue'
export default {
  components: { Fold, Setting, SystemSetting },
  setup() {
    let setting = ref(null)
    let showSetting = () => { // 显示设置页
      setting.value.showDraw()
    }
    return {
      setting,
      showSetting
    }
  }
}
</script>

<style>
</style>
