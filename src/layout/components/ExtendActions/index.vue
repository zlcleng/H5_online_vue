<!--
 * @Author: your name
 * @Date: 2021-08-26 17:31:37
 * @LastEditTime: 2021-09-02 19:21:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \h5_online_editor\src\layout\components\ExtendActions\index.vue
-->
<template>
  <div class="extend-side-bar">
    <change-page-size />
    <div class="list">
      <el-tooltip
        effect="dark"
        content="撤销 ctrl+z"
        placement="bottom"
        transition="el-zoom-in-center"
      >
        <div class="item" :class="{ disabled: !couldUndo }" @click="undo">
          <i class="iconfont icon-chexiao" />
        </div>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="恢复 ctrl+shift+z"
        placement="bottom"
        transition="el-zoom-in-center"
      >
        <div
          class="item"
          :class="{ disabled: !couldRedo }"
          @click="redo"
        >
          <i class="iconfont icon-chongzuo" />
        </div>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="图层面板 ctrl+L"
        placement="bottom"
        transition="el-zoom-in-center"
      >
        <div
          class="item"
          :class="{ active: layerPanelOpened }"
          @click="openLayer"
        >
          <i class="iconfont icon-control-top" />
        </div>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="参考线 ctrl+h"
        placement="bottom"
        transition="el-zoom-in-center"
      >
        <el-popover
          placement="bottom"
          title="参考线"
          width="200"
          trigger="click"
          transition="el-zoom-in-center"
        >
          <reference-line />
          <div slot="reference" class="item">
            <i class="iconfont icon-wangge" />
          </div>
        </el-popover>
      </el-tooltip>
      <!-- <el-tooltip
        effect="dark"
        content="生成H5代码（Beta）"
        placement="bottom"
        transition="el-zoom-in-center"
      >
        <div class="item" @click="exportH5">
          <i class="icon-h5" />
        </div>
      </el-tooltip> -->
      <el-tooltip
        effect="dark"
        content="生成海报"
        placement="bottom"
        transition="el-zoom-in-center"
      >
        <div class="item" @click="exportPoster">
          <i class="iconfont icon-tupian" />
        </div>
      </el-tooltip>
      <!-- <el-tooltip
        effect="dark"
        content="快捷键参考"
        placement="bottom"
        transition="el-zoom-in-center"
      >
        <div class="item" @click="openSettingCenter('shortcut')">
          <i class="el-icon-thumb" />
        </div>
      </el-tooltip> -->
      <!-- <el-tooltip
        effect="dark"
        content="编辑器设置"
        placement="bottom"
        transition="el-zoom-in-center"
      >
        <div class="item" @click="openSettingCenter">
          <i class="el-icon-set-up" />
        </div>
      </el-tooltip> -->
      <!-- <el-tooltip
        v-for="item in plugins"
        :key="item.name"
        effect="dark"
        :content="item.name"
        placement="bottom"
        transition="el-zoom-in-center"
      >
        <div class="item">
          <i :class="item.icon" />
        </div>
      </el-tooltip> -->
    </div>
  </div>
</template>
<script>
import ChangePageSize from './changePageSize.vue'
import { createNamespacedHelpers } from 'vuex'
import ExportActions from '@/utils/exports'
import ReferenceLine from '../ReferenceLine'
// const { mapPosterState, mapPosterActions } = createNamespacedHelpers('poster')
const { mapState: mapHitoryState, mapActions: mapHistoryActions } = createNamespacedHelpers('history')

export default {
  components: { ReferenceLine, ChangePageSize },
  data () {
    return {}
  },
  computed: {
    ...mapHitoryState({
      layerPanelOpened: 'layerPanelOpened',
      couldRedo: state => state.nextStack.length > 0,
      couldUndo: state => state.preStack.length > 0
    })
    // plugins () {
    //   return Object.freeze(plugins)
    // }
  },
  methods: {
    ...mapHistoryActions(['undo', 'redo']),
    // 导出海报
    exportPoster () {
      ExportActions.exportPoster()
    },
    // 打开图层面板
    openLayer () {
      this.$store.dispatch('poster/setLayerPanel', !this.layerPanelOpened)
    }
  }
}
</script>

<style lang="less" scoped>
.extend-side-bar {
  display: flex;
  justify-content: center;
  align-items: center;
}
.list {
  display: flex;
  justify-content: center;
  .item {
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
    /* transition: 0.2s; */
    border-radius: 4px;
    i {
      font-size: 18px;
      &.icon-undo {
        font-size: 14px;
      }
      &.el-icon-set-up {
        font-size: 22px;
      }
    }
    &:hover,
    &.active {
      color: rgb(45, 81, 204);
    }
    &.disabled {
      color: #999;
    }
  }
}
</style>
