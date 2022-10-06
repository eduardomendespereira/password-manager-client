import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

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
  },
  {
    path: '/senhas/cadastrar',
    name: 'insert-password',
    component: () => import('../views/password/FormInsertView.vue')
  },
  {
    path: '/senhas/editar/:id',
    name: 'edit-password',
    props: (router) => ({ id: router.params.id }),
    component: () => import('../views/password/FormUpdateView.vue')
  },
  {
    path: '/senhas/detalhar/:id',
    name: 'detail-password',
    props: (router) => ({ id: router.params.id }),
    component: () => import('../views/password/DetailView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
