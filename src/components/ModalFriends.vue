<script setup>
import { ref, onMounted } from 'vue'
import requestApi from '../helpers/requestHelper'

const props = defineProps({
  userLoggedToken: String,
})

const emit = defineEmits(['logged', 'notifyer'])

let form = ref({
  email:'',
  password:''
})
let recivedInvites = ref([])
let sendInvites    = ref([])

let searchSend = ref('')
let searchReceived = ref('')

onMounted(async ()=>{
  await searchSendInput()
  await searchReceivedInput()    
})

function selectTabSend(){
  document.getElementById('container-received-friend').style.display = 'block'
  document.getElementById('container-search-friend').style.display = 'none'
  document.getElementById('btn-send-friends').classList.add('active-tab')
  document.getElementById('btn-search-friend').classList.remove('active-tab')
}

function selectTabSearch(){
  document.getElementById('container-search-friend').style.display = 'block'
  document.getElementById('container-received-friend').style.display = 'none'
  document.getElementById('btn-send-friends').classList.remove('active-tab')
  document.getElementById('btn-search-friend').classList.add('active-tab')
}

async function searchSendInput(){
  let request = await requestApi(`player?filter[search]=${searchSend.value}`, 'GET', true)
  if(!request.status) return emit('notifyer', {title: 'Falha!', text: request.error, btnText: 'OK'})

  sendInvites.value = request.result.data.players
}

async function searchReceivedInput(){
  let request = await requestApi(`friend/pending?filter[search]=${searchReceived.value}`, 'GET', true)
  if(!request.status) return emit('notifyer', {title: 'Falha!', text: request.error, btnText: 'OK'})
  
  recivedInvites.value = request.result.data.friends
}

async function acceptFriend(idFriend, indexFriend){
  let request = await requestApi(`friend/${idFriend}`, 'PUT', true, { })
  if(!request.status) return emit('notifyer', {title: 'Falha!', text: request.error, btnText: 'OK'})

  recivedInvites.value[indexFriend].accept = 1
}

async function sendRequestFriend(idPlayer, indexPlayer){
  let request = await requestApi('friend', 'POST', true, { id_player:idPlayer })
  if(!request.status) return emit('notifyer', {title: 'Falha!', text: request.error, btnText: 'OK'})

  sendInvites.value[indexPlayer].accept = 0
}

</script>
<template>
  <div class="modal fade" id="friend-modal" tabindex="-1" aria-labelledby="friendModal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content modal-content-custom">
        <div class="modal-header modal-header-custom">
          <div>
            <h1>AMIGOS</h1>
          </div>
        </div>
        <div class="modal-body m-0">
          <div class="mb-3">
            <div>
              <!-- <span @click="selectTab('f')" :class="['btn-friend-tab', activeTabA ? 'active-tab' : '']" id="btn-send-friends" style="">Solicitações de amizade</span>  -->
              <span @click="selectTabSend" class="btn-friend-tab" id="btn-send-friends" style="">Solicitações de amizade</span> 
              <span @click="selectTabSearch" class="btn-friend-tab active-tab" id="btn-search-friend" style="">Encontre Novos Amigos</span>
            </div>
          </div>
          <div class="modal-body-container" id="container-search-friend" style="border: none;">   
            <div class="mb-4">
              <input type="text" placeholder="Pesquisar novos amigos..." v-model="searchSend" @keyup="searchSendInput"  class="form-control" >
            </div>
            <div class="my-3 friend-line-modal" v-for="(item, index) in sendInvites" :key="item.id">
              <span class="text-white">{{item.name}}</span>
              <button v-if="item.accept==1" class="btn-modal-friend btn-confirm" style="">Amigo</button>
              <button v-else-if="item.accept==0"  class="btn-modal-friend btn-disable">Convite Enviado</button>
              <button v-else @click="sendRequestFriend(item.id, index)" class="btn-modal-friend btn-confirm" >Adicionar</button>
            </div> 
          </div>
          <div class="modal-body-container" id="container-received-friend" style="display: none;">   
            <div class="mb-4">
              <input type="text" placeholder="Procurar solicitações..."  v-model="searchReceived" @keyup="searchReceivedInput"  class="form-control">
            </div>
            <div class="my-3 container-line-friends" v-for="(item, index) in recivedInvites" :key="item.id">
              <span class="text-white">{{item.name}}</span>
              <button v-if="item.accept==1" class="btn-modal-friend btn-disable">Convite Aceito</button>
              <button v-else @click="acceptFriend(item.id, index)" class="btn-modal-friend btn-confirm">Aceitar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
.container-line-friends{
  display: flex; 
  justify-content: space-between; 
  border-bottom: 1px solid #FE3EE0;
  padding: 5px 0px
}
.friend-line-modal{
  display: flex; 
  justify-content: space-between; 
  border-bottom: 1px solid #FE3EE0; 
  padding: 5px 0px
}
.friend-line-modal span{
  color:#FFF
}
.btn-modal-friend{
  color: #FFF; 
  border-radius: 10px;
  padding: 2px 20px; 
  font-weight: 600;
  transition: 0.3s;
}
.btn-modal-friend.btn-confirm{
  background: #21A179; 
}
.btn-modal-friend.btn-confirm:hover{
  background: #247BA0;
}
.btn-modal-friend.btn-disable{
  background: #989898; 
}
</style>
