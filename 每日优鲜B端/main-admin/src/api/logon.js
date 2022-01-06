import ins from "@/axios";

export default {
  logon(params) {
    return ins.post("/passport/logon", params);
  },
  code(params) {
    return ins.post("/passport/getCode", params);
  },
};
