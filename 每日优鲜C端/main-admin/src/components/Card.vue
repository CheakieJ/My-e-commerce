<template>
  <div class="card-container">
    <div class="card-img">
      <img :src="images[0]" />
    </div>
    <div class="card-content">
      <div class="title over-flow">{{ title }}</div>
      <div class="desc over-flow">{{ desc }}</div>
      <div class="tags">
        <div v-for="i in tags" :key="i">{{ i }}</div>
      </div>
      <div class="prices">¥{{ price }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["images", "title", "tags", "price", "desc"],
};
</script>

<style lang="less" scoped>
.card-container {
  width: 100%;
  display: flex;
  height: 100px;
  .card-img {
    width: 90px;
    margin-right: 20px;
    img {
      width: 90px;
      height: 90px;
    }
  }
  .card-content {
    flex: 1;
    position: relative;
    > div {
      width: 170px;
    }
    .title {
      font-size: 13px;
      color: #1a1a1a;
      margin-top: 5px;
    }
    .desc {
      color: #aaa;
      font-size: 11px;
      margin-top: 5px;
    }
    .tags {
      display: flex;
      margin-top: 4px;
      > div {
        font-size: 10px;
        padding: 2px;
        color: #aaa;
        border: 1px solid #aaa;
        border-radius: 3px;
        margin-right: 5px;
      }
    }
  }
  .over-flow {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
