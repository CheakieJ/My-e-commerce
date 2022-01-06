<template>
  <a-form-model layout="inline" :model="formInline" @submit="handleSubmit">
    <a-form-model-item label="检索关键字">
      <a-input v-model="formInline.searchWord" placeholder="请输入关键字">
      </a-input>
    </a-form-model-item>
    <a-form-model-item label="商品类目">
      <a-select
        show-search
        placeholder="请选择类目"
        style="width: 200px"
        @change="handleChange"
        allowClear
      >
        <a-select-option
          v-for="item in dataList"
          :key="item.id"
          :value="item.id"
        >
          {{ item.name }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary" html-type="submit"> 搜索 </a-button>
      <a-button class="btn"
        ><RouterLink :to="{ name: 'ProductAdd' }">新增商品</RouterLink>
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import api from "@/api/productSearch.js";
export default {
  data() {
    return {
      formInline: {
        searchWord: "",
        category: "",
      },
      dataList: [],
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("sub", this.formInline);
    },
    handleChange(val) {
      this.formInline.category = val;
    },
  },
  async created() {
    const res = await api.search();
    this.dataList = res.data;
  },
};
</script>

<style>
.btn {
  position: relative;
  right: -300%;
}
</style>
