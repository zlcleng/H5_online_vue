/*
 * @Date: 2021-02-19 10:50:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-25 19:31:17
 * @FilePath: \vue_h5_online\src\api\page.js
 */
/*
	页面相关api
**/
import request from '@/utils/request'
// 获取我的页面列表
export default {
  getMyPages (params) {
    return request({
      url: '/mock/page/getMyPages',
      method: 'get',
      params
    })
  },
  createPage (params) {
    return request({
      url: '/mock/page/createPage',
      method: 'get',
      params
    })
  },
  getPageDetail (params) {
    return request({
      url: '/mock/page/detail',
      method: 'get',
      params
    })
  },
  updatePage (params) {
    return request({
      url: '/mock/page/update',
      method: 'post',
      params
    })
  }
}
