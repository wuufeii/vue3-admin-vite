<template>
  <el-menu
    default-active="2"
    :mode="mode"
    :collapse="isCollapse"
    :class="{ 'no-transition': isCollapse }"
  >
    <logo v-if="isShowLogo"></logo>
    <el-submenu index="1">
      <template #title>
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
      <el-menu-item index="1-3">选项3</el-menu-item>
      <el-submenu index="1-4">
        <template #title>选项4</template>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span v-if="showSpan">导航二</span>
      <template #title>导航二</template>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-document"></i>
      <span v-if="showSpan">导航三</span>
      <template #title>导航三</template>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span v-if="showSpan">导航四</span>
      <template #title>导航四</template>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import Logo from '../Logo.vue'
export default {
  components: { Logo },
  props: {
    mode: String,
    showLogo: Boolean,
    collapse: Boolean
  },
  setup(props) {
    const collapse = props.collapse
    const data = reactive({
      showSpan: collapse
    })
    const store = useStore()

    const isShowLogo = computed(() => {
      return props.showLogo
    })
    const isCollapse = computed(() => {
      if (props.collapse) {
        return collapse
      } else {
        return store.state.isCollapse
      }
    })

    const params = toRefs(data)
    return {
      ...params,
      isShowLogo,
      isCollapse
    }
  }
}
</script>

<style></style>
