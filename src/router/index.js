/*
 * @Author: your name
 * @Date: 2021-08-25 18:33:01
 * @LastEditTime: 2021-08-25 19:42:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \h5_online_editor\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout'),
    redirect: { name: 'Editor' },
    children: [
      {
        path: '/editor',
        name: 'Editor',
        component: () => import('@/views/editor/index')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
