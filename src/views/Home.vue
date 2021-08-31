<template>
  <el-row :gutter="16">
    <el-col :xs="24" :sm="12" :md="6">
      <el-card shadow="never">
        <template #header>
          <span class="left">访问数</span>
          <span class="right card-header-label green">年</span>
        </template>
        <div class="card-body">
          <span class="num">64353</span>
          <div class="flex-justify-between bottom">
            <span>总访问数</span>
            <span>265432</span>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="12" :md="6">
      <el-card shadow="never">
        <template #header>
          <span class="left">下载量</span>
          <span class="right card-header-label blue">月</span>
        </template>
        <div class="card-body">
          <span class="num">2542</span>
          <div class="flex-justify-between bottom">
            <span>总下载量</span>
            <span>14365</span>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="12" :md="6">
      <el-card shadow="never">
        <template #header>
          <span class="left">成交数</span>
          <span class="right card-header-label orange">周</span>
        </template>
        <div class="card-body">
          <span class="num">1434</span>
          <div class="flex-justify-between bottom">
            <span>总成交数</span>
            <span>1455</span>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="12" :md="6">
      <el-card shadow="never">
        <template #header>
          <span class="left">收藏数</span>
          <span class="right card-header-label purple">日</span>
        </template>
        <div class="card-body">
          <span class="num">4692</span>
          <div class="flex-justify-between bottom">
            <span>总收藏数</span>
            <span>87491</span>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <el-card shadow="never">
        <div class="details">
          <span>技术栈：</span>
          vue3.x + vite2.x + vuex4.x + vue-router4.x + element Plus1.x
        </div>
        <div class="details">
          <span>特 点：</span>
          一键换肤，自定义颜色换肤，多种布局方式，上手及其简单
        </div>
        <div class="details">
          <span>作 者：</span>
          wuufeii
        </div>
        <div class="details">
          <span>github：</span>
          <a href="https://www.github.com/wuufeii" target="_blank">
            https://www.github.com/wuufeii
          </a>
        </div>
        <div class="details">
          <span>博 客：</span>
          <a href="https://wuufeii.github.io" target="_blank">
            https://wuufeii.github.io
          </a>
        </div>
      </el-card>
    </el-col>
  </el-row>
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

<style lang="scss" scoped>
.el-row {
  .el-col {
    margin-bottom: 1rem;
  }
}
.card-header-label {
  font-size: 12px;
  padding: 2px 7px;
  border: 1px solid #eee;
  &.green {
    color: #389e0d;
    background: #f6ffed;
    border-color: #b7eb8f;
  }
  &.blue {
    color: #096dd9;
    background: #e6f7ff;
    border-color: #91d5ff;
  }
  &.orange {
    color: #d46b08;
    background: #fff7e6;
    border-color: #ffd591;
  }
  &.purple {
    color: #531dab;
    background: #f9f0ff;
    border-color: #d3adf7;
  }
}
.card-body {
  padding: 0.5rem 1rem;
  .num {
    display: inline-block;
    font-size: 1.5rem;
    padding-bottom: 1rem;
  }
  .bottom {
    font-size: 0.875rem;
  }
}
.details {
  padding: 0.5rem 1rem;
  > span {
    color: #999;
  }
}
</style>
