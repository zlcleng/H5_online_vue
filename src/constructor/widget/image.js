/*
 * @Author: your name
 * @Date: 2021-08-31 20:33:35
 * @LastEditTime: 2021-08-31 20:33:44
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \h5_online_editor\src\constructor\widget\image.js
 */
import Widget from './widget'
import _merge from 'lodash/merge'
import { createHtmlStr } from 'poster/utils'

function codeGen (config) {
  return createHtmlStr({
    tag: 'image',
    attrs: {
      src: config.wState.src
    },
    style: {
      ...Widget.getPositionStyle(config.dragInfo)
    }
  })
}

// 图片Widget
export default class ImageWidget extends Widget {
  constructor (config) {
    config = _merge({
      type: 'image',
      typeLabel: '图片',
      componentName: 'image-widget',
      icon: 'el-icon-picture',
      lock: false,
      visible: true,
      wState: {
        src: ''
      }
    }, config)
    super(config)
    this._codeGen = codeGen
  }
}
