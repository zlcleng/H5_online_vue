<!--
 * @Author: your name
 * @Date: 2021-08-31 20:17:11
 * @LastEditTime: 2021-09-02 20:02:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \h5_online_editor\src\views\editor\components\LeftSide\library.vue
-->
<template>
  <div class="components-library">
    <p class="title text-center">组件库</p>
    <el-scrollbar style="height: 100%;">
      <ul class="scrollbar-wrapper">
        <li v-for="(item, index) in componentsList" :key="index" class="clearfix paddingB30">
          <div class="components-libs-title">
            <p>{{ item.title }}</p>
          </div>
          <div v-if="item.components && item.components.length">
            <div
              v-for="(element,i) in item.components"
              :key="i"
              class="components-lib-item"
              @click="handleClick(element)"
            >
              <div class="lib-item-img">
                <!-- <i :class="[element.icon]"></i> -->
                <img :src="element.img" alt="">
              </div>
              <p class="lib-item-title ellipsis">{{ element.title }}</p>
            </div>
            <input ref="inputRef" type="file" style="display:none" @change="selectImg">
          </div>
          <div v-else>
            <p class="gray text-center paddingT20">待完善...</p>
          </div>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import { uploadApi } from '@/api'
import { validateImage } from '@/utils/imageHelpers'
import elemtConfig from './elemtConfig'
import { ImageWidget, TextWidget } from '@/constructor/widget'
const { mapActions } = createNamespacedHelpers('poster')

export default {
  data () {
    return {
      componentsList: elemtConfig
    }
  },
  methods: {
    ...mapActions(['addItem']),
    /**
     * 点击事件, 向父组件派发add-element事件，参数： 当前组件对象
     * @param item
     */
    handleClick (item) {
      if (item.elName == 'image') {
        this.$refs.inputRef[0].click()
        return
      }
      this.addItem(new TextWidget())
    },
    async selectImg ({ currentTarget: inputNode }) {
      try {
        const file = inputNode.files
        const imgFile = file && file[0]
        // 先验证图片格式大小
        await validateImage(imgFile)
        const src = await uploadApi.uploadImg(imgFile)
        // 增加图片
        this.addItem(new ImageWidget({ wState: { src }}))
      } catch (e) {
        console.error(e)
      } finally {
        inputNode.value = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.components-library {
  user-select: none;
  height: 100%;
  padding-top: 60px;
  position: relative;
  & ul {
    padding: 10px;
  }
  .components-libs-title {
    margin-bottom: 16px;
    p {
      margin-top: 0;
    }
  }
  .title {
    position: absolute;
    top: 16px;
    left: 0;
    width: 100%;
  }
  .components-lib-item {
    color: #424242;
    text-align: center;
    background: #f4f4f4;
    width: 126px;
    float: left;
    // padding: 6px 0;
    margin: 5px;
    border: 1px solid #dddddd;
    font-size: 12px;
    cursor: pointer;
    transition: All 0.3s ease-in-out;
    &:hover {
      // background: #fff;
      border: 1px solid #25A589;
      color: #25A589;
    }
    .lib-item-img {
      width: 100%;
      height: 100px;
      background: #fff;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
