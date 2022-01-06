import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    name: "Home",
    redirect: "/index",
    children: [
      {
        path: "index",
        name: "Index",
        component: () => import("@/views/Index.vue"),
      },
      {
        path: "class",
        name: "Class",
        component: () => import("@/views/Class.vue"),
      },
      {
        path: "shopping",
        name: "Shopping",
        component: () => import("@/views/Shopping.vue"),
      },
      {
        path: "user",
        name: "User",
        component: () => import("@/views/User.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
