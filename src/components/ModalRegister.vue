<script setup>
import { ref } from 'vue'
import requestApi from '../helpers/requestHelper'

const emit = defineEmits(['register', 'notifyer'])

let form = ref({
    name:'',
    email:'',
    password:''
})

async function submit () {
    
    let request = await requestApi('player', 'POST', false, { name:form.value.name, email:form.value.email, password:form.value.password })
    if(!request.status) return emit('notifyer', {title: 'Falha!', text: request.error, btnText: 'OK'})

    request = await requestApi('auth/login', 'POST', false, { email:form.value.email, password:form.value.password })
    if(!request.status) return emit('notifyer', {title: 'Falha!', text: request.error, btnText: 'OK'})

  
    localStorage.setItem ('authorization_token', request.result.data.access_token)
    localStorage.setItem ('userName', request.result.data.user.name)
    localStorage.setItem ('userData', JSON.stringify({
                                                    id:request.result.data.user.id,
                                                    name:request.result.data.user.name,
                                                    emai:request.result.data.user.email
                                                }))
    emit('register')
    form.value.name = ''
    form.value.email = ''
    form.value.password = ''
    
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
                    <small style="color: #FFF;">Já possui cadastro? <a style="text-decoration: none;color: #FE3EE0; cursor: pointer;" data-bs-target="#login-modal" data-bs-toggle="modal" data-bs-dismiss="modal">Acesse</a></small>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<style scoped>

</style>
