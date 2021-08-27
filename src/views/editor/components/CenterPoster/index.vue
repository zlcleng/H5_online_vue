<!--
 * @Author: your name
 * @Date: 2021-08-25 19:59:17
 * @LastEditTime: 2021-08-26 11:51:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \h5_online_editor\src\views\editor\components\CenterMain\index.vue
-->
<template>
  <div ref="main" class="poster-editor-main" @contextmenu.prevent="">
    <div ref="mainPanelScrollContent" class="main-panel-scroll-content">
      <!-- <main-panel ref="mainPanel" @openContextmenu="openContextmenu" /> -->
    </div>
    <div class="mask" :style="maskStyle" />
    <ruler />
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import Ruler from '../Ruler'
import { throttle } from 'lodash'
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
import ScrollBar from '@better-scroll/scroll-bar'

const { mapState } = createNamespacedHelpers('poster')

export default {
  components: { Ruler },
  data () {
    return {
      maskBorderWidth: '',
      maskHeight: 0
    }
  },
  watch: {
    canvasSize: {
      handler () {
        this.getMaskSize()
        // mainPanel的size改变后有400ms的transition
        setTimeout(() => {
          this.BScroll.refresh()
        }, 500)
      },
      deep: true
    }
  },
  computed: {
    ...mapState(['canvasSize', 'mainPanelScrollY']),
    maskStyle () {
      return {
        height: this.maskHeight + 'px',
        borderWidth: this.maskBorderWidth,
        transform: `translateY(${this.mainPanelScrollY}px)`
      }
    }
  },
  mounted () {
    this.getMaskSizeThrottle = throttle(this.getMaskSize, 300)
    window.addEventListener('resize', this.getMaskSizeThrottle)
    this.getMaskSize()
    this.initScroll()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.getMaskSizeThrottle)
  },
  methods: {
    /**
     * 重新设置mask的size和canvas的position
     */
    getMaskSize () {
      const mainRef = this.$refs.main
      const left = (mainRef.clientWidth - this.canvasSize.width) / 2
      const top = 50
      const bottom = Math.max(
        50,
        mainRef.clientHeight - top - this.canvasSize.height
      )
      this.maskBorderWidth = `${50}px ${Math.max(
        0,
        left
      )}px ${bottom}px ${Math.max(0, left)}px`
      this.maskHeight = Math.max(
        mainRef.clientHeight,
        this.canvasSize.height + 100
      )
      console.log(mainRef.clientHeight,
        this.canvasSize.height + 100)
      const canvasPosition = {
        top: 50,
        left: (mainRef.clientWidth - this.canvasSize.width) / 2
      }
      this.$store.dispatch('poster/setCanvasPosition', canvasPosition)
    },
    initScroll () {
      BScroll.use(MouseWheel)
      BScroll.use(ScrollBar)
      this.BScroll = new BScroll(this.$refs.mainPanelScrollContent, {
        mouseWheel: true,
        scrollbar: true,
        bounce: false,
        probeType: 2
      })
      this.BScroll.on('mousewheelMove', ({ y }) => {
        this.$store.dispatch('poster/setScrolly', y)
      })
      this.BScroll.on('scroll', ({ y }) => {
        this.$store.dispatch('poster/setScrolly', y)
      })
    }
  }
}

</script>
<style lang="less" scoped>
.poster-editor-main {
  /* background-color: #d6d6d6; */
  position: relative;
  overflow: hidden;
  .main-panel-scroll-content {
    width: 100%;
    height: 100%;
    cursor: grab;
  }
  .main-panel-contaienr {
    width: 100%;
    padding: 50px 0;
    position: relative;
    /* overflow-y: scroll; */
    /* display: flex; */
    /* justify-content: center; */
    /* padding: 50px 0; */
  }
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    left: 0;
    top: 0;
    pointer-events: none;
  }
}
</style>
