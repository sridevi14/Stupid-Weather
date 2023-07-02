<script setup lang="ts">
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap";
import Search from "./components/Search.vue";
import Location from "./components/Location.vue";
import Forecast from "./components/Forecast.vue";
import { ref } from "vue";
getLocation();
const latitude = ref(0);
const longitude = ref(0);
const location = ref(false);
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }
}
function showPosition(position: any) {
  location.value = true;
  latitude.value = position.coords.latitude;
  longitude.value = position.coords.longitude;
}

function showError(error: any) {
  console.log("pls allow me to acccess you location 👹 ");
  location.value = false;
}
</script>

<template>
  <main class="container">
    <div class="rain"></div>
    <Location :latitude="latitude" :longitude="longitude" v-if="location" />
    <Forecast :latitude="latitude" :longitude="longitude" v-if="location" />
  </main>
</template>

<!-- <style scoped>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
.main {
  background: rgb(255, 255, 255);
  /* background: linear-gradient( rgba(255,255,255,1) 0%, rgba(8,8,8,1) 100%); */
  background: linear-gradient(
    to bottom,
    rgba(8, 8, 8, 1) 0%,
    rgb(223, 217, 217) 100%
  );

  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style> -->
