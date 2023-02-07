<template>
  <div class="wrapper">
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
import EmptyLayout from "./layouts/EmptyLayout.vue";
import MainLayout from "./layouts/MainLayout.vue";

export default {
  components: { EmptyLayout, MainLayout },

  mounted() {
    this.currentUser();
  },
  methods: {
    /* logoutUser() {
      this.$store.dispatch("logoutUser").then(() => {
        this.$router.push("/auth");
      });
    }, */
    currentUser() {
      if (this.$store.state.token !== null) {
        this.showNav = false;
      } else {
        this.showNav = true;
      }
    },
  },
  computed: {
    layout() {
      return this.$route.meta.layout /* || "empty)" */ + "-layout";
    },
  },
};
</script>

<style lang="scss">
.navbar-link {
  &.router-link-exact-active {
    color: blue;
  }
}
</style>
