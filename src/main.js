import Vue from "vue";
import App from "./App.vue";

import Vuelidate from "vuelidate";
import router from "./routes";
import store from "./store";

import "./assets/scss/main.scss";

Vue.config.productionTip = false;
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
