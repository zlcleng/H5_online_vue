/*
 * @Date: 2021-03-04 10:18:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-26 11:47:46
 * @FilePath: \vue_operation_admin\src\utils\request.js
 */
import axios from 'axios'
import { Message } from 'element-ui'

// 创建 axios 实例
const request = axios.create({
  baseURL: '/api/admin',
  timeout: 8000 // 请求超时时间
})

const codeMessage = {
  400: '请求错误',
  401: '未授权，请登录',
  403: '拒绝访问',
  404: '请求地址出错',
  408: '请求超时',
  500: '服务器正在努力工作中，请稍后重试',
  501: '服务器正在努力工作中，请稍后重试',
  502: '服务器正在努力工作中，请稍后重试',
  503: '服务器正在努力工作中，请稍后重试',
  504: '服务器正在努力工作中，请稍后重试',
  505: '服务器正在努力工作中，请稍后重试'
}
request.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    const data = response.data
    return Promise.reject(data)
  },
  err => {
    // 网络连接正常
    if (err.response) {
      err.message = codeMessage[err.response.status]
    }
    err.message && Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(err)
  }
)
export default request
