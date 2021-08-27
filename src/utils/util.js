/*
 * @Author: your name
 * @Date: 2021-08-26 17:44:39
 * @LastEditTime: 2021-08-26 17:47:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \h5_online_editor\src\utils\util.js
 */
import html2canvas from 'html2canvas'

/**
 * 根据nodeObj生成dom结构
 * @param {ComponentDomNode} obj
 * @returns {HTMLDivElement}
 */
export function createDom (obj) {
  let dom = null
  try {
    let { style = {}} = obj
    const { tag = 'div', styleFragment: domStyleFragment, attrs = {}, children, text } = obj
    dom = document.createElement(tag)
    if (domStyleFragment && domStyleFragment.length > 0) {
      const _style = {}
      domStyleFragment.forEach(item => {
        Object.assign(_style, styleFragment[item] || null)
      })
      style = Object.assign({}, _style, style)
    }
    Object.keys(style).forEach(key => {
      dom.style[key] = style[key]
    })
    Object.keys(styleFragment._defaultStyle).forEach(key => {
      dom.style[key] = styleFragment._defaultStyle[key]
    })
    Object.keys(attrs).forEach(key => {
      dom.setAttribute(key, attrs[key])
    })
    if (text) {
      dom.innerText = text
    }
    if (children && children.length > 0) {
      children.forEach(item => {
        dom.appendChild(createDom(item))
      })
    }
  } catch (e) {
    console.error(e)
  }
  return dom
}

/**
 * 根据html生成图片
 * @param {Dom} obj
 * @returns {Image}
 */
export function domToImg (dom, options = {}) {
  return new Promise((resolve, reject) => {
    const baseOptions = {
      width: 0,
      height: 0
    }
    options = Object.assign({}, baseOptions, options)
    const { width, height } = options
    try {
      document.body.appendChild(dom)
      html2canvas(dom, {
        width: width,
        height: height,
        // dpi: 192,
        scale: 2
      })
        .then(canvas => {
          const url = canvas.toDataURL()
          console.log(url)
          const _img = document.createElement('img')
          _img.width = width
          _img.height = height
          _img.src = url
          document.body.removeChild(dom)
          resolve(_img)
        })
        .catch(err => {
          console.log(err)
          document.body.removeChild(dom)
          reject()
        })
    } catch (e) {
      console.log(e)
      reject()
    }
  })
}

/**
 * 根据base64生成Blob
 * @param {base64String} obj
 * @returns {Blob}
 */
export function base64ToBlob (base64Str) {
  var arr = base64Str.split(',')
  var mime = arr[0].match(/:(.*?);/)[1]
  var bstr = atob(arr[1])
  var n = bstr.length
  var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}
