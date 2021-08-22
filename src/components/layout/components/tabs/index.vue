<template>
  <div class="tabs-content">
    <arrow-left class="tabs-svg border-right" @click="handleScroll('left')" />
    <div class="tabs-scroll" ref="tabsOut">
      <div class="tabs-row" ref="tabsInner" :style="{ left: left + 'px' }">
        <el-tag
          v-for="(item, index) in tags"
          :key="index"
          :class="{ 'is-active': item.active }"
          :closable="!item.closeable"
          @click="handleTag(item)"
          @close="closeTag(item, index)"
        >
          {{ item.name }}
        </el-tag>
      </div>
    </div>
    <arrow-right class="tabs-svg border-left" @click="handleScroll('right')" />
    <arrow-down class="tabs-svg border-left" />
  </div>
</template>

<script>
import { reactive, toRefs, ref, watch } from 'vue'
import { ArrowLeft, ArrowRight, ArrowDown } from '@element-plus/icons'
import { setTags, getTags } from 'utils/storage.js'
import {useStore} from 'vuex'
export default {
  components: { ArrowLeft, ArrowRight, ArrowDown },
  setup() {
    const store = useStore()
    const data = reactive({
      left: 0,
      tags: getTags()
    })

    const tabsOut = ref(null)
    const tabsInner = ref(null)

    // tabs 作用滑动
    const handleScroll = (type) => {
      const num = 300
      const outWidth = tabsOut.value.offsetWidth
      const innerWidth = tabsInner.value.offsetWidth
      if (innerWidth > outWidth) {
        if (type === 'right') {
          if (outWidth - data.left < innerWidth - num) {
            data.left -= num
          } else {
            data.left = outWidth - innerWidth
          }
        } else {
          if (-data.left > num) {
            data.left += num
          } else {
            data.left = 0
          }
        }
      }
    }

    // 点击tag
    const handleTag = (obj) => {
      store.commit('getActiveMenu', obj.id)
      setTags(data.tags, obj.id)
    }

    // 关闭tag
    const closeTag = (obj, index) => {
      const i = index > 0 ? index-1 : index+1
      console.log(i)
      let activeMenu = ''
      if(obj.active) {
        activeMenu = data.tags[i]?.id??''
        store.commit('getActiveMenu', activeMenu)
      }
      data.tags.splice(index, 1)
      setTags(data.tags,activeMenu)
    }

    watch(() => store.state.activeMenu, (value,old) => {
      data.tags = getTags()
    })

    return {
      ...toRefs(data),
      tabsOut,
      tabsInner,
      handleScroll,
      handleTag,
      closeTag
    }
  }
}
</script>

<style>
</style>
