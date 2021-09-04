<template>
  <el-tooltip
    class="item"
    effect="dark"
    :content="fullscreen ? '退出全屏' : '全屏'"
    placement="bottom"
  >
    <svg-icon v-if="!fullscreen" name="full-screen-max" @click="handleFullScreen"></svg-icon>
    <svg-icon :sss="fullscreen" v-else name="full-screen-min" @click="handleFullScreen"></svg-icon>
  </el-tooltip>
</template>
./test
<script>
import { reactive, toRefs } from 'vue'
import { changeFullScreen, listenerEvent } from './fullScreen'
export default {
  setup() {
    const data = reactive({
      fullscreen: false
    })
    listenerEvent(() => {
      data.fullscreen = !data.fullscreen
    }, data)
    // 全屏切换
    const handleFullScreen = () => changeFullScreen(data)
    const params = toRefs(data)
    return {
      ...params,
      handleFullScreen
    }
  }
}
</script>

<style></style>
