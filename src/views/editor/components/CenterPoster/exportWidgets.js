/*
 * @Author: your name
 * @Date: 2021-09-01 20:08:52
 * @LastEditTime: 2021-09-02 19:57:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \H5_online_vue\src\views\editor\components\CenterPoster\exportWidgets.js
 */
import { pluginMap, pluginWrap } from '@/plugins/helpers'

const requireComponent = require.context('../templates', true, /[a-zA-Z]\w+Template\.(vue)$/)
const allWidgets = {}
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const _fileName = fileName.match(/\.\/(\S*).vue/)[1]
  allWidgets[_fileName] = componentConfig.default || componentConfig
})

const pluginComponents = {}
Object.values(pluginMap.widget).forEach(options => {
  const { component, componentName } = options
  pluginComponents[componentName] = pluginWrap(component)
})
export default { ...allWidgets, ...pluginComponents }
