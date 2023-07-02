import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faUserSecret,
  faSearch,
  faCloudSunRain,
  faShareNodes,
  faShare,
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faUserSecret, faSearch, faCloudSunRain, faShareNodes, faShare);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
