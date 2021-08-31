<!--
 * @Author: your name
 * @Date: 2021-08-25 18:48:41
 * @LastEditTime: 2021-08-31 20:10:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \h5_online_editor\src\views\editor\index.vue
-->
<template>
  <div class="poster-editor">
    <div class="base">
      <!-- 左边组件库 -->
      <left-side />
      <!-- 中间编辑模块 -->
      <center-poster ref="main" />
      <!-- <extend-side-bar />
      <control-component /> -->
    </div>
    <!-- 图层面板 -->
    <transition name="el-zoom-in-top">
      <layer-panel v-show="layerPanelOpened" />
    </transition>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { CenterPoster, LayerPanel, LeftSide } from './components'
const { mapState } = createNamespacedHelpers('poster')

export default {
  data () {
    return {}
  },
  components: {
    CenterPoster,
    LayerPanel,
    LeftSide
  },
  computed: {
    ...mapState([
      'layerPanelOpened'
    ])
  }
}
</script>
<style lang="less" scoped>
.poster-editor {
  width: 100%;
  min-width: 900px;
  height: 100%;
  background-color: #fff;
  position: fixed;
  .base {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
  }
  .poster-editor-main {
    flex: 1;
    height: 100%;
    box-sizing: border-box;
  }
}

</style>
