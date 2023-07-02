<template>
  <div class="weather_desc_box" v-if="isweather">
    <div class="weather_desc">
      <div class="weather_desc_innerdiv">
        <div>
          <p>Sunrise</p>
          <p style="font-weight: bold">{{ sunrise }}</p>
        </div>
        <div>
          <p>Real feel</p>
          <p style="font-weight: bold">{{ feels_like }}</p>
        </div>
        <div>
          <p>Pressure</p>
          <p style="font-weight: bold">{{ pressure }}hpa</p>
        </div>
      </div>
      <div class="weather_desc_innerdiv">
        <div>
          <p>Sunset</p>
          <p style="font-weight: bold">{{ sunset }}</p>
        </div>
        <div>
          <p>Humidity</p>
          <p style="font-weight: bold">{{ humidity }}%</p>
        </div>
        <div>
          <p>Wind speed</p>
          <p style="font-weight: bold">{{ wind_Speed }}m/s</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
const isweather = ref(false);
const sunrise = ref("");
const sunset = ref("");
const feels_like = ref("");
const humidity = ref("");
const pressure = ref("");
const wind_Speed = ref("");
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
const state = reactive({
  weather_desc: {} as any,
});
const unixconverter = (unix: any) => {
  const date = new Date(unix * 1000);
  const hrs = date.getHours();
  const min = date.getHours();
  const time = `${hrs}:${min}`;
  return time;
};
onMounted(async () => {
  const url = import.meta.env.VITE_WEATHER_API;
  const key = import.meta.env.VITE_API_KEY;
  const res_weather = await fetch(
    `${url}lat=${props.latitude}&lon=${props.longitude}&appid=${key}`
  );
  const weather_details = await res_weather.json();
  state.weather_desc = weather_details;
  isweather.value = true;
  sunrise.value = unixconverter(state.weather_desc.sys.sunrise);
  sunset.value = unixconverter(state.weather_desc.sys.sunset);
  feels_like.value = `${Math.round(
    state.weather_desc.main.feels_like - 273.15
  ).toString()}°C`;
  humidity.value = state.weather_desc.main.humidity;
  pressure.value = state.weather_desc.main.pressure;
  wind_Speed.value = state.weather_desc.wind.speed;
});
</script>
<style scoped>
.weather_desc_box {
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.15);
  margin: 0.5rem;
  padding: 1rem;
}
.weather_desc {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 55px;
  margin: 1rem;
}
.weather_desc_innerdiv {
  display: flex;
  flex-direction: column;
}
</style>
