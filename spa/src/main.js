import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// LightBootstrap plugin
import LightBootstrap from "./light-bootstrap-main";
import { BootstrapVue } from "bootstrap-vue";

import VueSweetalert2 from "vue-sweetalert2";

import {
  ValidationObserver,
  ValidationProvider,
  Validator,
} from "vee-validate";
import pt_BR from "vee-validate/dist/locale/pt_BR.js";

Vue.config.productionTip = false;

import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(LightBootstrap);
Vue.use(BootstrapVue);
Vue.use(VueSweetalert2, {
  confirmButtonColor: "#007bff",
});

// vee-validate config
// localize('pt_BR', pt_BR);
Validator.localize("pt_br", pt_BR);
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
