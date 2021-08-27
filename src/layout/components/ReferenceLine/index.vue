<!--
 * @Author: your name
 * @Date: 2021-08-26 19:56:42
 * @LastEditTime: 2021-08-26 19:57:15
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \h5_online_editor\src\layout\components\ReferenceLine\index.vue
-->
<template>
  <div class="reference-line-setting">
    <div>
      <span>
        打开参考线
      </span>
      <el-switch v-model="referenceLineOpened" />
    </div>
    <div>
      <el-button type="primary" size="mini" @click="removeAll">清空参考线</el-button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    referenceLineOpened: {
      get () {
        return this.$store.state.poster.referenceLineOpened
      },
      set (val) {
        this.$store.dispatch('poster/setReferenceLineVisible', val)
      }
    }
  },
  methods: {
    removeAll () {
      this.$store.dispatch('poster/removeAllReferenceLine')
    }
  }
}
</script>

<style lang="less" scoped>
.reference-line-setting {
  & > div {
    display: flex;
    justify-content: space-between;
    .el-button {
      margin-top: 14px;
      width: 100%;
    }
  }
}
</style>
