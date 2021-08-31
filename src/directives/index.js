/*
 * @Author: your name
 * @Date: 2021-08-31 19:31:09
 * @LastEditTime: 2021-08-31 20:06:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \h5_online_editor\src\directives\index.js
 */
export const mousedrag = {
  bind (el, binding) {
    el.onmousedown = function (e) {
      const parentNode = document.querySelector(String(binding.arg))
      console.log(parentNode)
      if (!parentNode) return
      // 获取鼠标点击处分别与div左边和上边的距离：鼠标位置-div位置
      const divx = e.clientX - parentNode.offsetLeft
      const divy = e.clientY - parentNode.offsetTop
      const minLeft = 0
      const maxLeft = window.innerWidth - parentNode.clientWidth
      const minTop = 0
      const maxTop = window.innerHeight - parentNode.clientHeight
      function moveHandler (e) {
        // 获取移动后div的位置：鼠标位置-divx/divy
        const l = Math.min(Math.max(e.clientX - divx, minLeft), maxLeft)
        const t = Math.min(Math.max(e.clientY - divy, minTop), maxTop)
        parentNode.style.left = l + 'px'
        parentNode.style.top = t + 'px'
      }
      document.addEventListener('mousemove', moveHandler)
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', moveHandler)
        document.onmouseup = null
      })
    }
  }
}
