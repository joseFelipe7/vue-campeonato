import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Home.vue'
import Test from '../Test.vue'
import Championship from '../Championship.vue'
import ChampionshipList from '../ChampionshipList.vue'

const routes = [
  {
    //path: '/:id',
    path: '/',
    name: 'Home',
    component: Home
  },{
    path: '/campeonato',
    name: 'ChampionshipList',
    component: ChampionshipList
  },{
    path: '/campeonato/criar',
    name: 'Championship',
    component: Championship
  },{
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