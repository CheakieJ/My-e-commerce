import Cookie from "js-cookie";

export default {
  setCookie(info) {
    const arr = Object.entries(info);
    arr.forEach((ele) => {
      Cookie.set(ele[0], ele[1]);
    });
    return this;
  },
  getCookie() {
    return {
      username: Cookie.get("username"),
      email: Cookie.get("email"),
      role: Cookie.get("role"),
      appkey: Cookie.get("appkey"),
    };
  },
  removeCookie() {
    Cookie.remove("username");
    Cookie.remove("email");
    Cookie.remove("role");
    Cookie.remove("appkey");
    return this;
  },
};
