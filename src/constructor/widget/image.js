/*
 * @Author: your name
 * @Date: 2021-08-31 20:33:35
 * @LastEditTime: 2021-09-08 13:37:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \h5_online_editor\src\constructor\widget\image.js
 */
import Widget from './widget'
import { merge } from 'lodash'
import { createHtmlStr } from '@/utils'

function codeGen (config) {
  return createHtmlStr({
    tag: 'image',
    attrs: {
      src: config.wState.src
    },
    style: {
      ...config.wState.style,
      ...Widget.getPositionStyle(config.dragInfo)
    }
  })
}

// 图片Widget
export default class ImageWidget extends Widget {
  constructor (config) {
    config = merge({
      type: 'image',
      typeLabel: '图片',
      componentName: 'image-template',
      icon: 'el-icon-picture',
      lock: false,
      visible: true,
      wState: {
        src: '',
        style: {}
      }
    }, config)
    super(config)
    this._codeGen = codeGen
  }
}
