<template>
  <div>
    <a-button
      type="primary"
      style="margin-bottom: 16px"
      @click="toggleCollapsed"
    >
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <div class="breadCrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ route.matched[0].meta.title }}</a-breadcrumb-item>
        <a-breadcrumb-item
          ><RouterLink :to="{ name: route.matched[1].name }">{{
            route.matched[1].meta.title
          }}</RouterLink></a-breadcrumb-item
        >
      </a-breadcrumb>
    </div>
    <div class="user-info">
      <ul>
        <li>
          欢迎:{{ $store.state.userInfo.username }}
          <a-icon type="down" />
        </li>
        <li @click="quit">退出</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      route: this.$router.currentRoute,
    };
  },
  methods: {
    toggleCollapsed() {
      this.$store.commit("co");
    },
    quit() {
      this.$store.dispatch("removeUserInfo");
      this.$router.push({
        name: "Login",
      });
    },
  },
  watch: {
    $route() {
      this.route = this.$router.currentRoute;
    },
  },
};
</script>

<style></style>
