<template>
  <div class="page container my-2">
    <h3 class="text-center">All Products</h3>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th width="5%">Index</th>
          <th width="25%">Name</th>
          <th width="15%">Category</th>
          <th width="15%">Brand</th>
          <th width="10%">Price</th>
          <th width="15%">Image</th>
          <th width="15%">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product.id">
          <td>{{ index+1 }}</td>
          <td>{{ product.name }}</td>
          <td v-if="product.category">{{ product.category.name }}</td>
          <td v-if="product.brand">{{ product.brand.name }}</td>
          <td>{{ product.price }}</td>
          <td>
            <img v-if="product.coverImage" :src="`${$store.state.storage_url}storage/images/${product.coverImage.image}`" alt="Product Image" width="150px" height="80px">
          </td>
          <td>
            <button class="btn btn-dark">Edit</button>
            <button class="btn btn-danger">Delete</button>
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
      products: [],
    }
  },
  created(){
    this.getProducts();
  },
  methods: {
    // load all products from api. this is a public api
    async getProducts(){
      await this.$axios.get('/products').then(({ data }) => {
        this.products = data.data;
      })
    }
  }
}
</script>
