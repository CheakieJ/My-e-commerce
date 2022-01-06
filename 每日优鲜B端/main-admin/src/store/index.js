import Vue from "vue";
import Vuex from "vuex";
import cookie from "@/util/setCookie.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed: false,
    userInfo: cookie.getCookie(),
    //存储菜单的路由
    menuRoutes: [],
  },
  mutations: {
    co(s) {
      s.collapsed = !s.collapsed;
    },
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
    removeUserInfo(state) {
      cookie.removeCookie();
      state.userInfo = {
        username: "",
        email: "",
        appkey: "",
        role: "",
      };
    },
    changeMenuRoutes(state, routes) {
      routes = routes.filter((ele) => ele.meta.isShow);
      state.menuRoutes = routes;
    },
  },
  actions: {
    setUserInfo(ctx, payload) {
      ctx.commit("setUserInfo", payload);
      cookie.setCookie(payload);
    },
    removeUserInfo(ctx) {
      ctx.commit("removeUserInfo");
    },
    changeMenuRoutes(ctx, routes) {
      ctx.commit("changeMenuRoutes", routes);
    },
  },
  modules: {},
});
