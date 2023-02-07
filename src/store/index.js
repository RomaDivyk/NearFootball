import Vue from "vue";
import Vuex from "vuex";

import okoloStore from "./okoloStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { okoloStore },
});
