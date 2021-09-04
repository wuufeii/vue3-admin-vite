<template>
  <el-drawer title="项目配置" v-model="drawer" :show-close="true">
    <div class="draw-content">
      <el-divider>主题</el-divider>
      <div class="flex-justify-center day-mode">
        <el-switch
          v-model="nightMode"
          active-text="夜间模式"
          inactive-text="日间模式"
          @change="changeSetting('nightMode', nightMode)"
        ></el-switch>
      </div>
      <el-divider>导航栏模式</el-divider>
      <div class="nav-row">
        <el-tooltip
          effect="dark"
          placement="bottom"
          v-for="(item, index) in navbarList"
          :key="index"
          :content="item"
          :disabled="!drawer"
        >
          <div
            :class="['nav-item', `nav-item-${index}`, { active: navbarType === item }]"
            @click="changeSetting('navbarType', item)"
          ></div>
        </el-tooltip>
      </div>
      <el-divider>系统主题</el-divider>
      <div class="checkbox-row">
        <div
          class="checkbox-item"
          v-for="(item, index) in systemThemeList"
          :key="index"
          :class="{ active: item === systemThemeColor }"
          :style="{ backgroundColor: item }"
          @click="changeSetting('systemThemeColor', item)"
        ></div>
        <el-color-picker
          v-model="systemThemeColor"
          @active-change="changeSetting('systemThemeColor', $event)"
        ></el-color-picker>
      </div>
      <el-divider>顶栏主题</el-divider>
      <div class="checkbox-row">
        <div
          class="checkbox-item"
          v-for="(item, index) in navbarThemeList"
          :key="index"
          :class="{ active: item === navbarThemeColor }"
          :style="{ backgroundColor: item }"
          @click="changeSetting('navbarThemeColor', item)"
        ></div>
        <el-color-picker
          v-model="navbarThemeColor"
          @active-change="changeSetting('navbarThemeColor', $event)"
        ></el-color-picker>
      </div>
      <el-divider>菜单主题</el-divider>
      <div class="checkbox-row">
        <div
          class="checkbox-item"
          v-for="(item, index) in sidebarThemeList"
          :key="index"
          :class="{ active: item === sidebarThemeColor }"
          :style="{ backgroundColor: item }"
          @click="changeSetting('sidebarThemeColor', item)"
        ></div>
        <el-color-picker
          v-model="sidebarThemeColor"
          @active-change="changeSetting('sidebarThemeColor', $event)"
        ></el-color-picker>
      </div>
      <el-divider>界面显示</el-divider>
      <div class="other-row">
        <span>面包屑</span>
        <el-switch
          v-model="showBreadcrumb"
          class="custom-switch"
          @change="changeSetting('showBreadcrumb', $event)"
        ></el-switch>
      </div>
      <div class="other-row">
        <span>导航页</span>
        <el-switch
          v-model="showTabs"
          class="custom-switch"
          @change="changeSetting('showTabs', $event)"
        ></el-switch>
      </div>
    </div>
    <el-button class="draw-save">保存</el-button>
  </el-drawer>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { useStore } from 'vuex'
import { _data, _changeSetting, _getThemes } from './index.js'
export default {
  setup() {
    const data = reactive(_data)
    const store = useStore()
    onMounted(() => {
      _getThemes({ data })
    })
    const showDraw = () => (data.drawer = true)
    const changeSetting = (type, value) => {
      _changeSetting({ type, value, store, data })
    }
    const params = toRefs(data)
    return {
      ...params,
      showDraw,
      changeSetting
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/themes.scss';
$nav-bg-dark: #273352;

.draw-content {
  height: calc(100% - 30px);
  overflow-y: auto;
}

.day-mode {
  padding-bottom: 10px 0;
}

.nav-row {
  display: flex;
}

.nav-item {
  width: 56px;
  height: 50px;
  margin-right: 16px;
  border-radius: 4px;
  background-color: #f0f2f5;
  position: relative;
  box-shadow: 0 0 2px rgba(20, 16, 16, 0.2);
  cursor: pointer;
  border: 2px solid #fff;

  &.active {
    border-color: $systemTheme;
  }

  //  box-shadow: 0 0 2.5px red;
  &.nav-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 17px;
    background-color: $nav-bg-dark;
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
  }

  &.nav-item::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 12px;
    background-color: #fff;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }

  &.nav-item-0::before {
    z-index: 1;
  }

  &.nav-item-1::before {
    background-color: #fff;
  }

  &.nav-item-1::after,
  &.nav-item-2::after {
    background-color: $nav-bg-dark;
    border-top-left-radius: inherit;
    border-bottom-right-radius: 0;
  }

  &.nav-item-2::before {
    display: none;
  }

  &.nav-item-3::before {
    z-index: 1;
    width: 14px;
    box-shadow: 8px 0 0 #fff;
  }

  &.nav-item-3::after {
    right: 0;
    border-bottom-right-radius: 0;
  }
}

.checkbox-row {
  display: flex;
  justify-content: space-between;

  .checkbox-item {
    width: 20px;
    height: 20px;
    border: 1px solid #ddd;
    border-radius: 2px;
    cursor: pointer;
    position: relative;

    &.active {
      border-color: $systemTheme;

      &::before {
        content: '\2713';
        font-size: 14px;
        color: #fff;
        position: absolute;
        top: -1px;
        left: 3px;
      }
    }
  }
}

::v-deep(.el-color-picker) {
  width: 20px !important;
  height: 20px !important;
}

::v-deep(.el-color-picker__trigger) {
  width: 20px !important;
  height: 20px !important;
}

::v-deep(.el-color-picker__color) {
  border: none !important;
}

::v-deep(.el-color-picker__trigger) {
  padding: 0 !important;
}
.other-row {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  color: #273352;
  margin-bottom: 15px;
}
.night-mode {
  .other-row {
    color: #c9d1d9;
  }
}

.draw-save {
  height: 32px;
  width: 100%;
  background-color: $systemTheme;
  color: #fff;
}
</style>
