<!--
 * @Author: your name
 * @Date: 2021-08-25 18:48:41
 * @LastEditTime: 2021-08-25 20:44:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \h5_online_editor\src\views\editor\index.vue
-->
<template>
  <div class="poster-editor">
    <div class="base">
      <!-- <left-side /> -->
      <center-poster ref="main" />
      <!-- <extend-side-bar />
      <control-component /> -->
    </div>
    <!-- 图层面板 -->
    <!-- <transition name="el-zoom-in-top">
      <layer-panel v-show="layerPanelOpened" />
    </transition> -->
  </div>
</template>

<script>
import CenterPoster from './components/CenterPoster'
export default {
  data () {
    return {}
  },
  components: {
    CenterPoster
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
