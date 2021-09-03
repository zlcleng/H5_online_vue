/*
 * @Author: your name
 * @Date: 2021-09-01 19:03:26
 * @LastEditTime: 2021-09-01 19:04:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \H5_online_vue\src\api\upload.js
 */
// import request from '@/utils/request'
// 上传图片
export default {
  uploadImg (imgFile) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.onerror = reject
      reader.readAsDataURL(imgFile)
    })
  }
}
