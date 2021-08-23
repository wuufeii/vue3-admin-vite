<template>
  <div class="tabs-content">
    <arrow-left class="tabs-svg border-right" @click="handleScroll('left')" />
    <div class="tabs-scroll" ref="tabsOut">
      <div class="tabs-row" ref="tabsInner" :style="{ left: left + 'px' }">
        <el-tag v-for="(item, index) in tags" :key="index" :class="{ 'is-active': item.active }"
          :closable="!item.unCloseable" @click="handleTag(item)" @close="handleClose(item, index)">
          {{ item.name }}
        </el-tag>
      </div>
    </div>
    <arrow-right class="tabs-svg border-left" @click="handleScroll('right')" />
    <el-dropdown trigger="click">
      <arrow-down class="tabs-svg border-left" />
      <template #dropdown>
        <el-dropdown-menu class="tabs-menu">
          <el-dropdown-item @click="handleMenuClose('current')" icon="el-icon-close">关闭当前标签页</el-dropdown-item>
          <el-divider></el-divider>
          <el-dropdown-item @click="handleMenuClose('left')" icon="el-icon-download left">关闭左侧标签页</el-dropdown-item>
          <el-dropdown-item @click="handleMenuClose('right')" icon="el-icon-download right">关闭右侧标签页</el-dropdown-item>
          <el-divider></el-divider>
          <el-dropdown-item @click="handleMenuClose('other')" icon="el-icon-document-remove">关闭其他标签页</el-dropdown-item>
          <el-dropdown-item @click="handleMenuClose('all')" icon="el-icon-document-delete">关闭所有标签页</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
  import { reactive, toRefs, ref, watch } from 'vue'
  import { ArrowLeft, ArrowRight, ArrowDown, Close, Download, DocumentRemove, DocumentDelete } from '@element-plus/icons'
  import { setTags, getTags } from 'utils/storage.js'
  import { useStore } from 'vuex'
  export default {
    components: { ArrowLeft, ArrowRight, ArrowDown, Close, Download, DocumentRemove, DocumentDelete },
    setup() {
      const store = useStore()
      const data = reactive({
        left: 0,
        tags: getTags()
      })

      const tabsOut = ref(null)
      const tabsInner = ref(null)

      // tabs 左右滑动
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
      const handleClose = (obj, index) => {
        if (obj.active) {
          handleMenuClose('current')
        } else {
          data.tags.splice(index, 1)
          setTags(data.tags)
        }
      }

      // 显示tags菜单
      const handleMenuClose = (type) => {
        let tags = data.tags
        let currentIdx = 0
        let menuId = ''
        tags.forEach((item, index) => {
          if (item.active) currentIdx = index
        })
        if (type === 'current') {
          currentIdx = currentIdx > 0 ? currentIdx - 1 : currentIdx + 1
          menuId = tags[currentIdx]?.id ?? ''
          tags = tags.filter(item => !item.active)
          store.commit('getActiveMenu', menuId)
        } else if (type === 'other') {
          tags = tags.filter(item => item.active)
          data.tags = tags
        } else if (type === 'all') {
          tags = tags.filter(item => item.unCloseable)
          store.commit('getActiveMenu', '')
        } else {
          let len = tags.length - 1
          type === 'left' ? tags.splice(0, currentIdx) : tags.splice(currentIdx + 1, len - currentIdx)
        }
        setTags(tags, menuId)
      }

      watch(
        () => store.state.activeMenu,
        (value, old) => {
          data.tags = getTags()
        }
      )

      return {
        ...toRefs(data),
        tabsOut,
        tabsInner,
        handleScroll,
        handleTag,
        handleClose,
        handleMenuClose
      }
    }
  }
</script>

<style>
</style>
