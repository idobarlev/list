import Vue from "vue";
import Router from "vue-router";
import home from "./views/home.vue";
import login from "./views/login.vue";
import register from "./views/register.vue";

Vue.use(Router);

// Router set area 🔗
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: home,
    },
    {
      path: "/register",
      name: "register",
      component: register,
    },
    {
      path: "/login",
      name: "login",
      component: login,
    },
  ],
});
