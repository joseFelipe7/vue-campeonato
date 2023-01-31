<template>
    <header>
        <nav class="container">
            <ul class="list-header">
                <li>LOGO</li>
                <li>CAMPEONATOS</li>
                <li><router-link to="/test">Teste</router-link></li>
                <li><a data-bs-target="#login-modal" data-bs-toggle="modal" data-bs-dismiss="modal">LOGIN -  <span v-if="nome"> {{nome}}</span>

                    <span v-else> Cadastre se</span>
                    
                    </a></li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
    nome: String,
})

const count = ref(0)

// let logado = localStorage.getItem ('userlogado')
</script>


<style scoped>
header{
    background-color:#1A0831; 
    height: 50px; 
    display: flex; 
    align-items: center;
}
.list-header{
    display: flex; 
    color:#FFF; 
    justify-content: space-between; 
    list-style-type: none; margin: 0;
}
.list-header li a{
    cursor: pointer; 
    text-decoration: none;
}
</style>
