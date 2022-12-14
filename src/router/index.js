import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: "prereg" }
    },
    {
      path: '/pre-registration-sndjoy',
      name: 'prereg',
      component: HomeView
    },
    {
      path: '/pre-registration-sndjoy/step-2',
      name: 'step-2',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/StepTwoView.vue')
    }
  ]
})

export default router
