<template>
  <div class="class-container">
    <div class="searchBox">
      <van-icon name="search" />
      <p>香蕉5元500克</p>
    </div>
    <NavF />
    <SideBar />
  </div>
</template>

<script>
import NavF from "@/components/NavF.vue";
import SideBar from "@/components/SideBar.vue";
export default {
  components: {
    NavF,
    SideBar,
  },
};
</script>

<style lang="less" scoped>
.class-container {
  width: 375px;
  .searchBox {
    width: 355px;
    height: 33px;
    background: #eee;
    margin: 11px auto;
    border-radius: 10px;
    color: #a1a1a1;
    font-size: 14px;
    text-align: center;
    line-height: 33px;
    > * {
      display: inline;
      vertical-align: middle;
    }
  }
}
</style>
