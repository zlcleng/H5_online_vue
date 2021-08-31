/*
 * @Author: your name
 * @Date: 2021-08-25 20:21:53
 * @LastEditTime: 2021-08-31 19:42:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \h5_online_editor\src\store\modules\poster.js
 */
import { Message } from 'element-ui'

const state = {
  canvasSize: {
    width: 338,
    height: 600
  },
  canvasPosition: {
    top: null,
    left: null
  },
  background: null,
  mainPanelScrollY: 0,
  posterItems: [], // 组件列表
  activeItems: [], // 当前选中的组件
  layerPanelOpened: true, // 是否打开图层面板
  referenceLineOpened: true, // 是否打开参考线
  referenceLine: { // 参考线,用户定义的参考线
    row: [],
    col: []
  }
}

const getters = {
  canvasSize (state) {
    return state.canvasSize
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
  }
}

const actions = {
  setCanvasSize ({ state }, data) {
    state.canvasSize = data
  },
  setCanvasPosition ({ commit }, data) {
    commit('SET_CANVAS_POSITION', data)
  },
  setScrolly ({ commit }, data) {
    commit('SET_SCROLL_Y', data)
  },
  addReferenceLine ({ commit, dispatch }, item) {
    dispatch('history/push')
    commit('ADD_REFERENCE_LINE', item)
  },
  removeReferenceLine ({ commit, dispatch }, item) {
    dispatch('history/push')
    commit('REMOVE_REFERENCE_LINE', item)
  },
  removeAllReferenceLine ({ commit, dispatch }) {
    dispatch('history/push')
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
      dispatch('history/push')
      if (!(item instanceof CopiedWidget)) {
        commit(MTS.REPLACE_ACTIVE_ITEMS, [item])
      }
      commit(MTS.ADD_ITEM, item)
    }
  },
  // 移除组件
  removeItem ({ commit, getters, dispatch }, item) {
    if (item.lock) {
      return
    }
    if (getters.activeItemIds.includes(item.id)) {
      commit(MTS.REMOVE_ACTIVE_ITEM, item)
    }
    dispatch('history/push')
    commit('REMOVE_ITEM', item)
  },
  // 替换组件
  replacePosterItems ({ commit, dispatch }, items) {
    dispatch('history/push')
    commit(MTS.REPLACE_POSTER_ITEMS, items)
    commit(MTS.REPLACE_ACTIVE_ITEMS, [])
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
