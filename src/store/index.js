/*
 * @Date: 2021-02-19 11:34:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-25 20:32:19
 * @FilePath: \vue_h5_online\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 导入modules文件夹下所有的js文件
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules
})

export default store
