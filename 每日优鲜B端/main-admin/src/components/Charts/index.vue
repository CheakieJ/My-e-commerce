<template>
  <div>
    <Card />
    <Chart />
  </div>
</template>

<script>
import Card from "@/components/Charts/card.vue";
import Chart from "@/components/Charts/echarts.vue";

export default {
  components: {
    Card,
    Chart,
  },
};
</script>

<style></style>
