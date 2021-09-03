<!--
 * @Author: your name
 * @Date: 2021-09-02 19:16:15
 * @LastEditTime: 2021-09-02 19:33:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \H5_online_vue\src\layout\components\ExtendActions\changePageSize.vue
-->
<template>
  <div class="change-page-size">
    <div class="item" title="无法修改宽度">
      <el-input-number v-model="width" :min="10" size="mini" label="高度" @blur="save" />
    </div>
    <span>×</span>
    <div class="item">
      <el-input-number v-model="height" :min="10" size="mini" label="宽度" @blur="save" />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('poster')

export default {
  data () {
    return {
      width: 0,
      height: 0
    }
  },
  computed: {
    ...mapState({
      canvasWidth: (state) => state.canvasSize.width,
      canvasHeight: (state) => state.canvasSize.height
    })
  },
  created () {
    this.width = this.canvasWidth
    this.height = this.canvasHeight
  },
  methods: {
    ...mapActions(['setCanvasSize', 'seekBackgroundSize']),
    save () {
      const { width, height, canvasWidth, canvasHeight } = this
      if (width === canvasWidth && height === canvasHeight) {
        return
      }
      this.setCanvasSize({ width: this.width, height: this.height })
      this.seekBackgroundSize()
    }
  }
}
</script>
<style lang="less" scoped>
.change-page-size {
  display: flex;
  align-items: center;
  margin-right: 10px;
  >span {
    font-size: 20px;
    margin: 0 8px;
  }
  .item {
    display: inline-block;
    /deep/ .el-input {
      &-number {
        &--mini {
          width: 50px;
        }
        &__decrease, &__increase {
          display: none;
        }
      }
      &__inner {
        padding: 0 2px;
      }

    }
  }
}
</style>
