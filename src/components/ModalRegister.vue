<script setup>
import { ref } from 'vue'


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
                    <form action="" method="post">
                        <div class="mb-3">
                            <label for="" class="label-input" >Nome</label>
                            <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                        </div>
                        <div class="mb-3">
                            <label for="" class="label-input">E-mail</label>
                            <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                        </div>
                        <div class="mb-3">
                            <label for="" class="label-input">Senha</label>
                            <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                        </div>
                        <div class="mb-3 text-center">
                            <button  class="btn-confirm-modal">CADASTRE-SE</button>
                        </div>
                    </form>
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
