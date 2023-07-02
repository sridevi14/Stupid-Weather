<template>
  <div class="d-flex glass_effect flex-wrap">
    <div class="part1 d-flex flex-column flex=wrap">
      <div class="search-box">
        <input
          type="text"
          class="input-search"
          placeholder="New York City,USA..."
          v-model="searchTerm"
          @input="fetchResults"
        /><font-awesome-icon icon="fas fa-search" style="color: white" />
        <div class="search_result" style="position: absolute">
          <div class="option" v-for="result in state.countries">
            <p @click="assignValue(result)">
              {{ result.city }}, {{ result.countryCode }}
            </p>
          </div>
        </div>
      </div>
      <div class="location mt-4">
        <p>
          <font-awesome-icon icon="fas fa-cloud-sun-rain" />&nbsp;
          India,Friday,may3,2023,12:00pm
        </p>
      </div>
      <div>
        <h2>
          <span id="temp">18°C</span
          ><span style="font-size: 18px" id="feelsLike">feels like 12°C</span>
        </h2>
        <div>
          <img id="climate" :src="image" />
        </div>
        <div class="d-inline-flex p-3 flex-column details mt-4">
          <div class="Wind">
            <span>Wind &nbsp; </span>
            <span id="wind_value">2m/s</span>
          </div>
          <div class="Humidity">
            <span>Humidity &nbsp;</span>
            <span id="humidity_value">15%</span>
          </div>
          <div class="Pressure">
            <span>Pressure&nbsp; </span>
            <span id="pressure_value">2 hpa</span>
          </div>
        </div>
      </div>
    </div>

    <div class="part2 d-flex flex-column flex-wrap">
      <div class="title">
        <h6>World <br />Weather</h6>
        <div class="mt-5">
          <div class="">
            <label style="font-size: 10px">Weather Forecast</label>
            <h1 id="description" style="text-transform: capitalize">Sunny</h1>
          </div>
        </div>
      </div>
      <!-- <ForecastVue :forecast="state.forecast" v-if="Is_forecast" /> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import ForecastVue from "./Forecast.vue";
const name = "src/assets/icons/";
const imageName = "01d.png";
const image = ref(`${name}${imageName}`);
interface countries {
  city: string;
  latitude: number;
  longitude: number;
  countryCode: string;
  country: string;
}
interface forecast {
  forecast: any;
}
const Is_forecast = ref(false);
const state = reactive({
  countries: [] as countries[],
  forecast: [] as forecast[],
});

const searchTerm = ref("");
const fetchResults = async () => {
  if (searchTerm.value === "") {
    state.countries = [] as countries[];
  } else {
    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${searchTerm.value}`;
    //console.log(searchTerm.value);
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "6accd78ec8msh4ca9ebc6579a57fp12e6afjsna4d645dff4de",
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    };

    try {
      const res = await fetch(url, options);
      const { data } = await res.json();

      state.countries = data.map((ele: any) => {
        return {
          city: ele.city,
          countryCode: ele.countryCode,
          latitude: ele.latitude,
          longitude: ele.longitude,
          country: ele.country,
        };
      });
    } catch (error) {
      console.error(error);
    }
  }
};

const assignValue = async (result: any) => {
  const apikey = "98ed8b3f996c6fcea612fdd9e42f7e2f";
  // console.log(state.countries);
  // console.log(result);
  searchTerm.value = result.city;
  state.countries = [] as countries[];
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${result.latitude}&lon=${result.longitude}&appid=${apikey}`
  );
  const forecast = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${result.latitude}&lon=${result.longitude}&appid=${apikey}`
  );
  //console.log(forecast);
  const responose = await res.json();
  const forecast_res = await forecast.json();
  state.forecast = forecast_res.list;
  Is_forecast.value = true;
  image.value = `${name}${responose.weather[0].icon}.png`;
  const description = document.getElementById("description");
  description
    ? (description.innerHTML = responose.weather[0].description)
    : null;
  const feelsLike = document.getElementById("feelsLike");
  feelsLike
    ? (feelsLike.innerHTML = `Feels like ${Math.round(
        responose.main.feels_like - 273.15
      ).toString()}°C`)
    : null;
  const temp = document.getElementById("temp");
  temp
    ? (temp.innerHTML = `${Math.round(
        responose.main.feels_like - 273.15
      ).toString()}°C`)
    : null;
  const humidity_value = document.getElementById("humidity_value");
  humidity_value
    ? (humidity_value.innerHTML = `${responose.main.humidity}%`)
    : null;
  const pressure_value = document.getElementById("pressure_value");
  pressure_value
    ? (pressure_value.innerHTML = `${responose.main.pressure}hpa`)
    : null;
  const wind_value = document.getElementById("wind_value");
  wind_value ? (wind_value.innerHTML = `${responose.wind.speed}m/s`) : null;
};

onMounted(() => {
  //console.log(image.value);
});
</script>

<style scoped>
body {
  color: white;
}

.details {
  border-radius: 1rem;
  background-color: #777474;
  box-shadow: 10px -2px 20px 2px rgb(0 0 0 / 30%);
  align-items: start;
  transition: all 0.5s ease-in-out;
}

.details:hover {
  transform: translateX(-6px);
}
.input-search {
  height: 50px;
  width: 50px;
  border-style: none;
  padding: 10px;
  font-size: 18px;
  letter-spacing: 2px;
  outline: none;
  border-radius: 25px;
  transition: all 0.5s ease-in-out;
  background-color: #545353;
  padding-right: 40px;
  color: white;
}
.input-search::placeholder {
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px !important;
  letter-spacing: 1px;
  font-weight: bolder;
}
.btn-search {
  width: 50px;
  height: 50px;
  border-style: none;
  font-size: 20px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  right: 0px;
  color: white;
  background-color: transparent;
  pointer-events: painted;
}

.search-box {
  margin-top: 1.3rem;
}
.input-search {
  width: 200px;
  border-radius: 0px;
  background-color: transparent;

  border-bottom: 1px solid rgba(255, 255, 255, 0.5);

  transition: all 500ms cubic-bezier(0, 0.11, 0.35, 1);
}
.input-search:focus {
  width: 200px;
  border-radius: 0px;
  background-color: transparent;
  transition: all 500ms cubic-bezier(0, 0.11, 0.35, 1);
}

.part1 {
  border-right: 1px solid rgba(233, 229, 229, 0.5);
  height: 541px;
  /* border-top-right-radius: 2rem;
    border-bottom-right-radius: 2rem; */
  flex: 1.5;
  align-items: center;

  text-align: center;
  color: white;
  background: linear-gradient(
    to bottom,
    rgb(26, 25, 25) 0%,
    rgb(175, 171, 171) 100%
  );

  border-radius: 2rem !important;
}
.part2 {
  flex: 3;
  margin: 2rem 0 0 2rem;
  color: white;
}

.glass_effect {
  min-height: 80vh;
  background: linear-gradient(
    to bottom,
    rgb(26, 25, 25) 0%,
    rgb(175, 171, 171) 100%
  );
  width: 70%;
  border-radius: 2rem !important;
}
.search_result {
  background-color: white;
  text-align: left;
  color: black;
  margin: 11px 0 0 0;
  border-radius: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 4px #00000033;
  width: 15%;
}
.search_result .option:hover {
  background-color: #eee;
}
.search_result .option {
  padding: 4px 12px 3px 12px;
  align-items: center;
}
</style>
