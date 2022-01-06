import Vue from "vue";
import Vuex from "vuex";
import api from "@/api/sideBar.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideList: [],
    goodList: [],
  },
  mutations: {
    setList(state, dataList) {
      state.sideList = dataList;
    },
    getGoodsList(state, goodList) {
      state.goodList = [...state.goodList, goodList];
    },
  },
  actions: {
    async setList(ctx, dataList) {
      const res = await api.getSideList(dataList);
      ctx.commit("setList", res);
    },
    async getGoodsList(ctx, goodList) {
      const res = await api.getGoodsList();
    },
  },

  modules: {},
});
