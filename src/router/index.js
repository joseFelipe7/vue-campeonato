import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Home.vue'
import Test from '../Test.vue'
import Championship from '../Championship.vue'
import ChampionshipList from '../ChampionshipList.vue'

function validToken(to, from, next){
 if(localStorage.getItem('expires_in_token') < Math.floor(Date.now() / 1000) 
    || !localStorage.getItem('expires_in_token'))
  {
    localStorage.removeItem ('authorization_token')
    localStorage.removeItem ('userName')
    localStorage.removeItem ('expires_in_token')
    localStorage.removeItem ('userData')
    
 }
 
 next()
}
function userLogged(to, from, next){
  let userLoggedToken =localStorage.getItem('authorization_token')
  if(!userLoggedToken){
    alert('logue para acessar')
    next({name:'Home'})
  }
  next()
}
const routes = [
  {
    //path: '/:id',
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter:[validToken]
  },{
    path: '/campeonato',
    name: 'ChampionshipList',
    component: ChampionshipList,
    beforeEnter: [validToken, userLogged],
  },{
    path: '/campeonato/criar',
    name: 'Championship',
    component: Championship,
    beforeEnter: [validToken, userLogged],
  }
]
const router = createRouter({
  history: createWebHistory('http://127.0.0.1/#'),
  routes
})
export default router