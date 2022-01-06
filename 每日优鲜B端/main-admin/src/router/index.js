import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Layout/Home.vue";
import Login from "@/views/Login.vue";
import Logon from "@/views/Logon.vue";
import store from "@/store";
import allowRoutes from "@/util/permission.js";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "index",
    name: "Home",
    component: Home,
    meta: {
      title: "首页",
      isShow: true,
      icon: "home",
    },
    children: [
      {
        path: "index",
        name: "Index",
        component: () => import("@/components/Charts"),
        meta: {
          title: "统计",
          isShow: true,
          icon: "stock",
        },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "登录",
      isShow: false,
    },
  },
  {
    path: "/logon",
    name: "Logon",
    component: Logon,
    meta: {
      title: "注册",
      isShow: false,
    },
  },
];

// 异步路由;
const asyncRouterMap = [
  {
    path: "/product",
    name: "Product",
    component: Home,
    meta: {
      title: "商品",
      isShow: true,
      icon: "shopping",
    },
    children: [
      {
        path: "list",
        name: "ProductList",
        component: () => import("@/components/Pages/Product.vue"),
        meta: {
          title: "商品列表",
          isShow: true,
          icon: "unordered-list",
        },
      },
      {
        path: "add",
        name: "ProductAdd",
        component: () => import("@/components/Pages/ProductAdd.vue"),
        meta: {
          title: "新增商品",
          isShow: true,
          icon: "file-add",
        },
      },
      {
        path: "edit/:id",
        name: "ProductEdit",
        component: () => import("@/components/Pages/ProductEdit.vue"),
        meta: {
          title: "编辑商品",
          isShow: false,
          icon: "file-add",
        },
      },
      {
        path: "category",
        name: "Category",
        component: () => import("@/components/Pages/Category.vue"),
        meta: {
          title: "类目管理",
          isShow: true,
          icon: "shop",
        },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});
/**
 * 路由导航钩子
 */
let isAddRoute = false;
router.beforeEach((to, from, next) => {
  if (to.path !== "/login" && to.path !== "/logon") {
    if (store.state.userInfo.appkey) {
      if (!isAddRoute) {
        const filterRoute = allowRoutes(
          store.state.userInfo.role,
          asyncRouterMap
        );

        store
          .dispatch("changeMenuRoutes", routes.concat(filterRoute))
          .then(() => {
            //添加路由
            filterRoute.forEach((ele) => {
              router.addRoute(ele);
            });
            next();
          });
        isAddRoute = true;
      }
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});
export default router;
