<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import ModalLogin from './components/ModalLogin.vue'
import ModalRegister from './components/ModalRegister.vue'
import ModalFriends from './components/ModalFriends.vue'

import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

let userLoggedName = ref(localStorage.getItem('userName'))
let userLoggedToken = ref(localStorage.getItem('authorization_token'))
function login(item){
    userLoggedName.value = localStorage.getItem('userName')
    console.log('recebi', userLoggedName)
}
const route = useRoute()

onMounted(()=>{
    // console.log(route)
    // console.log(route.params)
    // console.log(route.params.id)
})
function cheguei(){
    console.log(route)
    console.log(route.params)
    console.log(route.params.id)
}
</script>

<template>
  <Header msg="Vite + Vue" :userName="userLoggedName" />

  <div v-if="userLoggedName" style="background-image: url('/banner.png'); background-position: center; height: 400px;" >
    <div style="width: 100%; height: 100%; background: linear-gradient(360deg, #33115F 15.34%, rgba(0, 0, 0, 0.31) 76.73%); display: flex; align-items: center; justify-content: center;">
        <div style="text-align: center;">
            <p style="color:#FFF; font-weight: bold; font-size: 24px;">Crie e gerencie seus próprios campeonatos </p>
            <button  data-bs-toggle="modal" data-bs-target="#cadastro-modal" style=" background-color: #21A179 ;color:#FFF; border: none; text-align: center; border-radius: 25px; padding: 5px 25px; font-weight: bold;" >CAMPEONATOS </button>
        </div>
    </div>
  </div>

  <div v-else style="background-image: url('/banner.png'); background-position: center; height: 400px;" >
    <div style="width: 100%; height: 100%; background: linear-gradient(360deg, #33115F 15.34%, rgba(0, 0, 0, 0.31) 76.73%); display: flex; align-items: center; justify-content: center;">
        <div style="text-align: center;">
            <p style="color:#FFF; font-weight: bold; font-size: 24px;">Crie e gerencie seus próprios campeonatos </p>
            <button  data-bs-toggle="modal" data-bs-target="#cadastro-modal" style=" background-color: #21A179 ;color:#FFF; border: none; text-align: center; border-radius: 25px; padding: 5px 25px; font-weight: bold;" >CADASTRE-SE </button>
        </div>
    </div>
  </div>


  
  <div class="container my-3">
    <div class="row">
        <div class="col-lg-4 my-2" style="display: flex; justify-content: center;">
            <div class="card"  style="width: 18rem;; background-image:url('/trofeu-card.jpg'); background-position: center top; background-size: 100% auto; height: 350px; border: none;">
                <div class="card-body" style="background: linear-gradient(179.61deg, #247BA0 6.33%, rgba(36, 123, 160, 0.67) 30.42%, rgba(36, 123, 160, 0) 60.59%); border-radius: 5px 5px 0px 0px; display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
                    <div>
                        <span style="color:#FFF; font-weight: bold; font-size: 20px;">Eliminatorio</span>
                    </div>
                    <div>
                        <a @click="cheguei" style="background-color: #21A179 ;color:#FFF; text-align: center; border-radius: 25px; padding: 8px 25px; font-weight: bold; text-decoration: none;">+ criar</a>
                    </div>
                </div>
          </div>
        </div>
        <div class="col-lg-4 my-2" style="display: flex; justify-content: center;">
            <div class="card"  style="width: 18rem;; background-image:url('/trofeu-card.jpg'); background-position: center top; background-size: 100% auto; height: 350px; border: none;">
                <div class="card-body" style="background: linear-gradient(179.61deg, #247BA0 6.33%, rgba(36, 123, 160, 0.67) 30.42%, rgba(36, 123, 160, 0) 60.59%); border-radius: 5px 5px 0px 0px; display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
                    <div>
                        <span style="color:#FFF; font-weight: bold; font-size: 20px;">Eliminatorio</span>
                    </div>
                    <div>
                        <a href="#" style="background-color: #21A179 ;color:#FFF; text-align: center; border-radius: 25px; padding: 8px 25px; font-weight: bold; text-decoration: none;">+ criar</a>
                    </div>
                </div>
          </div>
        </div>
        <div class="col-lg-4 my-2" style="display: flex; justify-content: center;">
            <div class="card"  style="width: 18rem;; background-image:url('/trofeu-card.jpg'); background-position: center top; background-size: 100% auto; height: 350px; border: none;">
                <div class="card-body" style="background: linear-gradient(179.61deg, #247BA0 6.33%, rgba(36, 123, 160, 0.67) 30.42%, rgba(36, 123, 160, 0) 60.59%); border-radius: 5px 5px 0px 0px; display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
                    <div>
                        <span style="color:#FFF; font-weight: bold; font-size: 20px;">Eliminatorio</span>
                    </div>
                    <div>
                        <a href="#" style="background-color: #21A179 ;color:#FFF; text-align: center; border-radius: 25px; padding: 8px 25px; font-weight: bold; text-decoration: none;">+ criar</a>
                    </div>
                </div>
          </div>
        </div>
    </div>
  </div>
  <Footer />

  <ModalLogin @logged="login" />
  <ModalRegister @register="login" />
  <ModalFriends :userLoggedToken="userLoggedToken"/>
  
  <!--  <HelloWorld msg="Vite + Vue" /> -->
  
</template>

<style scoped>

</style>
