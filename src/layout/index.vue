<!--
 * @Author: your name
 * @Date: 2021-08-25 18:48:00
 * @LastEditTime: 2021-08-26 17:32:18
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \h5_online_editor\src\layout\index.vue
-->
<template>
  <div class="page-layout">
    <div class="page-header-wrapper">
      <page-header>
        <extend-actions />
      </page-header>
    </div>
    <router-view class="sub-page" />
  </div>
</template>

<script>
import PageHeader from './components/PageHeader'
import ExtendActions from './components/ExtendActions'

export default {
  components: {
    PageHeader,
    ExtendActions
  }
}
</script>

<style scoped>
  .page-layout{
    height: 100%;
    padding-top: 48px;
  }
  .sub-page{
    position: relative;
    height: 100%;
  }
  .page-header-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }
</style>
