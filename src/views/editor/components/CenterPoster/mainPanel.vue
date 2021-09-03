<!--
 * @Author: your name
 * @Date: 2021-09-01 20:02:33
 * @LastEditTime: 2021-09-02 19:57:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \H5_online_vue\src\views\editor\components\CenterPoster\mainPanel.vue
-->
<template>
  <div
    class="main-panel"
    :style="{
      width: canvasSize.width + 'px',
      height: canvasSize.height + 'px'
    }"
    @mousedown.prevent.stop=""
  >
    <!-- marginLeft: -canvasSize.width / 2 + 'px' -->

    <!-- <background-widget
      v-if="background"
      :key="background.id"
      :item="background"
      v-on="$listeners"
    /> -->
    <!-- 组件容器 -->
    <widget-container
      v-for="item in posterItems"
      v-show="item.visible"
      :key="item.id"
      :item="item"
      v-on="$listeners"
    />
    <!-- 辅助组件 -->
    <component
      :is="item.componentName"
      v-for="item in assistWidgets"
      v-show="item.visible"
      :key="item.id"
      :item="item"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import widgetContainer from '../templates/widget'
// import backgroundWidget from './widgets/backgroundWidget'
// import drawRectWidget from './assistWidgets/drawRectWidget'

const { mapState } = createNamespacedHelpers('poster')

export default {
  components: {
    widgetContainer
    // backgroundWidget,
    // drawRectWidget
  },
  data () {
    return {}
  },
  computed: {
    ...mapState([
      'posterItems',
      'canvasSize',
      'background',
      'assistWidgets',
      'pageTitle'
    ])

  }
}
</script>
<style lang="less" scoped>
.main-panel {
  background-color: #fff;
  /* position: absolute; */
  top: 50px;
  margin: 0 auto;
  position: relative;
  user-select: none;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  transition-property: height;
  transition: 0.4s;
  cursor: initial;
  .poster-item-container {
    /* position: absolute;
    top: 0; */
  }
  .custom-contextmenu {
    z-index: 999;
  }
}
</style>
