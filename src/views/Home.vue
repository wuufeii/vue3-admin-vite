<template>
  <div>
    <el-row style="margin-bottom: 10px">
      <el-button>默认按钮</el-button>
    </el-row>
    <el-row style="margin-bottom: 10px">
      <el-switch v-model="value" />
    </el-row>
    <el-row style="margin-bottom: 10px">
      <el-checkbox v-model="value">备选项</el-checkbox>
    </el-row>
    <el-row style="margin-bottom: 10px">
      <el-input></el-input>
    </el-row>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Home',
  setup() {
    let value = ref(true)
    return {
      value
    }
  }
}
</script>

<style lang="scss" scoped></style>
