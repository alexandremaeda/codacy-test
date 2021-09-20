import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main';
import { BootstrapVue } from 'bootstrap-vue';

Vue.config.productionTip = false;

import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(LightBootstrap);
Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
