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
    page: 1,
    finished: false,
    loading: false,
  },
  mutations: {
    setList(state, dataList) {
      state.sideList = dataList;
    },
    getGoodsList(state, goodList) {
      state.goodList = [...state.goodList, ...goodList];
    },
    resetGoodsList(state) {
      state.goodList = [];
    },
    resetList(state) {
      state.sideList = [];
    },
  },
  actions: {
    async setList(ctx, dataList) {
      const res = await api.getSideList(dataList);
      ctx.commit("setList", res);
    },
    async getGoodsList(ctx, goodList) {
      const { list, total } = await api.getGoodsList(goodList);
      ctx.commit("getGoodsList", list);
      if (ctx.state.goodList.length < total) {
        return true;
      } else {
        return false;
      }
    },
  },

  modules: {},
});
