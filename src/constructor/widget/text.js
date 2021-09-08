/*
 * @Author: your name
 * @Date: 2021-09-02 19:51:30
 * @LastEditTime: 2021-09-08 20:36:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \H5_online_vue\src\constructor\widget\text.js
 */
import Widget from './widget'
import { merge } from 'lodash'
import { createHtmlStr } from '@/utils'

function codeGen (config) {
  return createHtmlStr({
    tag: 'div',
    style: {
      ...Widget.getPositionStyle(config.dragInfo)
    },
    children: [
      {
        tag: 'div',
        text: config.wState.text,
        style: {
          ...config.wState.style
        }
      }
    ]
  })
}

// 文本Widget
export default class TextWidget extends Widget {
  constructor (config) {
    config = merge({
      type: 'text',
      typeLabel: '文本',
      componentName: 'text-template',
      icon: 'icon-text',
      lock: false,
      visible: true,
      wState: {
        text: '双击编辑文本',
        style: {
          margin: '10px',
          wordBreak: 'break-all',
          color: '#000',
          textAlign: 'center',
          fontSize: '14px', // px
          paddingTop: 0,
          paddingLeft: 0,
          paddingBottom: 0,
          paddingRight: 0,
          borderColor: '#000',
          borderWidth: 0, // px
          borderStyle: 'solid',
          borderRadius: 0,
          boxShadow: '',
          lineHeight: '100%', // %
          letterSpacing: 0, // %
          backgroundColor: '',
          fontWeight: '',
          fontStyle: '',
          textDecoration: '',
          opacity: 1
        }
      }
    }, config)
    super(config)
    this._codeGen = codeGen
  }
}
