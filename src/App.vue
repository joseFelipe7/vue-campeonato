<script setup>
import { onMounted, ref } from 'vue'

import HelloWorld from './components/HelloWorld.vue';
import Notifyer from './components/Notifyer.vue';

const emit = defineEmits(['toogle-notifyer']);
onMounted(()=>{

})
let onNotifyer = ref(false);
let title = ref('');
let text = ref('');
let btnText = ref('');

function toogleNotifyer(contentNotifyer){
  title.value = contentNotifyer.title;
  text.value = contentNotifyer.text;
  btnText.value = contentNotifyer.btnText;
  onNotifyer.value = true;
  setTimeout(()=>{
    onNotifyer.value = false;
  },6000)
}
</script>

<template>
  
  <Notifyer v-if="onNotifyer" :title="title" :text="text" :btnText="btnText"/>

  <router-view @toogle-notifyer="toogleNotifyer" />
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
