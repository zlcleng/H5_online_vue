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
    <base-component />
  </div>
</template>

<script>
import BaseComponent from './base.vue'
export default {
  components: {
    BaseComponent
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.poster-editor-control {
  width: 100%;
  height: 100%;
  position: relative;
  .control-target {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
}
</style>
