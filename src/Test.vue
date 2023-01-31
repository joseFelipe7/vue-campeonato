<script setup>
import { useRouter } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue'
const router = useRouter()
function trocaPagina(){
    // router.push('/')
    router.push({name:'Home', params:{id:1}})
}
function voltaPagina(){
    router.back();
}
</script>

<template>
  <div>
    <a @click="trocaPagina">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a @click="voltaPagina">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div> 
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
