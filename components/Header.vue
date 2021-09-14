<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <NuxtLogo />
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <nuxt-link class="nav-link active" aria-current="page" to="/">Home</nuxt-link>
            </li>
            <li class="nav-item" v-if="!$store.state.auth">
              <nuxt-link class="nav-link" to="/register">Register</nuxt-link>
            </li>
            <li class="nav-item" v-if="!$store.state.auth">
              <nuxt-link class="nav-link" to="/login">Login</nuxt-link>
            </li>
            <li class="nav-item" v-if="$store.state.auth">
              <a @click.prevent="logout" class="btn nav-link">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import NuxtLogo from "./NuxtLogo.vue";
export default {
  components: { NuxtLogo },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style>
</style>