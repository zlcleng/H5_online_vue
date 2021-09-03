<!--
 * @Author: your name
 * @Date: 2021-09-01 20:05:17
 * @LastEditTime: 2021-09-01 20:20:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \H5_online_vue\src\views\editor\components\CenterPoster\widget.vue
-->
<template>
  <draggable-resizable
    ref="drag"
    :w="dragInfo.w"
    :h="dragInfo.h"
    :x="dragInfo.x"
    :y="dragInfo.y"
    :r="dragInfo.rotateZ"
    :minw="10"
    :minh="1"
    :resizable="true"
    :lock="item.lock"
    :active.sync="isActive"
    class="drag-item"
    deselect-cancel=".poster-editor_deactivated-ignore"
    :draggable="draggable"
    @activated="activated"
    @deactivated="deactivated"
    @dragging="onDrag"
    @resizing="onResize"
    @rotating="onRotate"
    @dragstop="onDragStop"
    @rotatestop="onRotateStop"
    @resizestop="onResizeStop"
  >
    <component
      :is="item.componentName"
      ref="widget"
      :item="item"
      :is-active="isActive"
      v-on="$listeners"
      @draggableChange="draggable = $event"
    />
  </draggable-resizable>
</template>

<script>
import { DraggableResizable } from '@/components'
import { Widget } from '@/constructor/widget'
import exportWidgets from '../CenterPoster/exportWidgets'

export default {
  components: { DraggableResizable, ...exportWidgets },
  mixins: [Widget.superMixin()],
  data () {
    return {
      draggable: true
    }
  }
}
</script>
<style lang="less" scoped>
.drag-item {
  user-select: none;
  .text-container {
    box-sizing: border-box;
    margin: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    white-space: wrap;
    word-break: break-all;
    &.editing {
      position: relative;
    }
  }
}
</style>
