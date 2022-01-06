import axios from "@/axios";

export default {
  search(res) {
    return axios.get("/category/all", { params: res });
  },
  searchKey(res) {
    return axios.get("/products/all", { params: res });
  },
  remove(id) {
    return axios.delete(`/products/${id}`);
  },
};
