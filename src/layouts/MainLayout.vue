<template>
  <div class="main-header">
    <header>
      <div class="navbar">
        <div class="container">
          <div class="navbar-content">
            <div class="logo">NEAR_F00TBALL____2.0</div>
            <ul class="navbar-list">
              <li class="navbar-item" v-for="link in links" :key="link.title">
                <router-link
                  class="navbar-link"
                  :title="link.title"
                  :to="link.url"
                  >{{ link.title }}
                </router-link>
              </li>
            </ul>
            <span class="logout" @click="logoutUser">Logout</span>
          </div>
        </div>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      showNav: true,
      link: [
        {
          title: "Admin",
          url: "/auth",
        },
        {
          title: "Reg",
          url: "/reg",
        },
      ],

      links: [
        {
          title: "Home",
          url: "/",
        },
        {
          title: "Random",
          url: "/random",
        },
        {
          title: "Players",
          url: "/players",
        },
        {
          title: "Photos",
          url: "/photos",
        },
      ],
    };
  },
  methods: {
    logoutUser() {
      this.$store.dispatch("logoutUser").then(() => {
        this.$router.push("/auth");
      });
    },
  },
};
</script>
<style lang="scss">
.logo {
  font-weight: 900;
  border: 2px solid black;
  margin-right: 2%;
  margin-left: 2%;
}
.logout {
  font-weight: 900;
  border: 2px solid black;
  margin-left: 2%;
  margin-right: 2%;
}
</style>
