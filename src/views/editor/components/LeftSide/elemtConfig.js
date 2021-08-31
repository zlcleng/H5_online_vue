/*
 * @Author: your name
 * @Date: 2021-08-31 20:22:42
 * @LastEditTime: 2021-08-31 20:31:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \h5_online_editor\src\views\editor\components\LeftSide\elemtConfig.js
 */

export default [
  {
    title: '基础组件',
    components: [
      {
        elName: 'qk-image',
        title: '图片',
        img: require('@/assets/img.png'),
        valueType: '', // 标识数据类型，用于表单组件,
        defaultStyle: {
          height: 200
        }
      },
      {
        elName: 'qk-text',
        title: '文字',
        img: require('@/assets/text.png'),
        // 每个组件设置props来展示哪些显示哪些编辑项
        valueType: '', // 标识数据类型，用于表单组件
        defaultStyle: {
          height: 40
        }
      },
      {
        elName: 'qk-button',
        title: '按钮',
        img: require('@/assets/btn.png'),
        // 每个组件设置props来展示哪些显示哪些编辑项
        valueType: '', // 标识数据类型，用于表单组件
        defaultStyle: {
          width: 140,
          height: 40,
          paddingTop: 10,
          paddingBottom: 10,
          borderColor: '#999999',
          borderStyle: 'solid',
          borderWidth: 1,
          borderRadius: 4
        }
      },
      {
        elName: 'qk-rectangle-border',
        title: '矩形边框',
        img: require('@/assets/rectangle.png'),
        valueType: '',
        defaultStyle: {
          width: 120,
          height: 100,
          borderColor: '#999999',
          borderStyle: 'solid',
          borderWidth: 2,
          borderRadius: 10
        }
      },
      {
        elName: 'qk-rectangle-border',
        title: '分割线',
        img: require('@/assets/border.png'),
        valueType: '',
        defaultStyle: {
          height: 1,
          width: 300,
          backgroundColor: '#999999'
        }
      }
    ]
  }
]
