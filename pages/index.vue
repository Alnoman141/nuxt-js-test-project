<template>
  <div class="page container my-2">
    <div class="d-flex justify-content-between">
      <h3>All Products</h3>
      <div class="d-flex w-50">
        <input
          v-model="keyword"
          type="text"
          class="form-control w-100 me-3"
          id="name"
          placeholder="Search Product By Name"
          @keyup="handleFilter"
        />
        <nuxt-link v-if="$store.state.auth" to="/product/create" class="btn btn-dark w-50">Add Product</nuxt-link>
      </div>
    </div>
    <table class="table table-striped mt-3">
      <thead class="table-dark">
        <tr>
          <th width="5%">Index</th>
          <th width="25%">Name</th>
          <th width="15%">Category</th>
          <th width="15%">Brand</th>
          <th width="10%">Price</th>
          <th width="15%">Image</th>
          <th v-if="$store.state.auth" width="15%">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in $store.state.products" :key="product.id">
          <td>{{ index+1 }}</td>
          <td>{{ product.name }}</td>
          <td v-if="product.category">{{ product.category.name }}</td>
          <td v-if="product.brand">{{ product.brand.name }}</td>
          <td>{{ product.price }}</td>
          <td>
            <img v-if="product.coverImage" :src="`${$store.state.storage_url}${product.coverImage.image}`" alt="Product Image" width="150px" height="80px">
          </td>
          <td v-if="$store.state.auth">
            <nuxt-link :to="'/product/edit/'+product.slug" class="btn btn-dark">Edit</nuxt-link>
            <!-- <button class="btn btn-danger">Delete</button> -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  layout: 'default',
  data(){
    return {
        keyword: '',
    }
  },
  created(){
    this.getProducts();
  },
  methods: {
    // load all products from api. this is a public api
    async getProducts(){
      await this.$store.dispatch('getProducts', this.keyword);
    },
    handleFilter(){
      this.getProducts();
    }
  }
}
</script>
