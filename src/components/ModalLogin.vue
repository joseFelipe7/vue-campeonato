<script setup>
import { ref } from 'vue'
import requestApi from '../helpers/requestHelper'

const emit = defineEmits(['logged', 'notifyer'])

let form = ref({
  email: '',
  password: ''
})


async function submit() {
  const request = await requestApi('auth/login', 'POST', true, {
    email: form.value.email,
    password: form.value.password
  })

  if (!request.status) return emit('notifyer', {
    title: 'Falha!',
    text: request.error,
    btnText: 'OK'
  })

  localStorage.setItem('authorization_token', request.result.data.access_token)
  localStorage.setItem('userName', request.result.data.user.name)
  localStorage.setItem('expires_in_token', Math.floor(Date.now() / 1000) + request.result.data.expires_in)
  localStorage.setItem('userData', JSON.stringify({
    id: request.result.data.user.id,
    name: request.result.data.user.name,
    emai: request.result.data.user.email
  }))

  emit('logged')

  form.value.email = ''
  form.value.password = ''

  document.getElementById('modal-login-close').click()

}
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
              <label  class="label-input">E-mail</label>
              <input type="text" v-model="form.email" id="email" class="form-control" aria-label="Username"
                aria-describedby="basic-addon1">
            </div>
            <div class="mb-3">
              <label  class="label-input">Senha</label>
              <input type="password" v-model="form.password" id="password" class="form-control" aria-label="Username"
                aria-describedby="basic-addon1">
            </div>
            <div class="mb-3 text-center">
              <button @click="submit" class="btn-confirm-modal">Logar</button>
              <button type="button" class="btn btn-secondary" id="modal-login-close" style="display: none;"
                data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
        <div class="modal-footer modal-footer-custom mb-3 p-0">
          <div>
            <small style="color: #FFF;">Ainda não tem cadastro?<a
                style="text-decoration: none;color: #FE3EE0; cursor: pointer;" data-bs-target="#cadastro-modal"
                data-bs-toggle="modal" data-bs-dismiss="modal">Cadastre-se</a></small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>