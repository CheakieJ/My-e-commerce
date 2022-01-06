<template>
  <div class="sideNav-container">
    <van-sidebar v-model="index">
      <van-sidebar-item
        v-for="(item, i) in dataList"
        :key="i"
        :title="typeof item === 'number' ? '全部' : item"
        @touchend="moveTo(i)"
      />
    </van-sidebar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    moveTo(i) {
      this.index = i;
    },
  },
  computed: {
    dataList() {
      this.index = 0;
      return this.$store.state.sideList;
    },
  },
};
</script>

<style lang="less">
.sideNav-container {
  .van-sidebar {
    position: fixed;
    left: 0;
    top: 150px;
    bottom: 50px;
    overflow: auto;
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
