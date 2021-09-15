<template>
  <div class="card bg-secondary my-5">
    <div class="card-header text-white text-center bg-dark">
      <b>Login</b>
    </div>
    <div class="card-body">
      <show-message />
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input
            v-model="formData.email"
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="formData.password" type="password" class="form-control" id="password" />
        </div>
        <div class="text-center text-white">
          <button type="submit" class="btn btn-dark m-auto d-block">Submit</button>
          <nuxt-link class="text-center text-white" to="/forget-password">Forget Password</nuxt-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ShowMessage from '../components/ShowMessage.vue';
export default {
  // middleware: 'auth',
  components: { ShowMessage },
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", this.formData);
    },
  },
  beforeCreate() {
    if (this.$store.state.auth) this.$router.push("/");
  },

};
</script>

<style scoped>
.card {
  width: 50% !important;
  margin: 0 auto;
  /* margin-top: 80px; */
}
</style>