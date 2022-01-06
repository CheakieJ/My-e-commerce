import axios from "axios";

const ins = axios.create({
  baseURL: "https://mallapi.duyiedu.com/goods/",
});

ins.interceptors.request.use((config) => {
  return {
    ...config,
    params: {
      appkey: "cheakie_1636985294933",
      ...config.params,
    },
  };
});
ins.interceptors.response.use((data) => data.data);
export default ins;
