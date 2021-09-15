<template>
  <div class="card bg-secondary my-5">
    <div class="card-header text-white text-center bg-dark">
      <b>Update Product</b>
    </div>
    <div class="card-body">
      <show-message />
      <product-form mode="edit" :formData="formData" />
    </div>
  </div>
</template>

<script>
import ProductForm from '~/components/ProductForm.vue';
export default {
    middleware: 'auth',
    components: { ProductForm },
    data(){
        return {
            formData: {
              name: '',
              category_id: '',
              brand_id: '',
              price: '',
              images: [],
            },
        }
    },
    async created(){
      const slug = this.$route.params && this.$route.params.slug;
      this.getProduct(slug);
    },

    methods: {
      // load requested product by slug
      async getProduct(slug){
        await this.$axios.get('product/show/' + slug, this.$store.state.config).then(({ data }) => {
          this.formData = data.data;
        }).catch(error => {
          this.$store.commit("errors", true);
          this.$store.commit(
            "errorMsg",
            JSON.stringify(error.response.data.error)
          );
        });
      }
    }

}
</script>

<style scoped>
.card {
  width: 50% !important;
  margin: 0 auto;
  /* margin-top: 80px; */
}
</style>