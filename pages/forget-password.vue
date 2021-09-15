<template>
  <div class="card bg-secondary my-5">
    <div class="card-header text-white text-center bg-dark">
      <b>Forget Password</b>
    </div>
    <div class="card-body">
      <show-message />
      <form @submit.prevent="sendOTP">
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
        <div class="text-center text-white">
          <button type="submit" class="btn btn-dark m-auto d-block">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ShowMessage from "../components/ShowMessage.vue";
export default {
  components: { ShowMessage },
  data() {
    return {
      formData: {
        email: "",
      },
    };
  },
  beforeCreate() {
    // redirect to home page if user is authenticated
    if (this.$store.state.auth) this.$router.push("/");
  },
  methods: {
    sendOTP() {
      this.$store.dispatch("sendOTP", this.formData);
    },
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