<script setup>
import { ref } from 'vue'
import requestApi from '../helpers/requestHelper'

const emit = defineEmits(['logged', 'notifyer'])

let form = ref({
  email:'',
  password:''
})

const props = defineProps({
  championship: Object,
  userLoggedToken: String
})

async function searchSendInput(){
  let request = await requestApi(`player?filter[search]=${searchSend.value}`, 'GET', true)
  if(!request.status) return emit('notifyer', {title: 'Falha!', text: request.error, btnText: 'OK'})

  sendInvites.value = request.result.data.players
}

async function startMatch(){
  let request = await requestApi(`championship/${props.championship.championship.id}/match`, 'POST', true)
  if(!request.status) return emit('notifyer', {title: 'Falha!', text: request.error, btnText: 'OK'})

  request = await requestApi(`championship/${props.championship.championship.id}/match/current`, 'GET', true)
  if(!request.status) return emit('notifyer', {title: 'Falha!', text: request.error, btnText: 'OK'})

  props.championship.championship.round_current += 1
  props.championship.matchs = request.result.data.matchs
}

async function endChampionship(){
  let request = await requestApi(`championship/${props.championship.championship.id}/match`, 'POST', true)
  if(!request.status) return emit('notifyer', {title: 'Falha!', text: request.error, btnText: 'OK'})

  emit('notifyer', {title: 'Sucesso!', text: 'campeonato finalizado ganhador foi '+request.result.data.player_win.name, btnText: 'OK'})
}

async function playerWin(idMatch, idPlayer, indexMatch){
  let request = await requestApi(`championship/${props.championship.championship.id}/match/${idMatch}/finished`, 'POST', true, { id_player_win:idPlayer })
  if(!request.status) return emit('notifyer', {title: 'Falha!', text: request.error, btnText: 'OK'})
  
  props.championship.matchs[indexMatch].id_player_win = idPlayer
}
</script>
<template>
  <div class="modal modal-xl fade" id="championship-modal" tabindex="-1" aria-labelledby="friendModal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content modal-content-custom">
        <div class="modal-header modal-header-custom">
          <div>
            <h1>{{championship.championship.name}}</h1>
          </div>
        </div>
        <div class="container-top-datails-chapionship">
          <button v-if="championship.championship.round_total==championship.championship.round_current"  class="btn-rounded btn-finished" @click="endChampionship"><span >Finalizar campeonato</span></button>
          <button v-else class="btn-rounded btn-confirm" @click="startMatch"><span>Iniciar Proxima Rodada</span></button>
            <span style="color: #FFF;">Rodada Atual: {{championship.championship.round_current}}</span>
        </div>
                
        <div class="modal-body m-0">
          <div class="mb-3">
            <table class="table text-white">
              <thead>
                <tr>
                  <td colspan="4" class="title-table">Partidas da Rodada</td>
                </tr>
                <tr  v-if="championship.matchs.length > 0">
                  <th scope="col">Player A</th>
                  <th scope="col">Player B</th>
                  <th scope="col" class="text-center">Vencedor</th>
                  <th scope="col" class="text-center">Status da partida</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="championship.matchs.length == 0">
                  <td colspan="4" class="text-center">Sem partidas no momento</td>
                </tr>
                <tr v-for="(item, index) in championship.matchs" :key="'match-'+item.id">
                  <td>{{item.player_a}}</td>
                  <td>{{item.player_b}}</td>
                  <td class="text-center" v-if="item.id_player_win">{{item.id_player_win==item.id_player_a?item.player_a:item.player_b}}</td>
                  <td v-else>
                    <div class="container-player-select">
                        <button class="btn-player-select" @click="playerWin(item.id, item.id_player_a, index)">{{item.player_a}}</button>
                        <button class="btn-player-select" @click="playerWin(item.id, item.id_player_b, index)">{{item.player_b}}</button> 
                    </div>
                  </td>
                  <td  class="text-center"><span v-if="item.id_player_win">Finalizada</span> <span v-else>Aguardando vencedor</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-top-datails-chapionship{
  display: flex; 
  align-items: center; 
  justify-content: space-between;
  margin: 0px 15px;
}
.title-table{
  color: #FFF; 
  text-align: center; 
  font-weight: 700; 
  font-size: 20px;
}
.container-player-select{
  text-align: center;
  display: flex;
  font-size: 14px;
}
.btn-player-select{
  background: #247BA0; 
  color: #FFF; 
  border-radius: 6px; 
  padding: 2px 20px; 
  font-weight: 600; 
  flex: 1;
  transition: 0.3s;
}
.btn-player-select:hover{
  background: #244da0; 
}
.btn-friend-tab{
  color:#A6A6A6; 
  margin-right: 10px; 
  cursor: pointer;
  transition: 0.3s;
}
.btn-friend-tab.active-tab{
  color:#FFF; 
  text-decoration: underline #21A179; 
  text-underline-offset: 4px;  
}
.btn-friend-tab:hover{
  color: #FFF;
  text-decoration: underline #21A179; 
  text-underline-offset: 4px;  
}
.btn-finished{
  background-color: #FE3EE0 ;
}
.btn-rounded.btn-finished:hover{
  background-color: #fe3e5e ;
}
</style>
