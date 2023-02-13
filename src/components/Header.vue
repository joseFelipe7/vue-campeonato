<template>
    <header>
        <nav class="container">
            <ul class="list-header">
                <li>LOGO</li>
                <li>CAMPEONATOS</li>
                <li><router-link to="/test">Teste</router-link></li>
                <li><a data-bs-target="#friend-modal" data-bs-toggle="modal" data-bs-dismiss="modal">AMIGOS</a></li>
                <li v-if="userName"><a> {{ userName }} </a></li>
                <li v-else><a data-bs-target="#login-modal" data-bs-toggle="modal" data-bs-dismiss="modal">LOGIN</a></li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
    userName: String,
})

const count = ref(0)
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
