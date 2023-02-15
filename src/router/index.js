import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Home.vue'
import Test from '../Test.vue'
import Championship from '../Championship.vue'
import ChampionshipList from '../ChampionshipList.vue'

function userLogged(){
  let userLoggedToken =localStorage.getItem('authorization_token')
  if(!userLoggedToken){
    router.push('/')
  }
}
const routes = [
  {
    //path: '/:id',
    path: '/',
    name: 'Home',
    component: Home
  },{
    path: '/campeonato',
    name: 'ChampionshipList',
    component: ChampionshipList,
    beforeEnter: [userLogged],
  },{
    path: '/campeonato/criar',
    name: 'Championship',
    component: Championship,
    beforeEnter: [userLogged],
  }
]
const router = createRouter({
  history: createWebHistory('http://127.0.0.1/#'),
  routes
})
export default router