import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('@/views/GameView.vue'),
    meta: {
      requresAuth: true
    }
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

// Add a navigation guard to automatically push to /login on init
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requresAuth)) {
    if (getAuth().currentUser) {
      next()
    } else {
      alert("you don't have access!")
      next('/')
    }
  }
  if (to.path === '/') {
    next('/login')
  } else {
    next()
  }
})

export default router
