/*
 * @Author: your name
 * @Date: 2021-09-01 20:14:55
 * @LastEditTime: 2021-09-01 20:15:14
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \H5_online_vue\src\components\DraggableResizable\utils\dom.js
 */
import { isFunction } from './fns'

let matchesSelectorFunc

export function matchesSelectorToParentElements (el, selector, baseNode) {
  let node = el
  baseNode = baseNode || document.documentElement

  matchesSelectorFunc = matchesSelectorFunc || [
    'matches',
    'webkitMatchesSelector',
    'mozMatchesSelector',
    'msMatchesSelector',
    'oMatchesSelector'
  ].find(func => isFunction(node[func]))

  if (!isFunction(node[matchesSelectorFunc])) return false

  do {
    if (node[matchesSelectorFunc](selector)) return true
    if (node === baseNode) return false
    node = node.parentNode
  } while (node)

  return false
}
