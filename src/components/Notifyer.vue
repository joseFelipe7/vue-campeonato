<script setup>
import { ref } from 'vue'

defineProps({
    title: String,
    text: String,
    btnText: String,
})
</script>

<template>
  <div id="alert-notifyer" class="notifyer">
    <div class="notifyer-colors">
      <div class="notifyer-content">
        <h2 class="notifyer-title">{{title}} </h2>
        <div id="notifyer-text" >{{text}}</div>
      </div>
      <a href="#" class="notifyer-action">{{btnText}}</a>
    </div>
  </div>
</template>

<style scoped>
.notifyer {
	position: absolute;
	top: 60px;
	left: 20px;
  z-index: 2000;
	background-position: center;
	background-size: cover;
	display: flex;
	align-items: flex-end;
	height: 90px;
	width: 300px;
	border-radius: 1rem;
	box-shadow: 0 0 2px #ffffff80;
	background-image: url("https://c4.wallpaperflare.com/wallpaper/402/1008/880/illuminating-ball-sphere-3d-wallpaper-preview.jpg");
}

.notifyer-colors {
	width: 100%;
	height: 100%;
	display: flex;
	gap: 15px;
	padding: 15px;
	justify-content: space-between;
	background-color: #ffffff20;
	border-top: 1px solid #ffffff30;
	border-radius: 1rem;
	backdrop-filter: blur(0.9rem);
	transition: ease 0.5s;
}

.notifyer-content {
	display: flex;
	flex-direction: column;
	align-items:  flex-start;
	justify-content: center;
	color: #ffffffdd;
}

.notifyer-content .notifyer-title {
	color: #ffffffdd;
	font-size: 20px;
	margin-bottom: 5px;
}

.notifyer-colors .notifyer-action {
	background-image: linear-gradient(  90deg,  #e761ffaa 0%,  #ffb8f4aa 50%,  #d0f3e6aa 100% );
	background-size: 200%;
	font-size: 14px;
	font-weight: 700;
	color: #2c005c;
	text-decoration: none;
	padding: 20px 15px;
	border-radius: 6px;
	box-shadow: 0 0.5rem 10px -3px #00000025;
	transition: 0.5s ease-in-out;
}

.notifyer-colors .notifyer-action:hover {
	background-position: right;
}
</style>
