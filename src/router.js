import Vue from "vue";
import Router from "vue-router";
import home from "./views/home.vue";
import login from "./views/login.vue";
import register from "./views/register.vue";
import createList from "./views/createList.vue";

import * as firebase from "firebase/app";
import "firebase/auth";

Vue.use(Router);

// Router set area 🔗
const routes = [
  {
    path: "/",
    name: "home",
    component: home,
    meta: { requiresAuth: true },
  },
  {
    path: "/create-list",
    name: "create-list",
    component: createList,
    meta: { requiresAuth: true },
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
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// Auth 🔑
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
