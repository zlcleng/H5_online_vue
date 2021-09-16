<!--
 * @Author: your name
 * @Date: 2021-08-25 18:53:05
 * @LastEditTime: 2021-09-16 13:19:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \h5_online_editor\src\layout\components\UserInfo\index.vue
-->
<template>
  <div class="user-head-btn-components">
    <el-dropdown v-if="isLogined">
      <div class="inline-block">
        <div class="user-head-btn-img">
          <img :src="userData.avatar || userHeadImage" alt="">
        </div>
        <span class="user-head-btn-name">{{ userData.name }}</span>
      </div>
      <el-dropdown-menu v-if="isLogined">
        <el-dropdown-item>
          <userInfo :user-data="userData" :show-edit="true">
            <i class="el-icon-user" /> 个人资料
          </userInfo>
        </el-dropdown-item>
        <!-- <el-dropdown-item>
          <resetPassword>
            <i class="el-icon-edit"></i> 修改密码
          </resetPassword>
        </el-dropdown-item> -->
        <el-dropdown-item>
          <div @click="doLogout">
            <i class="el-icon-switch-button" /> 退出登录
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div v-else class="inline-block">
      <el-button type="primary" @click="savePoster">保存</el-button>
      <el-button type="success" @click="exportPoster">下载图片</el-button>
      <!-- <span class="login-btn" @click="goLogin">登录/注册</span> -->
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
// import resetPassword from '@/components/reset-password'
import userInfo from './user_info.vue'
import userModel from '@/utils/userModel'
import ExportActions from '@/utils/exports'

const { mapState } = createNamespacedHelpers('poster')

export default {
  name: 'UserHeadBtn',
  components: {
    // resetPassword,
    userInfo
  },
  data () {
    return {
      userHeadImage: 'http://imgcdn.mijian360.com/Data/Uploads/2021/0812/6114f0bed68ea.png'
    }
  },
  computed: {
    ...mapState([
      'posterItems'
    ]),
    isLogined () {
      return this.$store.state.user.access_token
    },
    userData () {
      return this.$store.state.user.userInfo || {}
    }
  },
  methods: {
    doLogout () {
      userModel.doLogout()
    },
    goLogin () {
      userModel.goLogin()
    },
    // 导出海报
    exportPoster () {
      ExportActions.exportPoster()
    },
    // 保存编辑， 以便下次打开使用
    savePoster () {
      console.log(this.posterItems)
      localStorage.setItem('mj_online_data', JSON.stringify(this.posterItems))
    }
  }
}
</script>

<style lang="less" scoped>
  .user-head-btn-components {
    display: inline-block;
    vertical-align: middle;
    line-height: 28px;
    cursor: pointer;
    margin-right: 16px;
    .user-head-btn-img {
      display: inline-block;
      vertical-align: middle;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      overflow: hidden;
      background: #eee;
      img{
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    .user-head-btn-name {
      font-size: 14px;
      margin-left: 8px;
    }
  }
  .login-btn{
    text-decoration: underline;
    text-underline: #999;
    cursor: pointer;
    &:hover{
      color: black;
      text-underline: #000;
    }
  }
</style>
