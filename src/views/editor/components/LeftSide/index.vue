<!--
 * @Author: your name
 * @Date: 2021-08-31 20:10:58
 * @LastEditTime: 2021-09-02 13:29:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \h5_online_editor\src\views\editor\components\LeftSide\index.vue
-->
<template>
  <div class="left-side-container">
    <library />
  </div>
</template>
<script>
import Library from './library.vue'

export default {
  components: { Library },
  data () {
    return {}
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // this.addBackground(
      //   new BackgroundWidget({
      //     backgroundColor: '#fff',
      //     isSolid: true,
      //     lock: true
      //   })
      // )
    }
  }
}
</script>

<style lang="less" scoped>
.left-side-container {
  width: 300px;
}
</style>
