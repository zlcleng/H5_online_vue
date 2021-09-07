/*
 * @Date: 2021-01-18 10:05:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-06 13:22:13
 * @FilePath: \vue_patient_follow\src\plugins\element.js
 */
import Vue from 'vue'
import {
  Main,
  Form,
  FormItem,
  Dialog,
  Button,
  Switch,
  Select,
  Input,
  InputNumber,
  Upload,
  Tooltip,
  Popover,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Scrollbar,
  Collapse,
  CollapseItem,
  ColorPicker,
  Option
  // Message,
  // MessageBox
} from 'element-ui'

Vue.config.lang = 'zh-cn'

Vue.prototype.$ELEMENT = { size: 'small' }

// 引入组件
const components = [
  Main,
  Form,
  FormItem,
  Dialog,
  Button,
  Switch,
  Select,
  Input,
  InputNumber,
  Upload,
  Tooltip,
  Popover,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Scrollbar,
  Collapse,
  CollapseItem,
  ColorPicker,
  Option
  // Message,
  // MessageBox
]

components.forEach(component => {
  Vue.use(component)
})

// Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$message = Message
