import { createRouter, createWebHistory } from 'vue-router'
import Game from '@/views/GameView.vue'
import Login from '@/views/LoginView.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

// Add a navigation guard to automatically push to /game on init
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next('/login')
  } else {
    next()
  }
})

export default router
