import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import router from "./router";
import VueSimpleMarkdown from "vue-simple-markdown";
// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import "vue-simple-markdown/dist/vue-simple-markdown.css";


import App from './App.vue'

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(VueSimpleMarkdown);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
