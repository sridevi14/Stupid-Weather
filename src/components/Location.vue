<template>
  <div>
    <div class="">
      <div class="main_Desc">
        <h2 class="add_location">+</h2>
        <h2 id="city_name"></h2>
        <h2 class="share_weather">
          <font-awesome-icon :icon="['fas', 'share']" beat-fade />
        </h2>
      </div>

      <h2 id="weather_temp">
        {{ temp }}°C
        <p id="weather_desc">{{ weather_desc }}</p>
      </h2>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
const temp = ref("");
const weather_desc = ref("");
const props = defineProps({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

onMounted(async () => {
  const url = import.meta.env.VITE_WEATHER_API;
  const key = import.meta.env.VITE_API_KEY;
  const reverse__geocode_api = import.meta.env.VITE_API_REVERSE_GEOCODE;
  const res_weather = await fetch(
    `${url}lat=${props.latitude}&lon=${props.longitude}&appid=${key}`
  );
  const weather_details = await res_weather.json();
  //api call
  const res_city = await fetch(
    `${reverse__geocode_api}lat=${props.latitude}&lon=${
      props.longitude
    }&limit=${1}&appid=${key}`
  );

  const city_name = await res_city.json();
  const cityName = document.getElementById("city_name");
  cityName ? (cityName.innerHTML = city_name[0].name) : null;
  temp.value = ` ${Math.round(weather_details.main.temp - 273.15).toString()}`;
  weather_desc.value = weather_details.weather[0].main;
});
</script>
<style>
.main_Desc {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2px 0 2px;
}
.add_location {
  font-size: 38px;
  padding-left: 2px;
}
.share_weather {
  font-size: 30px;
  align-items: center;
  text-align: center;
}
#city_name {
  color: rgb(14 14 14);
  text-align: center;
  font-size: 30px;
}
#weather_temp {
  color: rgb(14 14 14);
  text-align: center;
  font-size: 80px;
}
#weather_desc {
  font-size: 20px;
  text-align: center;
  margin: 0;
  margin-top: 0.5rem;
}
</style>
