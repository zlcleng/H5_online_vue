/*
 * @Author: your name
 * @Date: 2021-08-25 20:21:53
 * @LastEditTime: 2021-09-16 13:35:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \h5_online_editor\src\store\modules\poster.js
 */
import { Message } from 'element-ui'
import { BackgroundWidget, Widget, CopiedWidget } from '@/constructor/widget'
import { set } from 'lodash'

const lastPosterItems = localStorage.getItem('mj_online_data')

const background = new BackgroundWidget({
  backgroundColor: '#fff',
  isSolid: true,
  lock: true
})

const state = {
  canvasSize: {
    width: 375,
    height: 667
  },
  canvasPosition: {
    top: null,
    left: null
  },
  background,
  mainPanelScrollY: 0,
  posterItems: lastPosterItems ? JSON.parse(lastPosterItems) : [], // 组件列表
  activeItems: [], // 当前选中的组件
  layerPanelOpened: true, // 是否打开图层面板
  referenceLineOpened: true, // 是否打开参考线
  matchedLine: null, // 匹配到的参考线 {row:[],col:[]}
  referenceLine: { // 参考线,用户定义的参考线
    row: [],
    col: []
  },
  isUnsavedState: false // 是否处于未保存状态
}

const getters = {
  canvasSize (state) {
    return state.canvasSize
  },
  activeItemIds (state) {
    return state.activeItems.map(item => item.id)
  }
}

const mutations = {
  SET_CANVAS_POSITION (state, data) {
    state.canvasPosition = data
  },
  SET_SCROLL_Y (state, y) {
    state.mainPanelScrollY = y
  },
  // 设置参考线的可见状态
  SET_REFERENCE_LINE_VISIBLE (state, flag) {
    state.referenceLineOpened = !!flag
  },
  // 添加参考线
  ADD_REFERENCE_LINE (state, { type, position }) {
    state.referenceLine[type].push(position)
  },
  // 删除参考线
  REMOVE_REFERENCE_LINE (state, { type, index }) {
    state.referenceLine[type].splice(index, 1)
  },
  // 清空参考线
  REMOVE_ALL_REFERENCE_LINE (state) {
    state.referenceLine = {
      row: [],
      col: []
    }
  },
  // 设置图层面板的打开关闭状态
  SET_LAYER_PANEL (state, flag) {
    state.layerPanelOpened = !!flag
  },
  ADD_BACKGROUND (state, item) {
    if (item instanceof BackgroundWidget) {
      state.background = item
    }
  },
  REMOVE_BACKGROUND (state) {
    state.background = new BackgroundWidget()
  },
  SET_BACKGROUND_CONFIG (state, cb) {
    if (state.background) {
      cb(state.background)
    }
  },
  // 添加组件
  ADD_ITEM (state, item) {
    if (item instanceof Widget) {
      state.posterItems.push(item)
    }
  },
  // 删除组件
  REMOVE_ITEM (state, item) {
    if (item.lock) return
    state.posterItems = state.posterItems.filter(i => i.id !== item.id)
  },
  // 替换所有items
  REPLACE_POSTER_ITEMS (state, items) {
    state.posterItems = items
  },
  // 替换选中的组件
  REPLACE_ACTIVE_ITEMS (state, items) {
    state.activeItems = items.filter(i => (!i.lock) && i.couldAddToActive)
  },
  SET_MATCHED_LINE (state, data) {
    state.matchedLine = data
  },
  REMOVE_MATCHED_LINE (state) {
    state.matchedLine = null
  },
  // 添加选中的组件
  ADD_ACTIVE_ITEM (state, item) {
    if (item.lock || !item.visible || !item.couldAddToActive) {
      return
    }
    state.activeItems.push(item)
  },
  // 取消选中
  REMOVE_ACTIVE_ITEM (state, item) {
    state.activeItems = state.activeItems.filter(i => i.id !== item.id)
  },
  SET_UNSAVED_STATE (state, flag = false) {
    state.isUnsavedState = flag
  },
  // 设置某个组件的data
  SET_WIDGET_CONFIG (state, { item, cb }) {
    const target = state.posterItems.find(i => i.id === item.id)
    if (target && cb) {
      cb(target)
    }
  }
}

const actions = {
  setCanvasSize ({ state }, data) {
    state.canvasSize = data
  },
  setUnsavedState ({ commit }, flag) {
    commit('SET_UNSAVED_STATE', flag)
  },
  setCanvasPosition ({ commit }, data) {
    commit('SET_CANVAS_POSITION', data)
  },
  seekBackgroundSize ({ state }) {
    const background = state.background
    if (background && background.wState.isSolid) {
      background.dragInfo.w = state.canvasSize.width
      background.dragInfo.h = state.canvasSize.height
    }
  },
  setScrolly ({ commit }, data) {
    commit('SET_SCROLL_Y', data)
  },
  addReferenceLine ({ commit, dispatch }, item) {
    dispatch('history/push', null, { root: true })
    commit('ADD_REFERENCE_LINE', item)
  },
  removeReferenceLine ({ commit, dispatch }, item) {
    dispatch('history/push', null, { root: true })
    commit('REMOVE_REFERENCE_LINE', item)
  },
  removeAllReferenceLine ({ commit, dispatch }) {
    dispatch('history/push', null, { root: true })
    commit('REMOVE_ALL_REFERENCE_LINE')
  },
  setReferenceLineVisible ({ commit }, flag) {
    commit('SET_REFERENCE_LINE_VISIBLE', flag)
  },
  // 设置图层面板显隐
  setLayerPanel ({ commit }, flag) {
    commit('SET_LAYER_PANEL', flag)
  },
  // 添加组件
  addItem ({ commit, dispatch, state }, item) {
    const widgetCountLimit = parseInt(item._widgetCountLimit)
    if (widgetCountLimit) {
      const currentCount = (state.posterItems.filter(i => i.type === item.type)).length
      if (currentCount >= widgetCountLimit) {
        Message.error(`<${item.typeLabel || item.type}>类型的组件最多有${widgetCountLimit}个`)
        return
      }
    }
    if (item instanceof Widget) {
      dispatch('history/push', null, { root: true })
      if (!(item instanceof CopiedWidget)) {
        commit('REPLACE_ACTIVE_ITEMS', [item])
      }
      commit('ADD_ITEM', item)
    }
  },
  // 移除组件
  removeItem ({ commit, getters, dispatch }, item) {
    if (item.lock) {
      return
    }
    if (getters.activeItemIds.includes(item.id)) {
      commit('REMOVE_ACTIVE_ITEM', item)
    }
    dispatch('history/push', null, { root: true })
    commit('REMOVE_ITEM', item)
  },
  // 替换组件
  replacePosterItems ({ commit, dispatch }, items) {
    dispatch('history/push', null, { root: true })
    commit('REPLACE_POSTER_ITEMS', items)
    commit('REPLACE_ACTIVE_ITEMS', [])
  },
  // 更新组件state
  updateWidgetState ({ state, dispatch }, { keyPath, value, widgetId, pushHistory = true }) {
    const widgetItem = state.posterItems.find(i => i.id === widgetId)
    if (widgetItem) {
      // 某些操作不添加进历史记录栈
      if (pushHistory) {
        dispatch('history/push', null, { root: true })
      }
      set(widgetItem.wState, keyPath, value)
    }
  },
  setMatchedLine ({ commit }, data) {
    commit('SET_MATCHED_LINE', data)
  },
  removeMatchedLine ({ commit }) {
    commit('REMOVE_MATCHED_LINE')
  },
  removeActiveItem ({ commit }, item) {
    commit('REMOVE_ACTIVE_ITEM', item)
  },
  replaceActiveItems ({ commit }, items) {
    commit('REPLACE_ACTIVE_ITEMS', items)
  },
  lockItem ({ commit, getters }, item) {
    if (getters.activeItemIds.includes(item.id)) {
      commit('REMOVE_ACTIVE_ITEM', item)
    }
    commit('SET_WIDGET_CONFIG', { item, cb: (i) => (i.lock = true) })
  },
  unlockItem ({ commit }, item) {
    commit('SET_WIDGET_CONFIG', { item, cb: (i) => (i.lock = false) })
  },
  toggleItemVisible ({ commit }, { item, visible }) {
    commit('SET_WIDGET_CONFIG', { item, cb: (i) => (i.visible = !!visible) })
  },
  // 更新组件位置、大小等
  updateDragInfo ({ state }, { dragInfo, widgetId, updateSelfOnly = false }) {
    const widgetItem = state.posterItems.find(i => i.id === widgetId)
    if (!widgetItem) {
      return
    }
    // if (isMoving) {
    const preDragInfo = widgetItem.dragInfo
    const activeItems = state.activeItems
    dragInfo = Object.assign({}, preDragInfo, dragInfo)
    if (updateSelfOnly) {
      widgetItem.dragInfo = Object.assign({}, widgetItem.dragInfo, dragInfo)
    } else if (activeItems.length > 0) {
      const diffDragInfo = {
        w: dragInfo.w - preDragInfo.w,
        h: dragInfo.h - preDragInfo.h,
        x: dragInfo.x - preDragInfo.x,
        y: dragInfo.y - preDragInfo.y,
        rotateZ: dragInfo.rotateZ - preDragInfo.rotateZ
      }
      activeItems.forEach(item => {
        const { x, y, w, h, rotateZ } = item.dragInfo
        item.dragInfo = {
          x: x + diffDragInfo.x,
          y: y + diffDragInfo.y,
          w: w + diffDragInfo.w,
          h: h + diffDragInfo.h,
          rotateZ: rotateZ + diffDragInfo.rotateZ
        }
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
