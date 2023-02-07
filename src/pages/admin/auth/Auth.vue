<template>
  <section class="auth">
    <div class="container">
      <form class="auth__form" @submit.prevent="onSubmit">
        <h1>NEAR_F00TBALL____2.0</h1>
        <input v-model="user.email" type="email" placeholder="email" required />
        <input
          v-model="user.password"
          type="password"
          placeholder="password"
          required
        />
        <div class="controls">
          <button class="btn btnPrimary">Sign in</button>
          <button class="btn" @click="redirectReg">Sign up</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("authUser", this.user)
        .then((res) => {
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
          // Reset
          this.user.email = "";
          this.user.password = "";
        });
    },
    redirectReg() {
      this.$router.push("/reg");
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.auth {
  text-align: center;
}

.auth__form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 70vh;
  input {
    min-width: 160px;
    width: 50%;
  }
  h1 {
    margin-bottom: 40px;
    font-size: 40px;
    font-weight: 800;
  }
}
.controls {
  /* display: flex;
  justify-content: space-between; */
  width: 33%;
}
</style>
