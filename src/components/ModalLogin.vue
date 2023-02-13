<script setup>
import { ref } from 'vue'

const emit = defineEmits(['logged'])

let form = ref({
    email:'',
    password:''
})


async function submit () {
    //form.post(route('posts.store'));
    console.log('oi')
    
    const response = await fetch('http://if-developers.com.br/api/auth/login',{
                                method:'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body:JSON.stringify({
                                    email:form.value.email,
                                    password:form.value.password
                                })
                            })
                            
    const responseJson = await response.json();
    if(!response.ok){
        alert(responseJson.message)
    }

    localStorage.setItem ('authorization_token', responseJson.data.access_token)
    localStorage.setItem ('userName', responseJson.data.user.name)
    localStorage.setItem ('userData', JSON.stringify({
                                                    id:responseJson.data.user.id,
                                                    name:responseJson.data.user.name,
                                                    emai:responseJson.data.user.email
                                                }))
    emit('logged', 11111)
    form.value.email = ''
    form.value.password = ''
    alert('Bem vindo '+localStorage.getItem('userName'))
    document.getElementById('modal-login-close').click()


    
};
</script>
<template>
    <div class="modal fade" id="login-modal" tabindex="-1" aria-labelledby="loginModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content modal-content-custom">
            <div class="modal-header modal-header-custom">
                <div>
                    <h1>Login</h1>
                </div>
            </div>
            <div class="modal-body m-0">
                <div class="moodal-body-container">   
                    <div class="mb-3">
                        <label for="" class="label-input" >E-mail</label>
                        <input type="text" v-model="form.email" id="email" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                    </div>
                    <div class="mb-3">
                        <label for="" class="label-input">Senha</label>
                        <input type="password" v-model="form.password" id="password" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                    </div>
                    <div class="mb-3 text-center">
                        <button @click="submit" class="btn-confirm-modal">Logar</button>
                        <button type="button" class="btn btn-secondary" id="modal-login-close" style="display: none;" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
            <div class="modal-footer mb-3 p-0" style="border: none; justify-content: center;">
                <div>
                    <small style="color: #FFF;">Ainda não tem cadastro?<a style="text-decoration: none;color: #FE3EE0; cursor: pointer;" data-bs-target="#cadastro-modal" data-bs-toggle="modal" data-bs-dismiss="modal">Acesse</a></small>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<style scoped>

</style>
