<template>
  <section class="auth">
    <div class="container">
      <form class="auth__form" @submit.prevent="onSubmit">
        <div class="form-item">
          <label>Name:</label>
          <input
            type="text"
            placeholder="name"
            v-model="$v.user.name.$model"
            :class="{ errorInput: $v.user.name.$error }"
            @change="$v.user.name.$touch()"
          />
          <div v-if="show" class="check-error">
            <div class="error-msg" v-if="!$v.user.name.required">
              Field is required
            </div>
            <div class="error-msg" v-if="!$v.user.name.minLength">
              Name must have at least
              {{ $v.user.name.$params.minLength.min }} letters.
            </div>
          </div>
        </div>
        <div class="form-item">
          <label>Email:</label>
          <input
            type="email"
            placeholder="email"
            v-model="$v.user.email.$model"
            :class="{ 'form-group--error': $v.user.email.$error }"
            @change="$v.user.email.$touch()"
          />
          <div v-if="show" class="check-error">
            <div class="error-msg" v-if="!$v.user.email.required">
              Field is required
            </div>
            <div class="error-msg" v-if="!$v.user.email.email">
              This must be an email
            </div>
          </div>
        </div>
        <div class="form-item">
          <label>Password:</label>
          <input
            type="password"
            placeholder="password"
            v-model="$v.user.password.$model"
            :class="{ 'form-group--error': $v.user.password.$error }"
            @change="$v.user.password.$touch()"
          />
          <div v-if="show" class="check-error">
            <div class="error-msg" v-if="!$v.user.password.required">
              Field is required
            </div>
            <div class="error-msg" v-if="!$v.user.password.minLength">
              Name must have at least
              {{ $v.user.password.$params.minLength.min }} letters.
            </div>
          </div>
        </div>
        <div class="form-item">
          <label>Repeat password:</label>
          <input
            type="password"
            placeholder="repeat password"
            v-model="$v.user.repeatPassword.$model"
            :class="{ 'form-group--error': $v.user.repeatPassword.$error }"
            @change="$v.user.repeatPassword.$touch()"
          />
          <div v-if="show" class="check-error">
            <div class="error-msg" v-if="!$v.user.repeatPassword.required">
              Field is required
            </div>
            <div
              class="error-msg"
              v-if="!$v.user.repeatPassword.sameAsPassword"
            >
              Passwords must match
            </div>
          </div>
        </div>

        <button type="submit" class="btn" @click="checkVal">Submit</button>
      </form>
    </div>
  </section>
</template>

<script>
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      show: false,
      user: {
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
      },
    };
  },

  methods: {
    checkVal() {
      if (this.$v.$invalid) {
        this.show = true;
      }
    },
    reset() {
      this.user.name = "";
      this.user.email = "";
      this.user.password = "";
      this.user.repeatPassword = "";
      this.show = false;
      this.$v.$reset();
    },

    onSubmit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        const user = {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          repeatPassword: this.user.repeatPassword,
        };
        console.log(user);
        this.reset();
      }
    },
  },

  validations: {
    user: {
      name: {
        required,
        minLength: minLength(4),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      repeatPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.examp {
  margin-top: 100px;
}
.auth__form {
  margin-top: 100px;
}
input.error {
  border-color: red;
}
.error-msg {
  color: red;
  font-weight: 1000;
  font-style: italic;
  margin-bottom: 8px;
}
</style>
