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
      console.log(this.item)
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
      this.updateWidgetState({
        keyPath: 'style.' + styleKey,
        value,
        widgetId: this.item.id,
        pushHistory
      })
    }
  }
}
