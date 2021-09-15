<template>
  <div>
    <div
      v-if="this.$store.state.errors"
      class="alert alert-danger alert-dismissible fade show"
      role="alert"
    >
      <strong>{{ this.$store.state.errorMsg }}</strong>
      <button
        @click="close"
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
    <div
      v-if="this.$store.state.success"
      class="alert alert-success alert-dismissible fade show"
      role="alert"
    >
      <strong>{{ this.$store.state.successMsg }}</strong>
      <button
        @click="close"
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // close alert message
    close() {
      this.$store.commit("errors", false);
      this.$store.commit("success", false);
    },
  },
};
</script>

<style>
</style>