<template>
  <div class="sideNav-container">
    <van-sidebar v-model="index">
      <van-sidebar-item
        v-for="(item, i) in dataList"
        :key="i"
        :title="typeof item === 'number' ? '全部' : item"
        @click="moveTo(i)"
      />
    </van-sidebar>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    ...mapMutations(["resetGoodsList"]),
    ...mapActions(["getGoodsList"]),
    moveTo(i) {
      this.$store.state.finished = false;
      this.$store.state.page = 1;
      this.$store.state.loading = false;
      this.resetGoodsList();
      this.getGoodsList({
        type: this.dataList[i],
        page: 1,
        size: this.$store.state.size,
        sort: "all",
      });
    },
  },
  computed: {
    dataList() {
      this.index = 0;
      return this.$store.state.sideList;
    },
  },
  mounted() {
    this.getGoodsList({
      type: 2,
      page: 1,
      size: this.$store.state.size,
      sort: "all",
    });
  },
};
</script>

<style lang="less">
.sideNav-container {
  position: fixed;
  left: 0;
  top: 150px;
  bottom: 50px;
  overflow: auto;
  width: 79px;
  .van-sidebar {
    .van-sidebar-item--select {
      color: #d13193;
      &::before {
        background: #d13193;
      }
    }
    &::-webkit-scrollbar {
      width: 0px;
      background: none;
    }
  }
}
</style>
