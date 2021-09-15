<template>
  <div class="card bg-secondary my-5">
    <div class="card-header text-white text-center bg-dark">
      <b>Change Passeword By OTP</b>
    </div>
    <div class="card-body">
      <show-message />
      <form @submit.prevent="register">
        <div class="mb-3">
          <label for="otp" class="form-label">OTP</label>
          <input
            type="text"
            v-model="formData.otp"
            class="form-control"
            id="otp"
            required
            @blur="getValidation($event)"
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input
            type="email"
            v-model="formData.email"
            class="form-control"
            id="email"
            required
            aria-describedby="emailHelp"
            @blur="getValidation($event)"
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            v-model="formData.password"
            class="form-control"
            id="password"
            required
            @blur="getValidation($event)"
          />
        </div>
        <div class="mb-3">
          <label for="confirm_password" class="form-label">Confirm Password</label>
          <input
            type="password"
            v-model="formData.password_confirmation"
            class="form-control"
            id="confirm_password"
            required
            @blur="getValidation($event)"
          />
        </div>
        <button class="btn btn-dark m-auto d-block">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import ShowMessage from '../components/ShowMessage.vue';
export default {
  components: { ShowMessage },
  data() {
    return {
      formData: {
        email: "",
        otp: "",
        password: "",
        password_confirmation: "",
      },
    };
  },
  beforeCreate() {
    if (this.$store.state.auth) this.$router.push("/");
  },
  methods: {
    async register() {
        await this.$store.dispatch("chnagePassworByOTP", this.formData);
    },
    getValidation(e) {
      if (e.target.value == "") {
        e.target.classList.add("error");
      } else {
        e.target.classList.remove("error");
      }
    },
    close() {
      this.$store.commit("errors", false);
      this.$store.commit("success", false);
    },
  },
};
</script>

<style scoped>
.card {
  width: 50% !important;
  margin: 0 auto;
}

.error {
  border: 3px solid red;
}
</style>