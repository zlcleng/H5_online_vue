<template>
  <div>
    <p class="page-title fontBold">基础样式</p>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="尺寸与位置：" name="1">
        <div class="attr-item-edit-wrapper marginB15">
          <p class="attr-item-title">快捷定位：</p>
          <div class="sizeAndPosition-wrapper">
            <div
              v-for="item in alignTypeList"
              :key="item.type"
              class="align-type-item"
              @click="changeAlignType(item.type)"
            >
              <el-tooltip effect="dark" :content="item.title" placement="bottom">
                <i :class="[item.icon]" />
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">尺寸：</p>
          <div class="col-2 attr-item-edit-input">
            <el-input-number
              v-model="dragInfo.w"
              size="mini"
              controls-position="right"
              :min="0"
            />
            <div class="attr-item-edit-input-des">宽度</div>
          </div>
          <div class="col-2 attr-item-edit-input">
            <el-input-number
              v-model="dragInfo.h"
              size="mini"
              controls-position="right"
              :min="0"
            />
            <div class="attr-item-edit-input-des">高度</div>
          </div>
        </div>
        <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">快捷键：</p>
          <div class="sizeAndPosition-wrapper">
            <div class="align-type-item clearFlex" @click="handleResizeClick('wh')">
              <el-tooltip effect="dark" content="满屏" placement="bottom">
                <i class="iconfont icon-fangda" />
              </el-tooltip>
            </div>
            <div class="align-type-item clearFlex" @click="handleResizeClick('w')">
              <el-tooltip effect="dark" content="宽100%" placement="bottom">
                <i class="iconfont icon-shuipingfangda" />
              </el-tooltip>
            </div>
            <div class="align-type-item clearFlex" @click="handleResizeClick('h')">
              <el-tooltip effect="dark" content="高100%" placement="bottom">
                <i class="iconfont icon-chuizhifangda" />
              </el-tooltip>
            </div>
          </div>
        </div>
        <!-- <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">位置：</p>
          <div class="col-2 attr-item-edit-input">
            <el-input-number
              v-model="dragInfo.top"
              size="mini"
              controls-position="right"
            />
            <div class="attr-item-edit-input-des">X</div>
          </div>
          <div class="col-2 attr-item-edit-input">
            <el-input-number
              v-model="dragInfo.left"
              size="mini"
              controls-position="right"
            />
            <div class="attr-item-edit-input-des">Y</div>
          </div>
        </div> -->
        <!-- <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">旋转：</p>
          <div class="col-1 attr-item-edit-input">
            <el-slider
              v-model="dragInfo.rotate"
              show-input
              :min="-180"
              :max="180"
              :marks="{0:'',90:'', '-90':''}"
              input-size="mini"
              @change="throttleAddHistory"
            />
          </div>
        </div> -->
      </el-collapse-item>

      <!-- <el-collapse-item title="阴影样式：" name="3">
        <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">阴影位置：</p>
          <div class="col-2 attr-item-edit-input">
            <el-input-number v-model="boxShadow.h" size="mini" controls-position="right" />
            <div class="attr-item-edit-input-des">水平阴影位置</div>
          </div>
          <div class="col-2 attr-item-edit-input">
            <el-input-number v-model="boxShadow.v" size="mini" controls-position="right" />
            <div class="attr-item-edit-input-des">垂直阴影位置</div>
          </div>
        </div>
        <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">模 糊 度：</p>
          <div class="col-2 attr-item-edit-input">
            <el-input-number v-model="boxShadow.blur" size="mini" controls-position="right" />
            <div class="attr-item-edit-input-des">水平阴影位置</div>
          </div>
          <div class="col-2 attr-item-edit-input">
            <el-input-number
              v-model="boxShadow.spread"
              size="mini"
              controls-position="right"
            />
            <div class="attr-item-edit-input-des">垂直阴影位置</div>
          </div>
        </div>
        <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">阴影颜色：</p>
          <div class="attr-item-edit-input">
            <el-color-picker v-model="boxShadow.color" size="mini" />
          </div>
        </div>
      </el-collapse-item> -->
    </el-collapse>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { ceil, subtract, divide } from 'lodash'
// import { ImageSelect } from '@/components'

const { mapState } = createNamespacedHelpers('poster')

export default {
  components: {
    // ImageSelect
  },
  props: {
    dragInfo: {
      type: Object,
      default: () => {},
      require: true
    },
    dragStyle: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      activeNames: ['1'],
      alignTypeList: [{
        title: '左对齐',
        icon: 'iconfont icon-zuoduiqi',
        type: 'l'
      }, {
        title: '上对齐',
        icon: 'iconfont icon-shangduiqi',
        type: 't'
      }, {
        title: '右对齐',
        icon: 'iconfont icon-youduiqi',
        type: 'r'
      }, {
        title: '下对齐',
        icon: 'iconfont icon-xiaduiqi',
        type: 'b'
      }, {
        title: '垂直居中对齐',
        icon: 'iconfont icon-chuizhijuzhongduiqi',
        type: 'tb'
      }, {
        title: '水平居中对齐',
        icon: 'iconfont icon-shuipingjuzhongduiqi',
        type: 'lr'
      }],
      styleInfo: {},
      // 'none', 'solid', 'dashed', 'dotted', 'double'
      boxShadow: {
        h: 0,
        v: 0,
        blur: 0,
        spread: 0,
        color: '#000000'
      }
    }
  },
  watch: {
    boxShadow: {
      handler (val) {
        const { h, v, blur, spread, color } = val
        const str = `${h}px ${v}px  ${blur}px  ${spread}px  ${color}`
        this.updateInfoStyle('boxShadow', str)
      },
      deep: true
    }
    // dragStyle: {
    //   handler (val) {
    //     console.log(val, 'vasl')
    //     this.styleInfo = val
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },
  computed: {
    ...mapState({
      posterItems: state => state.posterItems,
      canvasWidth: state => state.canvasSize.width,
      canvasHeight: state => state.canvasSize.height
    })
    // styleInfo () {
    //   console.log(this.style)
    //   return JSON.parse(JSON.stringify(this.style || {}))
    // }
  },
  mounted () {
    this.styleInfo = Object.assign({}, this.dragStyle)
  },
  methods: {
    // 调整位置
    changeAlignType (type) {
      const canvasW = this.canvasWidth
      const canvasH = this.canvasHeight

      const eleW = this.dragInfo.w
      const eleH = this.dragInfo.h
      switch (type) {
        case 't':
          this.dragInfo.y = 0
          break
        case 'b':
          this.dragInfo.y = subtract(canvasH - eleH)
          break
        case 'l':
          this.dragInfo.x = 0
          break
        case 'r':
          this.dragInfo.x = subtract(canvasW - eleW)
          break
        case 'tb':
          this.dragInfo.y = ceil(divide(subtract(canvasH - eleH), 2), 2)
          break
        case 'lr':
          this.dragInfo.x = ceil(divide(subtract(canvasW - eleW), 2), 2)
          break
      }
    },
    // 改变尺寸
    handleResizeClick (type) {
      if (type.includes('w')) {
        this.dragInfo.x = 0
        this.dragInfo.w = this.canvasWidth
      }
      if (type.includes('h')) {
        this.dragInfo.y = 0
        this.dragInfo.h = this.canvasHeight
      }
    },
    updateInfoStyle (type, value) {
      console.log(this)
      this.$emit('changeStyle', { type, value })
      // this.$store.dispatch('poster/updateDragInfo', info)
      // this.updateDragInfo(info)
    }
  }
}
</script>

<style lang="less" scoped>
  .sizeAndPosition-wrapper {
    display: flex;
    width: 100%;
  }

  .align-type-item {
    flex: 1;
    cursor: pointer;
    text-align: center;
    &.clearFlex {
      width: 42px;
      flex: none;
    }
    i {
      line-height: 1;
      display: inline-block;
      padding: 6px;
      border-radius: 4px;
      background: rgba(37, 165, 137, 0.08);
    }
    &:hover {
      i {
        color: white;
        background: #25A589;
      }
    }
  }

  .attr-item-edit-wrapper {
    padding-left: 18px;
    display: flex;
    width: 100%;
    text-align: center;
    padding-bottom: 10px;
    .attr-item-title {
      text-align: right;
      min-width: 60px;
      font-size: 12px;
    }
    // .attr-item-edit-input {
    //   &.col-2 {
    //     width: 90px;
    //     margin-left: 10px;
    //   }
    //   &.col-1 {
    //     width: 250px;
    //   }
    //   &.col-3 {
    //     width: 60px;
    //     margin-left: 10px;
    //   }
    //   &.col-4 {
    //     width: 50px;
    //     margin-left: 10px;
    //   }
    //   .attr-item-edit-input-des {
    //     text-align: center;
    //     line-height: 1;
    //     margin-top: 2px;
    //     font-size: 12px;
    //     color: #ccc;
    //   }
    // }
  }

</style>

