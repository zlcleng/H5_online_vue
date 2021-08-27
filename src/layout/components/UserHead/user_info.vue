<template>
  <div class="user-info-plane-dialog inline-block">
    <div class="inline-block" @click="show">
      <slot />
    </div>
    <el-dialog
      v-if="dialogleVisible"
      class="page-dialog-wrapper"
      title=""
      width="400px"
      :visible.sync="dialogleVisible"
      append-to-body
      @close="closePop"
    >
      <div class="user-info-plane">
        <div class="user-image-wrapper">
          <div class="user-image-inner">
            <img :src="userHeadImage">
            <div v-if="showEdit" class="user-image-upload">
              <el-tooltip class="item" effect="dark" content="点击头像更换 (只支持jpg、png格式且大小不超过200kb的图片)">
                <el-upload
                  action="/"
                  :before-upload="beforeUploadUserHeadImage"
                  accept="image/gif, image/jpeg, image/png, image/bmp"
                  :show-file-list="false"
                  class="user-image-upload-input"
                >
                  <i class="el-icon-upload" />
                </el-upload>
              </el-tooltip>
            </div>
          </div>
        </div>
        <el-form label-width="100px">
          <el-form-item label="昵称：">
            <div v-if="!editName">
              <span class="inline-block marginR20">{{ userData.name }}</span>
              <el-button v-if="showEdit" size="mini" icon="el-icon-edit" circle @click="showEditName(true)" />
            </div>
            <div v-else class="edit-name-wrapper">
              <div class="edit-name-input">
                <el-input v-model="name" />
              </div>
              <el-button size="mini" icon="el-icon-close" circle @click="showEditName(false)" />
              <el-button type="success" size="mini" icon="el-icon-check" circle @click="saveNickName" />
            </div>
          </el-form-item>
          <el-form-item label="用户名：">
            <div>{{ userData.username }}</div>
          </el-form-item>
          <el-form-item label="邮箱：">
            <div>{{ userData.email }}</div>
          </el-form-item>
          <el-form-item label="注册时间：">
            <div>{{ userData.created | formatTime }}</div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    userData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    showEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      dialogleVisible: false,
      editName: false,
      name: '',
      userHeadImage: 'http://imgcdn.mijian360.com/Data/Uploads/2021/0812/6114f0bed68ea.png'
    }
  },
  created () {
    this.userHeadImage = this.userData.avatar || this.userHeadImage
    this.name = this.userData.name
  },
  methods: {
    show () {
      this.dialogleVisible = true
    },
    // 保存头像
    saveAvatar (file) {
      const formData = new FormData()
      formData.append('file', file)
      this.$API.updateUserAvatar(formData).then(res => {
        this.$store.commit('UPDATE_USER_INFO', res.body)
      })
    },
    /**
     * 关闭弹窗
     */
    closePop () {
      this.dialogleVisible = false
      this.$emit('close')
    },
    showEditName (type) {
      this.name = this.userData.name
      this.editName = !!type
    },
    saveNickName () {
      this.$API.updateNickName({ name: this.name }).then(res => {
        this.$store.commit('UPDATE_USER_INFO', res.body)
        this.showEditName(false)
      })
    },
    beforeUploadUserHeadImage (file) {
      // 判断文件是否合法
      // if (file.size > 200 * 1024) {
      //   this.$message.error('上传图片不能超过200kb！')
      //   return
      // }
      this.saveAvatar(file)
      return false
    }
  },
  watch: {
    userData (val) {
      this.userHeadImage = val.avatar || this.userHeadImage
      this.name = val.name
    }
  }
}

</script>
<style lang="less" scoped>
.page-dialog-wrapper {

  .user-image-wrapper {
    text-align: center;
    padding-bottom: 20px;
  }
  .user-image-inner {
    display: inline-block;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    img {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
    .user-image-upload {
      width: 100%;
      height: 100%;
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;
      cursor: pointer;
      .user-image-upload-input {
        display: none;
        width: 80px;
        height: 80px;
        text-align: center;
        .el-icon-upload {
          line-height: 80px;
          font-size: 30px;
          color: #eee;
        }
      }
      &:hover {
        .user-image-upload-input {
          display: inline-block;
        }
        background: rgba(0, 0, 0, 0.25);
      }
    }

  }
  .edit-name-input {
    display: inline-block;
    width: 150px;
    margin-right: 16px;
  }
}
</style>
