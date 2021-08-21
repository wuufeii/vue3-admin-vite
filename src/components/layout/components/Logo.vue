<template>
  <div class="el-logo">
    <img src="@/assets/logo.png" alt="" />
    <span class="title" :class="{ 'is-show': isShowTitle }">XX系统</span>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const isShowTitle = computed(() => {
      return store.state.isCollapse
    })

    return {
      isShowTitle
    }
  }
}
</script>
