<template>
  <div class="product-container">
    <!-- 搜索  -->
    <ProductSearch @sub="subData" />
    <ProductList
      :dataList="dataList"
      @edit="editProduct"
      @remove="removeProduct"
    />
  </div>
</template>

<script>
import ProductSearch from "@/components/Pages/ProductSearch.vue";
import ProductList from "@/components/Pages/ProductList.vue";
import api from "@/api/productSearch.js";
export default {
  components: {
    ProductSearch,
    ProductList,
  },
  data() {
    return {
      dataList: [],
      searchForm: {},
    };
  },
  methods: {
    subData(data) {
      this.searchForm = data;
      this.getTableData();
    },
    async getTableData() {
      const res = await api.searchKey({
        ...this.searchForm,
      });
      this.dataList = res.data;
    },
    editProduct(data) {
      this.$router.push({
        name: "ProductEdit",
        params: {
          id: data.id,
        },
      });
    },
    removeProduct(data) {
      this.$confirm({
        title: "确定要删除该商品吗?",
        content: data.title,
        okText: "删除",
        okType: "danger",
        cancelText: "取消",
        onOk: () => {
          api.remove(data.id).then(() => {
            this.getTableData();
          });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
  },
  created() {
    this.getTableData();
  },
};
</script>

<style></style>
