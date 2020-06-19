import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueResource from "vue-resource";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";
import router from "./router";

Vue.use(firebase);
Vue.use(VueResource);
Vue.config.productionTip = false;

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAYey_ZBa_6YEZZFTaWVxmigwCiqGbs4r4",
  authDomain: "list-official.firebaseapp.com",
  databaseURL: "https://list-official.firebaseio.com",
  projectId: "list-official",
  storageBucket: "list-official.appspot.com",
  messagingSenderId: "602865202965",
  appId: "1:602865202965:web:72d25c38b006aebe281b1c",
  measurementId: "G-61VWGJDYDQ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  render: (h) => h(App),
  vuetify,
  router,
  firebase: firebase,
}).$mount("#app");
