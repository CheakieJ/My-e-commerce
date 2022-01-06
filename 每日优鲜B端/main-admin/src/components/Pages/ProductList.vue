<template>
  <a-table :columns="columns" :data-source="tableData" :pagination="pageChange">
    <div slot="operation" slot-scope="text, data">
      <a-button @click="Edit(data)">编辑</a-button>
      <a-button @click="Remove(data)">删除</a-button>
    </div>
  </a-table>
</template>
<script>
const columns = [
  {
    title: "id",
    dataIndex: "id",
    key: "id ",
  },
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "描述",
    dataIndex: "desc",
    key: "desc",
    ellipsis: true,
  },
  {
    title: "类目",
    dataIndex: "category",
    key: "category",
    ellipsis: true,
  },
  {
    title: "预售价格",
    dataIndex: "price",
    key: "price",
    ellipsis: true,
  },
  {
    title: "折扣价格",
    dataIndex: "price_off",
    key: "rice_off",
    ellipsis: true,
  },
  {
    title: "标签",
    dataIndex: "tags",
    key: "tags",
    ellipsis: true,
  },
  {
    title: "限制购买数量",
    dataIndex: "inventory",
    key: "inventory",
    ellipsis: true,
  },
  {
    title: "上架状态",
    dataIndex: "status",
    key: "status",
    ellipsis: true,
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    width: 200,
    align: "center",
    scopedSlots: {
      customRender: "operation",
    },
  },
];

export default {
  data() {
    return {
      columns,
      pageChange: {
        showQuickJumper: true,
        showSizeChanger: true,
      },
      category: {
        1: "酒水冲调",
        2: "时令水果",
        3: "安心乳品",
        4: "休闲零食",
        5: "新鲜蔬菜",
      },
    };
  },
  props: ["dataList"],
  computed: {
    tableData() {
      return this.dataList.map((ele) => {
        return {
          ...ele,
          key: ele.id,
          status: ele.status === 1 ? "上架" : "下架",
          category: this.category[ele.category],
        };
      });
    },
  },
  methods: {
    Edit(data) {
      this.$emit("edit", data);
    },
    Remove(data) {
      this.$emit("remove", data);
    },
  },
};
</script>
