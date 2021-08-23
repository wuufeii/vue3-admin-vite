<template>
  <div class="tabs-content">
    <div class="tabs-scroll">
      <el-tabs
        v-model="activeMenu"
        type="card"
        @tab-click="handleTag"
        @tab-remove="handleClose"
      >
        <el-tab-pane
          :closable="!item.unCloseable"
          :name="item.id"
          v-for="(item, index) in tags"
          :key="index"
          :label="item.name"
        >
          {{ item.name }}
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dropdown trigger="click">
      <arrow-down class="tabs-svg border-left" />
      <template #dropdown>
        <el-dropdown-menu class="tabs-menu">
          <el-dropdown-item
            @click="handleMenuClose('current')"
            icon="el-icon-close"
          >
            关闭当前标签页
          </el-dropdown-item>
          <el-divider></el-divider>
          <el-dropdown-item
            @click="handleMenuClose('left')"
            icon="el-icon-download left"
          >
            关闭左侧标签页
          </el-dropdown-item>
          <el-dropdown-item
            @click="handleMenuClose('right')"
            icon="el-icon-download right"
          >
            关闭右侧标签页
          </el-dropdown-item>
          <el-divider></el-divider>
          <el-dropdown-item
            @click="handleMenuClose('other')"
            icon="el-icon-document-remove"
          >
            关闭其他标签页
          </el-dropdown-item>
          <el-dropdown-item
            @click="handleMenuClose('all')"
            icon="el-icon-document-delete"
          >
            关闭所有标签页
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { reactive, toRefs, ref, watch } from 'vue'
import {
  ArrowDown,
  Close,
  Download,
  DocumentRemove,
  DocumentDelete
} from '@element-plus/icons'
import { setTags, getTags } from 'utils/storage.js'
import { useStore } from 'vuex'
export default {
  components: {
    ArrowDown,
    Close,
    Download,
    DocumentRemove,
    DocumentDelete
  },
  setup() {
    const store = useStore()
    const data = reactive({
      left: 0,
      tags: getTags(),
      activeMenu: ''
    })

    data.tags.forEach((item) => {
      if (item.active) data.activeMenu = item.id
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
      store.commit('getActiveMenu', obj.props.name)
      setTags(data.tags, obj.props.name)
    }

    // 关闭tag
    const handleClose = (value) => {
      let idx = 0
      let active = false
      data.tags.forEach((item, index) => {
        if (item.id === value) {
          idx = index
          active = item.active
        }
      })
      if (active) {
        handleMenuClose('current')
      } else {
        data.tags.splice(idx, 1)
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
        tags = tags.filter((item) => !item.active)
        store.commit('getActiveMenu', menuId)
      } else if (type === 'other') {
        tags = tags.filter((item) => item.active)
        data.tags = tags
      } else if (type === 'all') {
        tags = tags.filter((item) => item.unCloseable)
        store.commit('getActiveMenu', '')
      } else {
        let len = tags.length - 1
        type === 'left'
          ? tags.splice(0, currentIdx)
          : tags.splice(currentIdx + 1, len - currentIdx)
      }
      setTags(tags, menuId)
    }

    watch(
      () => store.state.activeMenu,
      (value, old) => {
        data.activeMenu = value
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

<style></style>
