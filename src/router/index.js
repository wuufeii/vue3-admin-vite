import { createRouter, createWebHistory } from 'vue-router'
import Layout from 'components/layout/index.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'test',
        name: 'Test',
        component: () => import('@/views/test/Test.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/login',
    name:'Login',
    component: () => import('@/pages/login/Login.vue'),
    meta: { requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
