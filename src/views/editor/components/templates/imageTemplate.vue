<!--
 * @Author: your name
 * @Date: 2021-09-01 20:04:22
 * @LastEditTime: 2021-09-01 20:27:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \H5_online_vue\src\views\editor\components\CenterPoster\image.vue
-->
<template>
  <div class="image-widget" style="width:100%;height:100%">
    <img
      ref="image"
      :src="wState.src"
      class="qr-code"
      style="width:100%;height:100%"
      ondragstart="return false"
      @load="load"
    >
    <!-- <portal v-if="isActive" :to="$data.$controlTarget">
      <image-control :key="item.id" :item="item" />
    </portal> -->
  </div>
</template>

<script>
// import imageControl from '../../control/widgets/imageControl'
import { ImageWidget } from '@/constructor/widget'

export default {
  // components: { imageControl },
  mixins: [ImageWidget.widgetMixin()],
  data () {
    return {}
  },
  methods: {
    load () {
      if (!this.item.isCopied) {
        const imgRef = this.$refs.image
        const width = imgRef.naturalWidth
        const height = imgRef.naturalHeight
        this.updateDragInfo({ w: 100, h: parseInt((100 * height) / width) })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.drag-item {
  user-select: none;
  img {
    /* drag */
  }
}
</style>
