/*
 * @Author: your name
 * @Date: 2021-09-01 20:14:55
 * @LastEditTime: 2021-09-01 20:15:19
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \H5_online_vue\src\components\DraggableResizable\utils\fns.js
 */
export function isFunction (func) {
  return (typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]')
}

export function snapToGrid (grid, pendingX, pendingY, scale = 1) {
  const x = Math.round((pendingX / scale) / grid[0]) * grid[0]
  const y = Math.round((pendingY / scale) / grid[1]) * grid[1]

  return [x, y]
}

export function getSize (el) {
  const rect = el.getBoundingClientRect()

  return [
    parseInt(rect.width),
    parseInt(rect.height)
  ]
}

export function computeWidth (parentWidth, left, right) {
  return parentWidth - left - right
}

export function computeHeight (parentHeight, top, bottom) {
  return parentHeight - top - bottom
}

export function restrictToBounds (value, min, max) {
  if (min !== null && value < min) {
    return min
  }

  if (max !== null && max < value) {
    return max
  }

  return value
}
