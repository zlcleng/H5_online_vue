<template>
  <div class="text-control">
    <base-control :drag-info="dragInfo" @changeStyle="changeStyle" />
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
    </el-collapse>
    <!-- <el-collapse v-model="activeNames">
      <el-collapse-item name="text">
        <template #title>
          <div class="header">
            文字
          </div>
        </template>
        <setting-content>
          <setting-row>
            <template #left>
              <setting-item label="颜色">
                <el-color-picker v-model="inColor" size="small" />
              </setting-item>
            </template>
            <template #right>
              <setting-item label="字号">
                <input v-model.number="inFontSize" type="number">
              </setting-item>
            </template>
          </setting-row>
          <setting-item label="对齐方式">
            <radio-group v-model="inTextAlign" :list="textAlignList">
              <template #left>
                <i class="icon-align-left" />
              </template>
              <template #center>
                <i class="icon-align-center" />
              </template>
              <template #right>
                <i class="icon-align-right" />
              </template>
            </radio-group>
          </setting-item>
          <setting-row>
            <template #left>
              <setting-item label="行间距">
                <input v-model.number="inLineHeight" type="number">
              </setting-item>
            </template>
            <template #right>
              <setting-item label="字间距">
                <input v-model.number="inLetterSpacing" type="number">
              </setting-item>
            </template>
          </setting-row>
          <setting-item label="格式">
            <radio-group v-model="inTextFormat" :list="textFotmatList" />
          </setting-item>
        </setting-content>
      </el-collapse-item>
      <el-collapse-item name="borderAndBackground">
        <template #title>
          <div class="header">边框和背景</div>
        </template>
        <setting-content>
          <setting-item label="背景颜色">
            <el-color-picker v-model="inBackgroundColor" size="small" />
          </setting-item>
          <setting-item label="内边距">
            <input v-model.number="inPadding" type="number">
          </setting-item>
          <setting-item label="边框颜色、宽度">
            <el-color-picker v-model="inBorderColor" size="small" />
            <input v-model.number="inBorderWidth" type="number">
          </setting-item>
          <setting-item label="边框样式">
            <radio-group v-model="inBorderStyle" :list="borderStyleList" />
          </setting-item>
        </setting-content>
      </el-collapse-item>
      <el-collapse-item name="position">
        <template #title>
          <div class="header">
            位置
          </div>
        </template>
        <position-control :drag-info="dragInfo" />
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
      styleInfo: {}
      // activeNames: ['text', 'position', 'borderAndBackground'],
      // textAlignList: [
      //   { label: '左对齐', value: 'left' },
      //   { label: '居中', value: 'center' },
      //   { label: '右对齐', value: 'right' }
      // ],
      // textFotmatList: [
      //   { label: '粗体', value: 'bold' },
      //   { label: '斜体', value: 'italic' },
      //   { label: '划线', value: 'line-through' }
      // ],
      // borderStyleList: [
      //   { label: '实线', value: 'solid' },
      //   { label: '虚线', value: 'dashed' },
      //   { label: '双线', value: 'double ' },
      //   { label: '点线', value: 'dotted ' }
      // ]
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
    updateInfoStyle (type, value) {
      this.$emit('changeStyle', { type, value })
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
}
</style>
