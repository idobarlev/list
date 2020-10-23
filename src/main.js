import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueResource from "vue-resource";
import router from "./router";
import { auth } from '../firebaseConfig'

Vue.use(VueResource);
Vue.config.productionTip = false;

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      render: (h) => h(App),
      vuetify,
      router,
    }).$mount("#app");
  }
});
