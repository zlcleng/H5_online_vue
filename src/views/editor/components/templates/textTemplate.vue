<template>
  <div class="text-widget">
    <div
      v-if="!isEditing"
      key="1"
      class="text-container"
      contenteditable="false"
      :style="textStyle"
      v-html="text"
    >
      {{ text }}
    </div>
    <div
      v-else
      key="2"
      ref="textContainer"
      v-clickoutside="saveText"
      class="text-container editing"
      contenteditable="true"
      :style="textStyle"
      v-html="text"
    >
      {{ text }}
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { TextWidget } from '@/constructor/widget'
import { clickoutside } from '@/directives'
const { mapState, mapActions } = createNamespacedHelpers('poster')

export default {
  directives: { clickoutside },
  mixins: [TextWidget.widgetMixin()],
  data () {
    return {
      isEditing: false
    }
  },
  computed: {
    ...mapState(['canvasSize']),
    text () {
      return this.wState.text
    },
    textStyle () {
      return this.wState.style
    }
  },
  watch: {
    isEditing (newVal) {
      this.$emit('draggableChange', !newVal)
    }
  },
  created () {
    if (!this.item.isCopied) {
      this.updateDragInfo({
        w: 160,
        h: 50,
        x: (this.canvasSize.width - 160) / 2,
        y: 200
      })
    }
  },
  mounted () {
    this.$dragRef.$el.addEventListener('dblclick', () => {
      this.openEditing()
    })
  },
  methods: {
    ...mapActions(['setWidgetConfig', 'updateWidgetState']),
    getMenuList () {
      return []
    },
    openEditing () {
      this.isEditing = true
      this.$nextTick(() => {
        const ref = this.$refs.textContainer
        if (!ref) return
        const selection = window.getSelection()
        const range = document.createRange()
        range.selectNodeContents(ref)
        selection.removeAllRanges()
        selection.addRange(range)
      })
    },
    saveText (text) {
      const ref = text || this.$refs.textContainer
      this.isEditing = false
      console.log(ref.innerHTML)
      this.updateWidgetState({
        keyPath: 'text',
        value: ref.innerHTML,
        widgetId: this.item.id
      })
      console.log(this.text)
    }
  }
}
</script>
<style lang="less" scoped>
.text-widget {
  width: 100%;
  height: 100%;
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
