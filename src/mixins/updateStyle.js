/*
 * @Author: your name
 * @Date: 2021-09-07 20:38:38
 * @LastEditTime: 2021-09-08 20:27:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \H5_online_vue\src\mixins\updateStyle.js
 */
// import { settingContent, settingItem, settingRow, radioGroup } from 'poster/commonUI'
// import positionControl from './positionControl'
import { BaseControl } from '@/components'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('poster')
export const styleMixin = {
  components: {
    BaseControl
    // settingContent,
    // settingItem,
    // settingRow,
    // radioGroup
    // positionControl
  },
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    dragInfo () {
      return this.item.dragInfo
    },
    wState () {
      return this.item.wState
    },
    style () {
      return this.wState.style
    }
  },
  methods: {
    ...mapActions(['updateWidgetState']),
    ...mapActions({
      'pushHistory': 'history/push'
    }),
    updateStyle (styleKey, value, pushHistory = true) {
      console.log('style.' + styleKey)
      this.updateWidgetState({
        keyPath: 'style.' + styleKey,
        value,
        widgetId: this.item.id,
        pushHistory
      })
    }
  }
}
