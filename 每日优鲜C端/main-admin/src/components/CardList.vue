<template>
  <div class="list-container">
    <div class="list-header van-hairline--top-bottom">
      <div :class="{ active: type == 'all' }" @touchend="changeType('all')">
        综合
      </div>
      <div :class="{ active: type == 'sale' }" @touchend="changeType(`sale`)">
        销量
      </div>
      <div
        :class="{
          'price-up': type == 'price-up',
          'price-down': type == 'price-down',
        }"
        class="price"
        @touchend="changeType(`price`)"
      >
        价格
      </div>
    </div>
    <div class="list-content">
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        success-text="刷新成功"
      >
        <van-list
          v-model="$store.state.loading"
          :finished="$store.state.finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="onLoad"
        >
          <Card v-for="item in goodList" :key="item.id" v-bind="item" />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  components: {
    Card,
  },
  data() {
    return {
      type: "all",
      isLoading: false,
    };
  },
  computed: {
    ...mapState({
      goodList: (state) => state.goodList,
    }),
  },

  methods: {
    ...mapActions(["getGoodsList"]),
    ...mapMutations(["resetGoodsList"]),
    async onRefresh() {
      this.resetGoodsList();
      this.isLoading = true;
      await this.getGoodsList({
        type: this.$store.state.sideList[0],
        page: 1,
        size: this.$store.state.size,
        sort: this.type,
      });
      this.isLoading = false;
      this.$store.state.finished = false;
      this.$store.state.page = 1;
      this.$store.state.loading = false;
    },
    async onLoad() {
      this.$store.state.page++;
      this.$store.state.loading = true;
      const res = await this.getGoodsList({
        type: this.$store.state.sideList[0],
        page: this.$store.state.page,
        size: this.$store.state.size,
        sort: "all",
      });
      if (res) {
        this.$store.state.loading = false;
      } else {
        this.$store.state.finished = true;
      }
    },
    changeType(type) {
      if (type == "all") {
        this.type = "all";
      } else if (type == "sale") {
        this.type = "sale";
      } else {
        if (this.type == "price-down") {
          this.type = "price-up";
        } else {
          this.type = "price-down";
        }
      }
      this.onRefresh();
    },
  },
};
</script>

<style lang="less">
.list-container {
  .list-header {
    width: 296px;
    position: relative;
    top: 0;
    left: 79px;
    box-sizing: border-box;
    padding: 0 10px;
    display: flex;
    justify-content: flex-end;
    div {
      width: 50px;
      height: 25px;
      text-align: center;
      color: #cecece;
      line-height: 25px;
      font-size: 14px;
    }
    .active,
    .price-up,
    .price-down {
      color: #ff1a90;
      font-weight: bold;
    }

    .price {
      position: relative;
      &::before {
        content: "";
        border: 4px solid transparent;
        border-top-color: #aaa;
        bottom: 4px;
        right: 0;
        position: absolute;
      }
      &::after {
        content: "";
        border: 4px solid transparent;
        border-bottom-color: #aaa;
        top: 4px;
        right: 0;
        position: absolute;
      }
    }
    .price-up {
      &::before {
        border-top-color: #ff1a90;
      }
    }
    .price-down {
      &::after {
        border-bottom-color: #ff1a90;
      }
    }
  }
  .list-content {
    width: 296px;
    position: fixed;
    right: 0;
    bottom: 50px;
    top: 190px;
    overflow: scroll;
  }
}
</style>
