import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [

  {
    path: '/usuarios',
    name: 'users',
    component: () => import('../views/usuarios/UserListView.vue')
  },
  {
    path: '/senhas',
    name: 'passwords',
    component: () => import('../views/password/PasswordListView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
