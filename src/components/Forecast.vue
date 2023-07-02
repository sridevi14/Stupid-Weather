<template>
  <div class="forecast" v-if="isforecast">
    <div class="containers">
      <div id="today_forecast">
        <img id="forecast_climate" :src="state.img[0]" />
        <h2>Today:{{ state.today[0].weather[0].main }}</h2>
        <h2>&nbsp;33°C/21°C</h2>
      </div>
      <div id="tomorrow_forecast">
        <img id="forecast_climate" :src="state.img[1]" />
        <h2>Tomorrow:{{ state.tomorrow[0].weather[0].main }}</h2>
        <h2>&nbsp;33°C/21°C</h2>
      </div>
      <div id="nextday_forecast">
        <img id="forecast_climate" :src="state.img[2]" />
        <h2>{{ thirdday }}:{{ state.nextday[0].weather[0].main }}</h2>
        <h2>&nbsp;33°C/21°C</h2>
      </div>
    </div>
    <div class="days_forecast_btn">
      <button class="days_forecast">5-day forecast</button>
    </div>
    <WeatherDesc :latitude="props.latitude" :longitude="props.longitude" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import WeatherDesc from "./WeatherDesc.vue";
//image ref
const isforecast = ref(false);
const name = "src/assets/icons/";
const image = ref(``);
const thirdday = ref("");
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
  img: [] as any,
  today: [] as any,
  tomorrow: [] as any,
  nextday: [] as any,
});
// Convert Unix time to date
function unixTimeToDate(element: any) {
  const date = new Date(element.dt * 1000);
  const day = date.getDate();
  const today = new Date();

  if (day === today.getDate()) {
    state.today.push(element);
  } else if (day === today.getDate() + 1) {
    state.tomorrow.push(element);
  } else if (day === today.getDate() + 2) {
    const thirdDay = new Date(today);
    thirdDay.setDate(today.getDate() + 2);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayIndex = thirdDay.getDay(); // Get the day of the week as a number (0 - 6)
    const dayOfWeek = daysOfWeek[dayIndex]; // Get the day of the week as a string
    thirdday.value = dayOfWeek;
    state.nextday.push(element);
  }
  return day;
}

onMounted(async () => {
  const url = import.meta.env.VITE_FORECAST_API;
  const key = import.meta.env.VITE_API_KEY;
  //fetch forecast for five days
  const forecast = await fetch(
    `${url}lat=${props.latitude}&lon=${props.longitude}&appid=${key}`
  );
  const forecast_res = await forecast.json();
  forecast_res.list.forEach((element: any) => {
    const day = unixTimeToDate(element);
  });
  isforecast.value = true;
  state.img.push(`${name}${state.today[0].weather[0].icon}.png`);
  state.img.push(`${name}${state.tomorrow[0].weather[0].icon}.png`);
  state.img.push(`${name}${state.nextday[0].weather[0].icon}.png`);
});
</script>

<style>
#today_forecast,
#tomorrow_forecast,
#nextday_forecast {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.containers {
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.15);
  margin: 0.5rem;
  padding: 1rem;
  backdrop-filter: blur(5px);
}
#today_forecast h2,
#tomorrow_forecast h2,
#nextday_forecast h2 {
  backdrop-filter: none;
}
#forecast_climate {
  width: 35px;
  height: 35px;
}
.days_forecast {
  margin-top: 3rem;
  background: black;
  border: none;
  padding: 0.5rem;
  border-radius: 5px;
  color: white;
  font-size: 17px;
}
.days_forecast_btn {
  text-align: center;
  margin: 2.5rem 0 0 1rem;
}
</style>
