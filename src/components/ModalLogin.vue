<script setup>
import { ref } from 'vue'

const emit = defineEmits(['logged'])

const form = {
    email: '',
    password: ''
};

const submit = async () => {
    //form.post(route('posts.store'));
    console.log('oi')
    console.log(form)
    const response = await fetch('http://if-developers.com.br/api/auth/login',{
                                    method:'POST',
                                    body:JSON.stringify({
                                        email:form.email,
                                        password:form.password
                                    })
                                })
    const data = await response.json();
    console.log(data)
    // localStorage.setItem ('userlogado', 'luana')
    // emit('logged', form)
    
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
                        <input type="text" v-model="form.password" id="password" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                    </div>
                    <div class="mb-3 text-center">
                        <button @click="submit" class="btn-confirm-modal">Logar</button>
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
