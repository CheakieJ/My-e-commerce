import axios from "axios";
import store from "./store";
const ins = axios.create({
  baseURL: " https://mallapi.duyiedu.com/",
});

ins.interceptors.request.use(
  (config) => {
    if (config.url.includes(" /passport")) {
      return config;
    } else {
      return {
        ...config,
        params: {
          appkey: store.state.userInfo.appkey,
          ...config.params,
        },
      };
    }
  },
  (error) => Promise.reject(error)
);

ins.interceptors.response.use(
  (res) => {
    if (res.data.status === "fail") {
      return Promise.reject(res.data.msg);
    } else {
      return res.data.data;
    }
  },
  (err) => {
    Promise.reject(err);
  }
);

export default ins;
