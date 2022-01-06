import ins from "@/axios";

export default {
  login(prams) {
    return ins.post("/passport/login", prams);
  },
};
