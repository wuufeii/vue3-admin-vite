<template>
  <div class="el-logo">
    <img src="@/assets/logo.png" alt="" />
    <span class="title" :class="{ 'is-hide': isHideTitle }">XX系统</span>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'Logo',
  setup() {
    const store = useStore()
    const isHideTitle = computed(() => {
      return store.state.isCollapse
    })

    return {
      isHideTitle
    }
  }
}
</script>
