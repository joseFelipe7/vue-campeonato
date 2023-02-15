<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import ModalLogin from './components/ModalLogin.vue'
import ModalRegister from './components/ModalRegister.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import requestApi from './helpers/requestHelper'

const router = useRouter()


const emit = defineEmits(['toogle-notifyer'])

let userLoggedName = ref(localStorage.getItem('userName'))
let userLoggedToken = ref(localStorage.getItem('authorization_token'))
let searchFriendInput = ref('')
let friends = ref([])
let hoverFriend = ref(false)
let friendsInvite = ref([])
let friendsIdInvite = ref([])
let nameChampionship = ref('')
let typeChampionship = ref(1)
let totalPlayers   = ref(2)

function notifyer(data){
  emit('toogle-notifyer', data)
}


async function searchFriend(){
    const response = await fetch(`https://if-developers.com.br/api/friend?filter[search]=${searchFriendInput.value}`,{
                                    method:'GET',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer '+userLoggedToken.value
                                    },
                               
                            })

    const responseJson = await response.json();
    if(!response.ok){
        emit('toogle-notifyer', {title: 'Falha!', text: responseJson.message, btnText: 'OK'})
    }
    console.log(responseJson.data)

    friends.value = responseJson.data.friends

}

function increasePlayers (){
    totalPlayers.value = totalPlayers.value*2
}
function decreasePlayers (){
    if(totalPlayers.value/2 > 1){
        totalPlayers.value = totalPlayers.value/2
    }
}
function inviteForChampionship(idFriend, indexFriend){

    if(friendsInvite.value.length+1 > totalPlayers.value){
        emit('toogle-notifyer', {title: 'Ops!', text: 'Número máximo de players atingido', btnText: 'OK'})
        return
    }
    friendsInvite.value.push(friends.value[indexFriend])
    friendsIdInvite.value.push(friends.value[indexFriend].id_friend)
    
}
function removePlayerChapionship(indexFriend){
    friendsInvite.value.splice(indexFriend, 1)
    friendsIdInvite.value.splice(indexFriend, 1)
}   
async function createChampionship(){
  
    if(friendsInvite.value.length != totalPlayers.value){
        emit('toogle-notifyer', {title: 'Ops!', text: 'Número de players diferente do solicitado', btnText: 'OK'})
        return
    }
    const response = await fetch('https://if-developers.com.br/api/championship/created',{
          method:'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+userLoggedToken.value
          },
          body:JSON.stringify({
              name:nameChampionship.value,
              id_type_championship:typeChampionship.value,
              players:friendsIdInvite.value
          })
      })
                            
    const responseJson = await response.json();
    if(!response.ok){
        emit('toogle-notifyer', {title: 'Falha!', text: responseJson.message, btnText: 'OK'})
        return
    }
    emit('toogle-notifyer', {title: 'Sucesso!', text: 'Campeonato criado', btnText: 'OK'})

    router.push('/campeonato')
    return
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
        <div class="col-lg-1"></div>
        <div class="col-lg-3 my-2" style="display: flex; justify-content: center;       flex-direction: column">
            <div class="card"  style="width: 18rem;; background-image:url('/trofeu-card.jpg'); background-position: center top; background-size: 100% auto; height: 350px; border: none;">
                <div class="card-body" style="background: linear-gradient(179.61deg, #247BA0 6.33%, rgba(36, 123, 160, 0.67) 30.42%, rgba(36, 123, 160, 0) 60.59%); border-radius: 5px 5px 0px 0px; display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
                    <div>
                        <span style="color:#FFF; font-weight: bold; font-size: 20px;">Eliminatorio</span>
                    </div>
                </div>
          </div>
          <div class="my-3" style="background: #1A0831; padding: 10px; border-radius: 8px; min-height: 200px;">
            <div>
                <p style="color:#FFF; text-align: center; font-weight: 600; margin: 0;">Jogadores adicionados</p>
            </div>
            <div style="background: #1A0831; border-radius: 8px; padding: 10px;">
                <div class="my-3" style="display: flex; justify-content: space-between; border-bottom: 1px solid #FE3EE0; padding: 8px 0px" v-for="(item,index) in friendsInvite" :key="item.id">
                    <span style="color:#FFF">{{item.name}}</span>
                    <button class="btn-friend btn-pink" @mouseover="hoverFriend = item.id_friend " @mouseleave="hoverFriend = false" @click="removePlayerChapionship(index)"> {{hoverFriend==item.id_friend?'Remover':'Convidado'}}</button>
                </div>
            </div>      
          </div>
        </div>
        <div class="col-lg-7 my-2" style="display: flex; justify-content: center; background: #1A0831; border-radius: 8px;">
            <div style="width: 100%; padding: 20px;">
                <div class="mb-3">
                    <label for="" class="label-input" >Nome do campeonato</label>
                    <input type="text" v-model="nameChampionship" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="" class="label-input">Modalidade</label>
                    <select name="" id=""  class="form-control">
                        <option value="" disabled>Modalidades</option>
                        <option value="1" selected>Eliminatórias</option>
                    </select>
                </div>
                <div class="mb-3">
                    <div style="display: flex; justify-content: space-between;">
                        <label for="" class="label-input">Quantidade de participantes</label>
                        
                        <div class="containter-number-player" style="">
                            <div class="number-select"  @click="decreasePlayers">
                                <span> - </span>
                            </div>
                            <div style="padding: 0px 8px;">
                                <span> {{totalPlayers}} </span>
                            </div>
                            <div class="number-select" @click="increasePlayers">
                                <span> + </span>
                            </div>
                        </div>
                    </div>  
                </div>
                <div class="mb-3">
                    <label for="" class="label-input">Convide seus amigos</label>
                    <input type="text" placeholder="Pesquisar amigos..." v-model="searchFriendInput" @keyup="searchFriend"  class="form-control">
                </div>
                
                    <div class="my-3" style="display: flex; justify-content: space-between; border-bottom: 1px solid #FE3EE0; padding: 5px 0px" v-for="(item, index) in friends" :key="item.id">
                        <span style="color:#FFF">{{item.name}}</span>
                        <button class="btn-friend btn-confirm" @click="inviteForChampionship(item.id, index)" v-if="!friendsIdInvite.includes(item.id_friend)"> Convidar </button>
                        <button class="btn-friend btn-disable" v-else>Convidado</button>
                    </div>
                <div class="mb-3 text-center">
                    <button  class="btn-confirm-modal" @click="createChampionship" >Criar campeonato</button>
                </div>
            </div>
        </div>
        <div class="col-lg-1"></div>

    </div>
  </div>
  <Footer />

  <ModalFriends v-if="userLoggedToken" :userLoggedToken="userLoggedToken"  @notifyer="notifyer"/>
  
</template>

<style scoped>
.containter-number-player{
    color: #FFF; 
    background: #247BA0;
    border-radius: 6px;
    font-weight: 600;
    display: flex;
}
.containter-number-player .number-select{
    transition: 0.2s;
    cursor: pointer; 
    padding: 0px 8px;
    border-radius: 6px;

}
.containter-number-player .number-select:hover{
    background: #21A179;
}
.btn-friend{
    color: #FFF; 
    border-radius: 10px;
    padding: 2px 20px; 
    font-weight: 600;
    transition: 0.3s;
}
.btn-friend.btn-confirm{
    background: #21A179; 
}
.btn-friend.btn-confirm:hover{
    background: #247BA0;
}
.btn-pink{
    background: #FE3EE0;
}
.btn-friend.btn-pink:hover{
    background: #989898;
}
.btn-friend.btn-disable{
    background: #989898; 
}
</style>
