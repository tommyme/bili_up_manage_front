import { createApp } from "vue";
import { Quasar, Dialog } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import router from "./route/routes";
import App from "./App.vue";
import { createPinia } from 'pinia';


const app = createApp(App);
app.config.globalProperties.$log = console.log
app.use(Quasar, {
		plugins: {Dialog}, // import Quasar plugins and add here
	})
    .use(router)
    .use(createPinia())
	.mount("#app");

