import axios from "./axios.js";

export default {
  getSideList(params) {
    return axios.get("/getsidebar", { params: { type: params } });
  },
  //商品列表数据
  getGoodsList(params) {
    return axios.get("/getGoodsList", {
      params: {
        type: params.type,
        page: params.page,
        size: params.size,
        sort: params.sort,
      },
    });
  },
};
