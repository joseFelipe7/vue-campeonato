<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import ModalFriends from './components/ModalFriends.vue'
import ModalLogin from './components/ModalLogin.vue'
import ModalRegister from './components/ModalRegister.vue'
import ModalChampionshipDetails from './components/ModalChampionshipDetails.vue'
import requestApi from './helpers/requestHelper'

import { onMounted, ref } from 'vue'

const emit = defineEmits(['toogle-notifyer'])

let userLoggedName = ref(localStorage.getItem('userName'))
let userLoggedToken = ref(localStorage.getItem('authorization_token'))

let championships = ref([])
let championshipsDatails = ref({
    championship:{},
    matchs:[]
})

function notifyer(data){
  emit('toogle-notifyer', data)
}

onMounted(async ()=>{
    let request = await requestApi(`championship?per_page=10&sort=-created_at`, 'GET', true)
    if(!request.status) return emit('toogle-notifyer', {title: 'Falha!', text: request.error, btnText: 'OK'})

    championships.value = request.result.data.championships
})
async function changeDatailChampionship(idChampionship, indexChampionship){
    let request = await requestApi(`championship/${idChampionship}/match/current`, 'GET', true)
    if(!request.status) return emit('toogle-notifyer', {title: 'Falha!', text: request.error, btnText: 'OK'})

    championshipsDatails.value.matchs = request.result.data.matchs
    championshipsDatails.value.championship = championships.value[indexChampionship] 
}

</script>

<template>
  <Header msg="Vite + Vue" :userName="userLoggedName" />

  <div style="background-image: url('/banner.png'); background-position: center; height: 400px;" >
    <div style="width: 100%; height: 100%; background: linear-gradient(360deg, #33115F 15.34%, rgba(0, 0, 0, 0.31) 76.73%); display: flex; align-items: center; justify-content: center;">
        <div style="text-align: center;">
            <p style="color:#FFF; font-weight: bold; font-size: 24px;">Crie e gerencie seus próprios campeonatos </p>
            <router-link to="/campeonato/criar">
                <button  class="btn-rounded btn-confirm">NOVO</button>
            </router-link>
        </div>
    </div>
  </div>


  
  <div class="container my-3">
    <div class="row">
        
       
        <div class="col-lg-4 my-2" v-for="(item, index) in championships" :key="item.id">   
            <div style="padding: 20px 40px; background: #1A0831; display: flex; flex-direction: column; justify-content: space-between; border-radius: 8px; min-height: 400px;">
               <div class="mb-3">
                   <h3 style="color: #FFF; text-align: center;">{{item.name}}</h3> 
               </div>
               <div>
                    <p style="color: #FFF;">Player vencedor: {{item.player_win?item.player_win:'Campeonato em andamento'}}</p>
                    <p style="color: #FFF;">Quantidade de players: {{item.total_players}}</p>
                    <p style="color: #FFF;">Rodada atual: {{item.round_current?item.round_current:'Não iniciado'}}</p>
                    <p style="color: #FFF;">Total de rodadas: {{item.round_total}}</p>
               </div>
               <div class="mb-3 text-center">
                    <button  @click="changeDatailChampionship(item.id, index)" class="btn-confirm-modal" data-bs-toggle="modal" data-bs-target="#championship-modal">Visualizar detalhes</button>
                </div>
            </div>
        </div>

    </div>
  </div>
  <Footer />

  <ModalFriends v-if="userLoggedToken" :userLoggedToken="userLoggedToken"  @notifyer="notifyer"/>
  <ModalChampionshipDetails  :userLoggedToken="userLoggedToken"  :championship="championshipsDatails"  @notifyer="notifyer"/>
  
  
  <!--  <HelloWorld msg="Vite + Vue" /> -->
  
</template>

<style scoped>

</style>
