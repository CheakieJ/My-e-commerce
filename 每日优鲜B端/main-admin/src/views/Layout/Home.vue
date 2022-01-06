<template>
  <div class="home-container">
    <div class="left-list">
      <LeftMenu :key="key" />
    </div>
    <div :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed }">
      <div class="main-top">
        <Top />
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script>
import LeftMenu from "@/components/LeftMenu";
import Top from "@/components/Top";
export default {
  components: {
    LeftMenu,
    Top,
  },
  data() {
    return {
      key: new Date().getTime(),
    };
  },
  watch: {
    $route() {
      this.key = new Date().getTime();
    },
  },
};
</script>
<style lang="less">
@import "~@/assets/css/home.less";
@import "~@/assets/css/reset.css";
</style>
