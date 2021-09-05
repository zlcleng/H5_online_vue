<!--
 * @Author: your name
 * @Date: 2021-09-03 13:12:19
 * @LastEditTime: 2021-09-03 13:26:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \H5_online_vue\src\views\editor\components\ControlComponent\index.vue
-->
<template>
  <div class="poster-editor-control poster-editor_deactivated-ignore">
    <portal-target name="widgetControl" class="control-target" />
    <!-- <base-control /> -->
  </div>
</template>

<script>
// import BaseControl from './base.vue'
export default {
  components: {
    // BaseControl
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.poster-editor-control {
  width: 250px;
  height: 100%;
  position: relative;
  .control-target {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
}
</style>
