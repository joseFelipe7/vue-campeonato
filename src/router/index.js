import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Home.vue'
import Test from '../Test.vue'
const routes = [
  {
    path: '/:id',
    name: 'Home',
    component: Home
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  }
]
const router = createRouter({
  history: createWebHistory('http://127.0.0.1/#'),
  routes
})
export default router