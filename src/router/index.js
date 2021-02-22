import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '*', component: () => import('../views/Err.vue') },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/dashboard',
    component: () => import('../views/DashBoard.vue'),
    children: [
      {
        path: 'modify',
        component: () => import('../components/Modify.vue')
      },
      {
        path: 'viewdata',
        component: () => import('../views/ViewData.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
