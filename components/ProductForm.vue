<template>
  <div>
    <form @submit.prevent="mode === 'create' ? saveData() : updateData()">
      <div class="mb-3">
        <label for="email" class="form-label">Product Name</label>
        <input
          v-model="formData.name"
          type="text"
          class="form-control"
          id="name"
          placeholder="Enter Product Name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="category" class="form-label">Product Category</label>
        <select class="form-select" id="category" required v-model="formData.category_id" >
          <option disabled value="">Choose...</option>
          <option v-for="(category, index) in $store.state.categories" :key="index" :value="category.id">{{ category.name }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="brand" class="form-label">Product Brand</label>
        <select class="form-select" id="brand" required v-model="formData.brand_id" >
          <option disabled value="">Choose...</option>
          <option v-for="(brand, index) in $store.state.brands" :key="index" :value="brand.id">{{ brand.name }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Product Price</label>
        <input
          required
          v-model="formData.price"
          type="text"
          class="form-control"
          id="name"
          placeholder="Enter product price"
          
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Poruct Images</label>
        <input
          type="file"
          class="form-control"
          id="name"
          placeholder="Upload Multiple product image"
          multiple
          @change="uploadImage"
        />
      </div>
      <div class="mb-3" v-if="formData.images">
        <label for="email" class="form-label">Selected Poruct Images</label>
        <div class="row d-flex flex-row w-100">
          <div class="col-3" v-for="(image, index) in formData.images" :key="index">
            <div class="product-image">
              <img :src="`${$store.state.storage_url}${image.image}`" height="100px" width="150px" class="rounded  m-1" alt="...">
              <span @click="remove(image, index)" class="text-danger close">X</span>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center text-white">
        <button type="submit" class="btn btn-dark m-auto d-block">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
    props: ['mode', 'formData'],
    data(){
        return {
            valid: true,
        }
    },
    created(){
      // load all the brands store
      this.$store.dispatch('getBrands');

      // load all the categories from store
      this.$store.dispatch('getCategories');
      
    },
    mounted(){
    },
    methods: {

      // check validations
      validate(){
        for (let key in this.formData) {
          if (this.formData[key] === "") {
            this.valid = false;
            this.$store.commit("errors", true);
            this.$store.commit("errorMsg", "Insert All The Data Properly");
          }
        }
      },

      // upload images
      uploadImage(e){
        const files = e.target.files;
        files.forEach(image => {
          const data = new FormData();
          data.append('photo', image);
          this.$axios.post('product/upload-image', data, this.$store.state.config).then(res => {
            this.formData.images.push({
              id: null,
              product_id: null,
              image: res.data.imageName,
            });
          }).catch(error => {
            this.$store.commit("errors", true);
            this.$store.commit("errorMsg", "Image upload failed");
          });
        });
      },

      // remove a image
      remove(image, index){
        console.log(image);
          this.$axios.post('product/delete/image', image, this.$store.state.config).then(response => {
            if(response.status == 200){
               this.formData.images.splice(index, 1);
            }
          })        
      },

      // create new product
      saveData(){
        this.validate();
        if(this.valid){
          this.$store.dispatch('saveProduct', this.formData);
        }
      },

      // update product
      updateData(){
        this.validate();
        if(this.valid){
          this.$store.dispatch('updateProduct', this.formData);
        }
      }
    }
};
</script>

<style scoped>
.product-image {
  position: relative;
}
.close {
  position: absolute;
  top: 0;
  left: 90%;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>