import Vue from "vue"
import App from "./App.vue"
import vuetify from "./plugins/vuetify"
import VueResource from "vue-resource"
import router from "./router"
import { auth } from '../firebaseConfig'
import { store } from './store/store'
import VueSocialSharing from 'vue-social-sharing'
import VueClipboard from 'vue-clipboard2'
 
Vue.use(VueClipboard)
Vue.use(VueSocialSharing);
Vue.use(VueResource);
Vue.config.productionTip = false;

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      render: (h) => h(App),
      vuetify,
      store,
      router,
    }).$mount("#app");
  }
});
