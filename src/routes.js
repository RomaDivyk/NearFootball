// Default
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// Pages
import Auth from "@/pages/admin/auth/Auth.vue";

import Reg from "@/pages/Reg.vue";

import Home from "@/pages/Home.vue";
import NotFound from "@/pages/404.vue";
import Example from "@/pages/Example.vue";
import Random from "@/pages/Random.vue";
import Players from "@/pages/Players.vue";
import Photos from "@/pages/Photos.vue";
import okoloStore from "./store/okoloStore";

// Routering
const router = new Router({
  mode: "history", // hesh /#/
  routes: [
    {
      path: "/auth",
      name: "auth",
      meta: { layout: "empty" },
      component: Auth,
    },
    {
      path: "/reg",
      name: "reg",
      meta: { layout: "empty" },
      component: Reg,
    },
    {
      path: "/",
      name: "home",
      meta: { layout: "main", auth: true },
      component: Home,
    },
    {
      path: "/example",
      name: "example",
      meta: { layout: "main", auth: true },
      component: Example,
    },
    {
      path: "/random",
      name: "random",
      meta: { layout: "main", auth: true },
      component: Random,
    },
    {
      path: "/players",
      name: "players",
      meta: { layout: "main", auth: true },
      component: Players,
    },
    {
      path: "/photos",
      name: "photos",
      meta: { layout: "main", auth: true },
      component: Photos,
    },
    {
      path: "*",
      name: "notFound",
      meta: { layout: "main", auth: true },
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const currentUser = okoloStore.state.token;
  const currentUserLocalStorage = localStorage.getItem("token");
  /*  console.log(currentUser);
  console.log(currentUserLocalStorage); */
  const requiredAuth = to.matched.some((Players) => Players.meta.auth);

  if (
    requiredAuth === true &&
    currentUser === null &&
    currentUserLocalStorage === null
  ) {
    next("/auth");
  } else {
    next();
  }
});

export default router;
