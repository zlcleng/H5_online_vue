/*
 * @Author: your name
 * @Date: 2021-08-25 20:21:53
 * @LastEditTime: 2021-08-26 20:22:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \h5_online_editor\src\store\modules\poster.js
 */
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
  setLayerPanel ({ commit }, flag) {
    commit('SET_LAYER_PANEL', flag)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
