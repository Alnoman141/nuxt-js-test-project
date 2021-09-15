<template>
  <div class="card bg-secondary my-5">
    <div class="card-header text-white text-center bg-dark">
      <b>Create New Product</b>
    </div>
    <div class="card-body">
      <show-message />
      <product-form mode="create" :formData="formData" />
    </div>
  </div>
</template>

<script>
import ProductForm from "~/components/ProductForm.vue";
export default {
  // redirect to login page if unauthenticated
  middleware: "auth",
  components: { ProductForm },
  data() {
    return {
      formData: {
        name: "",
        category_id: "",
        brand_id: "",
        price: "",
        images: [],
      },
    };
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