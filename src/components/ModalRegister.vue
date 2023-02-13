<script setup>
import { ref } from 'vue'


const emit = defineEmits(['register'])

let form = ref({
    name:'',
    email:'',
    password:''
})

async function submit () {
    const response = await fetch('http://if-developers.com.br/api/player',{
                                method:'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body:JSON.stringify({
                                    name:form.value.name,
                                    email:form.value.email,
                                    password:form.value.password
                                })
                            })
                            
    const responseJson = await response.json();
    if(!response.ok){
        alert(responseJson.message)
    }
    console.log(responseJson)
    // localStorage.setItem ('authorization_token', responseJson.data.access_token)
    // localStorage.setItem ('userName', responseJson.data.user.name)
    // localStorage.setItem ('userData', JSON.stringify({
    //                                                 id:responseJson.data.user.id,
    //                                                 name:responseJson.data.user.name,
    //                                                 emai:responseJson.data.user.email
    //                                             }))
    const responseLogin = await fetch('http://if-developers.com.br/api/auth/login',{
                                method:'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body:JSON.stringify({
                                    email:form.value.email,
                                    password:form.value.password
                                })
                            })
                            
    const responseLoginJson = await responseLogin.json();
    if(!responseLogin.ok){
        alert(responseLoginJson.message)
    }

    localStorage.setItem ('authorization_token', responseLoginJson.data.access_token)
    localStorage.setItem ('userName', responseLoginJson.data.user.name)
    localStorage.setItem ('userData', JSON.stringify({
                                                    id:responseLoginJson.data.user.id,
                                                    name:responseLoginJson.data.user.name,
                                                    emai:responseLoginJson.data.user.email
                                                }))
    emit('register', 11111)
    form.value.name = ''
    form.value.email = ''
    form.value.password = ''
    alert('Bem vindo '+localStorage.getItem('userName'))
    document.getElementById('modal-register-close').click()

};

</script>

<template>
    <div class="modal fade" id="cadastro-modal" tabindex="-1" aria-labelledby="cadastroModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content modal-content-custom">
            <div class="modal-header modal-header-custom">
                <div>
                    <h1>CADASTRE-SE</h1>
                </div>
            </div>
            <div class="modal-body m-0">
                <div class="moodal-body-container">  
                    <div class="mb-3">
                        <label for="" class="label-input" >Nome</label>
                        <input type="text" v-model="form.name" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                    </div>
                    <div class="mb-3">
                        <label for="" class="label-input">E-mail</label>
                        <input type="text" v-model="form.email" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                    </div>
                    <div class="mb-3">
                        <label for="" class="label-input">Senha</label>
                        <input type="text" v-model="form.password" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                    </div>
                    <div class="mb-3 text-center">
                        <button  class="btn-confirm-modal"  @click="submit">CADASTRE-SE</button>
                        <button type="button" class="btn btn-secondary" id="modal-register-close" style="display: none;" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
            <div class="modal-footer mb-3 p-0" style="border: none; justify-content: center;">
                <div>
                    <small style="color: #FFF;">Já possui cadastro? <a style="text-decoration: none;color: #FE3EE0; cursor: pointer;" data-bs-target="#login-modal" data-bs-toggle="modal" data-bs-dismiss="modal">Cadastre-se</a></small>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<style scoped>

</style>
