<!--
 * @Author: your name
 * @Date: 2021-09-06 12:49:09
 * @LastEditTime: 2021-09-07 19:51:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \H5_online_vue\src\views\editor\components\ControlComponent\imageControl.vue
-->
<template>
  <div class="image-control">
    <base-control :drag-info="dragInfo" />
    <!-- <el-collapse v-model="activeNames">
      <el-collapse-item name="position">
        <template #title>
          <div class="header">
            位置
          </div>
        </template>
        <base-control :drag-info="dragInfo" />
      </el-collapse-item>
    </el-collapse> -->
  </div>
</template>

<script>
import BaseControl from './base.vue'
import { styleMixin } from '@/mixins/updateStyle'

export default {
  components: {
    BaseControl
  },
  mixins: [styleMixin],
  data () {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
.image-control {
  width: 100%;
  .header {
    box-sizing: border-box;
    padding: 0 20px;
  }
  .setting-content {
    background-color: rgb(238, 238, 238);
    box-sizing: border-box;
    padding: 0 20px 10px;
  }
  .setting-item {
    .title {
    }
    .content {
      input {
        width: 100%;
        height: 34px;
        border: 1px solid rgb(117, 117, 117);
        box-sizing: border-box;
        padding: 0 4px;
      }
    }
  }
}
</style>
