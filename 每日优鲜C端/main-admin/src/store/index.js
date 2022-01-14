import Vue from "vue";
import Vuex from "vuex";
import api from "@/api/sideBar.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideList: [],
    goodList: [],
    size: 5,
    isLoading: false,
  },
  mutations: {
    setList(state, dataList) {
      state.sideList = dataList;
    },
    getGoodsList(state, goodList) {
      state.goodList = [...state.goodList, ...goodList];
    },
  },
  actions: {
    async setList(ctx, dataList) {
      const res = await api.getSideList(dataList);
      ctx.commit("setList", res);
    },
    async getGoodsList(ctx, goodList) {
      const { list } = await api.getGoodsList(goodList);
      ctx.commit("getGoodsList", list);
    },
  },

  modules: {},
});
