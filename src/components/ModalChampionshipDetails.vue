<script setup>
import { ref } from 'vue'

const emit = defineEmits(['logged'])

let form = ref({
    email:'',
    password:''
})

const props = defineProps({
    championship: Object,
    userLoggedToken: String
})

async function searchSendInput(){
    const response = await fetch(`http://if-developers.com.br/api/player?filter[search]=${searchSend.value}`,{
                                method:'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer '+props.userLoggedToken
                                },
                               
                            })

    const responseJson = await response.json();
    if(!response.ok){
        alert(responseJson.message)
    }
    console.log(responseJson.data.players)
    sendInvites.value = responseJson.data.players

}

async function startMatch(){
    const response = await fetch(`http://if-developers.com.br/api/championship/${props.championship.championship.id}/match`,{
                                method:'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer '+props.userLoggedToken
                                },
                               
                            })

    const responseJson = await response.json();
    if(!response.ok){
        alert(responseJson.message)
        return
    }

    const responseMatch = await fetch(`http://if-developers.com.br/api/championship/${props.championship.championship.id}/match/current`,{
                                    method:'GET',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer '+props.userLoggedToken
                                    },
                               
                            })

    const responseMatchJson = await responseMatch.json();
    if(!responseMatch.ok){
        alert(responseMatchJson.message)
        return
    }
    props.championship.championship.round_current += 1
    props.championship.matchs = responseMatchJson.data.matchs
    console.log('start')
}
async function playerWin(idPlayer){
    console.log(idPlayer)
}
</script>
<template>
    <div class="modal modal-lg fade" id="championship-modal" tabindex="-1" aria-labelledby="friendModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content modal-content-custom">
                <div class="modal-header modal-header-custom">
                    <div>
                        <h1>{{championship.championship.name}}</h1>
                    </div>
                </div>
                <div style="display: flex; align-items: center; justify-content: space-between; margin: 0px 15px;">
                    <button  style="background: #21A179; color: #FFF; border-radius: 10px; padding: 2px 20px; font-weight: 600;" @click="startMatch"><span v-if="championship.championship.round_total==championship.championship.round_current">Finalizar campeonato</span> <span v-else>Iniciar Proxima Rodada</span></button>
                    <span style="color: #FFF;">Rodada Atual: {{championship.championship.round_current}}</span>
                </div>
                        
                <div class="modal-body m-0">
                    <div class="mb-3">
                        <table class="table text-white">
                            <thead>
                                <tr>
                                    <td colspan="3" style="color: #FFF; text-align: center; font-weight: 700; font-size: 20px;" >Partidas da Rodada</td>
                                </tr>
                                <tr  v-if="championship.matchs.length > 0">
                                    <th scope="col">Player A</th>
                                    <th scope="col">Player B</th>
                                    <th scope="col" style="text-align: center;">Vencedor</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="championship.matchs.length == 0">
                                    <td colspan="3" style="text-align: center;">Sem partidas no momento</td>
                                </tr>
                                <tr v-for="(item) in championship.matchs" :key="'match-'+item.id">
                                    <td>{{item.player_a}}</td>
                                    <td>{{item.player_b}}</td>
                                    <td style="text-align: center;" v-if="item.id_player_win">{{item.id_player_win==item.id_player_a?item.player_a:item.player_b}}</td>
                                    <td style="text-align: center;" v-else>
                                        <button style="background: #247BA0; color: #FFF; border-radius: 6px; padding: 2px 20px; font-weight: 600;" @click="playerWin(item.id_player_a)">{{item.player_a}}</button>
                                        <button style="background: #247BA0; color: #FFF; border-radius: 6px; padding: 2px 20px; font-weight: 600;" @click="playerWin(item.id_player_b)">{{item.player_b}}</button> 
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                        <!-- <div class="mb-3">
                                <div>
                                    <span @click="selectTabSend" class="btn-friend-tab" id="btn-send-friends" style="">Solicitações de amizade</span> 
                                    <span @click="selectTabSearch" class="btn-friend-tab active-tab" id="btn-search-friend" style="">Encontre Novos Amigos</span>
                                </div>
                            </div>
                            <div class="modal-body-container" id="container-search-friend" style="border: none;">   
                                <div class="mb-4">
                                    <input type="text" placeholder="Pesquisar novos amigos..." v-model="searchSend" @keyup="searchSendInput"  class="form-control" >
                                </div>
                                <div class="my-3" style="display: flex; justify-content: space-between; border-bottom: 1px solid #FE3EE0; padding: 5px 0px"  v-for="(item, index) in sendInvites" :key="item.id">
                                    <span style="color:#FFF">{{item.name}}</span>
                                    <button v-if="item.accept==1" style="background: #21A179; color: #FFF; border-radius: 10px; padding: 2px 20px; font-weight: 600;">Amigo</button>
                                    <button v-else-if="item.accept==0" style="background: #989898; color: #FFF; border-radius: 10px; padding: 2px 20px; font-weight: 600;">Convite Enviado</button>
                                    <button v-else @click="sendRequestFriend(item.id, index)" style="background: #21A179; color: #FFF; border-radius: 10px; padding: 2px 20px; font-weight: 600;">Adicionar</button>
                                </div> 
                            </div>
                            <div class="modal-body-container" id="container-received-friend" style="display: none;">   
                                <div class="mb-4">
                                    <input type="text" placeholder="Procurar solicitações..."  v-model="searchReceived" @keyup="searchReceivedInput"  class="form-control">
                                </div>
                                <div class="my-3" style="display: flex; justify-content: space-between; border-bottom: 1px solid #FE3EE0; padding: 5px 0px"  v-for="(item, index) in recivedInvites" :key="item.id">
                                    <span style="color:#FFF">{{item.name}}</span>
                                    <button v-if="item.accept==1" style="background: #989898; color: #FFF; border-radius: 10px; padding: 2px 20px; font-weight: 600;">Convite Aceito</button>
                                    <button v-else @click="acceptFriend(item.id, index)" style="background: #21A179; color: #FFF; border-radius: 10px; padding: 2px 20px; font-weight: 600;">Aceitar</button>

                                </div>
                            </div> -->
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
</style>
