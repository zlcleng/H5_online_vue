<template>
  <div class="text-control">
    <base-control :drag-style="styleInfo" :drag-info="dragInfo" @changeStyle="changeStyle" />

    <el-collapse>
      <el-collapse-item title="字体：" name="4">
        <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">字体大小：</p>
          <div class="col-2 attr-item-edit-input">
            <el-input-number
              v-model="styleInfo.fontSize"
              size="mini"
              controls-position="right"
              :min="0"
              @change="updateInfoStyle('fontSize', styleInfo.fontSize + 'px')"
            />
          </div>
        </div>
        <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">字体粗细：</p>
          <div class="col-2 attr-item-edit-input">
            <el-input-number
              v-model="styleInfo.fontWeight"
              size="mini"
              controls-position="right"
              :min="300"
              :step="100"
              :max="900"
              @change="updateInfoStyle('fontWeight', styleInfo.fontWeight)"
            />
          </div>
        </div>
        <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">行间距：</p>
          <div class="col-2 attr-item-edit-input">
            <el-input-number
              v-model="styleInfo.lineHeight"
              size="mini"
              controls-position="right"
              :min="0"
              :step="0.1"
              @change="updateInfoStyle('lineHeight', styleInfo.lineHeight)"
            />
          </div>
        </div>
        <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">字间距：</p>
          <div class="col-2 attr-item-edit-input">
            <el-input-number
              v-model="styleInfo.letterSpacing"
              size="mini"
              controls-position="right"
              :min="0"
              @change="updateInfoStyle('letterSpacing', styleInfo.letterSpacing + 'px')"
            />
          </div>
        </div>
        <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">对齐方式：</p>
          <div class="sizeAndPosition-wrapper">
            <div class="align-type-item clearFlex" @click="updateInfoStyle('textAlign', 'left')">
              <el-tooltip effect="dark" content="左对齐" placement="bottom">
                <i class="iconfont icon-textzuoduiqi" />
              </el-tooltip>
            </div>
            <div class="align-type-item clearFlex" @click="updateInfoStyle('textAlign', 'center')">
              <el-tooltip effect="dark" content="居中对齐" placement="bottom">
                <i class="iconfont icon-juzhongduiqi" />
              </el-tooltip>
            </div>
            <div class="align-type-item clearFlex" @click="updateInfoStyle('textAlign', 'right')">
              <el-tooltip effect="dark" content="右对齐" placement="bottom">
                <i class="iconfont icon-textyouduiqi" />
              </el-tooltip>
            </div>
          </div>
        </div>

        <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">字体颜色：</p>
          <div class="attr-item-edit-input">
            <el-color-picker
              v-model="styleInfo.color"
              size="mini"
              @change="updateInfoStyle('color', styleInfo.color)"
            />
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="边框边距：" name="2">
        <!--边框-->
        <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">边框：</p>
          <div class="col-2 attr-item-edit-input">
            <el-input-number
              v-model="styleInfo.borderWidth"
              size="mini"
              controls-position="right"
              :min="0"
              @change="updateInfoStyle('borderWidth', styleInfo.borderWidth + 'px')"
            />
            <div class="attr-item-edit-input-des">尺寸</div>
          </div>
          <div class="col-3 attr-item-edit-input">
            <el-color-picker
              v-model="styleInfo.borderColor"
              size="mini"
              @change="updateInfoStyle('borderColor', styleInfo.borderColor)"
            />
            <div class="attr-item-edit-input-des">颜色</div>
          </div>
          <div class="col-2 attr-item-edit-input">
            <el-select
              v-model="styleInfo.borderStyle"
              size="mini"
              @change="updateInfoStyle('borderStyle', styleInfo.borderStyle)"
            >
              <el-option v-for="item in borderStyleList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <div class="attr-item-edit-input-des">样式</div>
          </div>
        </div>
        <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">边框圆弧：</p>
          <div class="col-2 attr-item-edit-input">
            <el-input-number
              v-model="styleInfo.borderRadius"
              size="mini"
              controls-position="right"
              :min="0"
              @change="updateInfoStyle('borderRadius', styleInfo.borderRadius + 'px')"
            />
          </div>
        </div>
        <!--边距-->

        <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">上下边距：</p>
          <div class="col-2 attr-item-edit-input">
            <el-input-number
              v-model="styleInfo.paddingTop"
              size="mini"
              controls-position="right"
              :min="0"
              @change="updateInfoStyle('paddingTop', styleInfo.paddingTop + 'px')"
            />
          </div>
          <div class="col-2 attr-item-edit-input">
            <el-input-number
              v-model="styleInfo.paddingBottom"
              size="mini"
              controls-position="right"
              :min="0"
              @change="updateInfoStyle('paddingBottom', styleInfo.paddingBottom + 'px')"
            />
          </div>
        </div>
        <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">左右边距：</p>
          <div class="col-2 attr-item-edit-input">
            <el-input-number
              v-model="styleInfo.paddingLeft"
              size="mini"
              controls-position="right"
              :min="0"
              @change="updateInfoStyle('paddingLeft', styleInfo.paddingLeft + 'px')"
            />
          </div>
          <div class="col-2 attr-item-edit-input">
            <el-input-number
              v-model="styleInfo.paddingRight"
              size="mini"
              controls-position="right"
              :min="0"
              @change="updateInfoStyle('paddingRight', styleInfo.paddingRight + 'px')"
            />
          </div>
        </div>
        <!--外边距-->
      </el-collapse-item>
      <el-collapse-item title="背景&&透明度：" name="5">
        <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">背景颜色：</p>
          <div class="attr-item-edit-input no-top">
            <el-color-picker
              v-model="styleInfo.backgroundColor"
              size="mini"
              :show-alpha="true"
              @change="updateInfoStyle('backgroundColor', styleInfo.backgroundColor)"
            />
          </div>
        </div>
        <!-- <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">背景图片：</p>
          <div class="attr-item-edit-input">
            <image-select :url.sync="styleInfo.backgroundImage" @change="updateInfoStyle('backgroundImage', styleInfo.backgroundImage)" />
          </div>
        </div> -->

        <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">透明度：</p>
          <div class="col-2 attr-item-edit-input">
            <el-input-number
              v-model="styleInfo.opacity"
              size="mini"
              controls-position="right"
              :min="0"
              :max="1"
              :step="0.1"
              @change="updateInfoStyle('opacity', styleInfo.opacity)"
            />
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
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
      styleInfo: {},
      borderStyleList: [{
        label: '实线',
        value: 'solid'
      }, {
        label: '虚线',
        value: 'dashed'
      }, {
        label: '点状',
        value: 'dotted'
      }, {
        label: '双线',
        value: 'double'
      }]
    }
  },
  computed: {
    // inColor: {
    //   get () {
    //     return this.style.color
    //   },
    //   set (val) {
    //     this.updateStyle('color', val)
    //   }
    // },
    // inFontSize: {
    //   get () {
    //     return parseInt(this.style.fontSize)
    //   },
    //   set (val) {
    //     this.updateStyle('fontSize', val + 'px')
    //   }
    // },
    // inPadding: {
    //   get () {
    //     return parseInt(this.style.padding)
    //   },
    //   set (val) {
    //     this.updateStyle('padding', val + 'px')
    //   }
    // },
    // inBorderColor: {
    //   get () {
    //     return this.style.borderColor
    //   },
    //   set (val) {
    //     this.updateStyle('borderColor', val)
    //   }
    // },
    // inBorderWidth: {
    //   get () {
    //     return parseInt(this.style.borderWidth)
    //   },
    //   set (val) {
    //     this.updateStyle('borderWidth', val + 'px')
    //   }
    // },
    // inBorderStyle: {
    //   get () {
    //     return this.style.borderStyle
    //   },
    //   set (val) {
    //     this.updateStyle('borderStyle', val)
    //   }
    // },
    // inLineHeight: {
    //   get () {
    //     return parseInt(this.style.lineHeight)
    //   },
    //   set (val) {
    //     this.updateStyle('lineHeight', val + '%')
    //   }
    // },
    // inLetterSpacing: {
    //   get () {
    //     return parseInt(this.style.letterSpacing)
    //   },
    //   set (val) {
    //     this.updateStyle('letterSpacing', val + 'px')
    //   }
    // },
    // inTextAlign: {
    //   get () {
    //     return this.style.textAlign
    //   },
    //   set (val) {
    //     this.updateStyle('textAlign', val)
    //   }
    // },
    // inBackgroundColor: {
    //   get () {
    //     return this.style.backgroundColor
    //   },
    //   set (val) {
    //     this.updateStyle('backgroundColor', val)
    //   }
    // },
    // inTextFormat: {
    //   get () {
    //     const result = []
    //     if (this.style.fontWeight === 'bold') {
    //       result.push('bold')
    //     }
    //     if (this.style.fontStyle === 'italic') {
    //       result.push('italic')
    //     }
    //     if (this.style.textDecoration === 'line-through') {
    //       result.push('line-through')
    //     }
    //     return result
    //   },
    //   set (list) {
    //     const operation = list._operation
    //     const value = list._value
    //     const newValue = operation === 'add' ? value : ''
    //     if (value === 'bold') {
    //       this.updateStyle('fontWeight', newValue)
    //     } else if (value === 'italic') {
    //       this.updateStyle('fontStyle', newValue)
    //     } else if (value === 'line-through') {
    //       this.updateStyle('textDecoration', newValue)
    //     }
    //   }
    // }
  },
  methods: {
    resetStyle () {
      const { style } = this
      Object.keys(style).map(key => {
        if (['borderRadius', 'borderWidth', 'fontSize', 'margin', 'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingTop'].includes(key)) {
          this.styleInfo[key] = parseInt(style[key])
        } else {
          this.styleInfo[key] = style[key]
        }
      })
    },
    updateInfoStyle (type, value) {
      this.updateStyle(type, value)
    },
    changeStyle ({ type, value }) {
      this.updateStyle(type, value)
    }
  }
}
</script>
<style lang="less" scoped>
.text-control {
  width: 100%;
  .header {
    box-sizing: border-box;
    padding: 0 20px;
    /* border-style: dashed; */
  }
  .attr-item-edit-wrapper, .sizeAndPosition-wrapper {
    display: flex;
  }
  /deep/ .attr-item-edit-wrapper {
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
    .attr-item-edit-input {
      &.col-2 {
        width: 90px;
        margin-left: 10px;
      }
      &.col-1 {
        width: 250px;
      }
      &.col-3 {
        width: 60px;
        margin-left: 10px;
      }
      &.col-4 {
        width: 50px;
        margin-left: 10px;
      }
      .attr-item-edit-input-des {
        text-align: center;
        line-height: 1;
        margin-top: 2px;
        font-size: 12px;
        color: #ccc;
      }
    }
    .el-input-number.is-controls-right .el-input__inner {
      padding-left: 2px;
      padding-right: 32px;
      width: 90px;
    }
    .el-input-number--mini {
      width: 90px;
    }
    .el-slider__runway.show-input {
      margin-right: 108px;
    }
  }
  .sizeAndPosition-wrapper .align-type-item{
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>
