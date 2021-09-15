import axios from "axios";

export const state = () => ({
  base_url: "http://127.0.0.1:8000/",
  api_url: "http://127.0.0.1:8000/api/",
  storage_url: "http://127.0.0.1:8000/",
  auth: false,
  auth_token: null,
  registration: false,
  authUser: {},
  errors: false,
  errorMsg: "",
  success: false,
  successMsg: "",
  config: {},
  brands: [],
  categories: [],
  products: [],
  product: {},
});

export const mutations = {
  login: (state, token) => {
    state.auth_token = token;
    state.auth = true;
  },
  setToken(state) {
    const authToken = this.$cookies.get("authToken");
    if (authToken !== undefined) {
      state.auth_token = authToken;
      state.auth = true;
      // state.config = authToken;
    }
  },
  updateRegister: state => {
    state.registration = true;
  },
  logout(state) {
    state.auth_token = false;
    state.auth = false;
  },
  authUser(state, user) {
    state.authUser = user;
  },
  errors(state, errors) {
    state.errors = errors;
  },
  success(state, success) {
    state.success = success;
  },
  errorMsg(state, errorMsg) {
    state.errorMsg = errorMsg;
  },
  successMsg(state, successMsg) {
    state.successMsg = successMsg;
  },
  config(state, token){
    state.config = {
      headers: { Authorization: `Bearer ${token}`, }
    };
  },
  brands(state, brands){
    state.brands = brands;
  },
  categories(state, categories){
    state.categories = categories;
  },
  products(state, products){
    state.products = products;
  },
  product(state, product){
    state.product = product;
  },
};
export const actions = {
  async nuxtServerInit({ dispatch, commit }) {
    commit("setToken");
    commit("config", this.$cookies.get("authToken"));
  },

  // login method
  async login(context, { email, password }) {
    if (email === "") {
      context.commit("errors", true);
      context.commit("errorMsg", "Email is required");
    } else if (password === "") {
      context.commit("errors", true);
      context.commit("errorMsg", "Password is required");
    } else {
      let token = null;
      await axios
        .post(context.state.api_url + "login", {
          email: email,
          password: password
        })
        .then(response => {
          const authUser = response.data.data;
          context.commit("authUser", authUser);
          
          if (response.data.access_token !== undefined) {
            token = response.data.access_token;
            context.commit("login", response.data.access_token);
            context.commit("config", response.data.access_token)
            $nuxt.$router.push("/");
            
          }
        })
        .catch(error => {
          let errors = Object.values(error.response.data);
          if (errors[0] === "Unauthorized") {
            context.commit("errors", true);
            context.commit("errorMsg", "Email and password doesn't match !!");
          } else {
            context.commit("errorMsg", errors[0]);
          }
        });
      if (token !== null) this.$cookies.set("authToken", token);
    }
  },

  // register method
  register(context, formData) {
    for (let key in formData) {
      if (formData[key] === "") {
        context.commit("errors", true);
        context.commit("errorMsg", "Insert All The Data Properly");
      }
    }
    if (formData.password !== formData.password_confirmation) {
      context.commit("errors", true);
      context.commit("errorMsg", "Password Mismatched");
    }
    if (!context.state.errors) {
      this.$axios
        .post("/register", formData)
        .then(response => {
          if (response.status === 200) {
            context.commit("success", true);
            context.commit("successMsg", "Registration Complete. Please Login");
            context.commit("updateRegister");
            this.$router.push("/login");
          }
        })
        .catch(error => {
          context.commit("errors", true);
          context.commit(
            "errorMsg",
            JSON.stringify(error.response.data.errors)
          );
        });
    }
  },

  // logout method
  async logout(context) {
    await axios
      .put(context.state.api_url + "user/logout", null, context.state.config)
      .then(response => {
        context.commit("logout");
        $nuxt.$router.push("/");
      })
      .catch(error => {
        context.commit("errors", true);
        context.commit("errorMsg", JSON.stringify(error.response.data.errors));
      });
    this.$cookies.remove("authToken");
  },

  // otp send method
  async sendOTP(context, data) {
    if (data.email === "") {
      context.commit("errors", true);
      context.commit("errorMsg", "Email is required");
    } else {
      context.commit("successMsg", "Please Wait. Mail Sending...");
      await axios
        .post(context.state.api_url + "forget-password/send-otp", data)
        .then(response => {
          console.log(response);
          context.commit("success", true);
          context.commit("successMsg", JSON.stringify(response.data.success));
          this.$router.push("/change-password-by-otp");
        })
        .catch(error => {
          context.commit("errors", true);
          context.commit("errorMsg", JSON.stringify(error.response.data.error));
        });
    }
  },

  // change password by opt method
  chnagePassworByOTP(context, formData){
    for (let key in formData) {
        if (formData[key] === "") {
          context.commit("errors", true);
          context.commit("errorMsg", "Insert All The Data Properly");
        }
      }
      if (formData.password !== formData.password_confirmation) {
        context.commit("errors", true);
        context.commit("errorMsg", "Password Mismatched");
      }
      if (!context.state.errors) {
        this.$axios
          .post("/change-password-by-otp", formData)
          .then(response => {
            if (response.status === 200) {
              context.commit("success", true);
              context.commit("successMsg", "Password Changed. Please Login");
              this.$router.push("/login");
            }
          })
          .catch(error => {
            context.commit("errors", true);
            context.commit(
              "errorMsg",
              JSON.stringify(error.response.data.error)
            );
          });
      }
  },

  // load all the brands
  async getBrands(context){
    
    await this.$axios.get('brands',context.state.config).then(({ data }) => {
      context.commit('brands', data.brands);
    }).catch(error => {
      context.commit("errors", true);
      context.commit(
        "errorMsg",
        JSON.stringify(error.response.data.error)
      );
    });
  },

  // load all the categories
  async getCategories(context){
    await this.$axios.get('categories', context.state.config).then(({ data }) => {
      context.commit('categories', data.categories);
    }).catch(error => {
      context.commit("errors", true);
      context.commit(
        "errorMsg",
        JSON.stringify(error.response.data.error)
      );
    });
  },
  
  // load all the products
  async getProducts(context, keyword){
    await this.$axios.get('/products?keyword='+keyword).then(({ data }) => {
      context.commit('products', data.data);
    }).catch(error => {
      context.commit("errors", true);
      context.commit(
        "errorMsg",
        JSON.stringify(error.response.data.error)
      );
    });
  },

  // create a new product
  async saveProduct(context, data){
    this.$axios.post('product/store', data, context.state.config).then(response => {
      context.commit("success", true);
      context.commit("successMsg", "Product Created Successful");
      this.$router.push('/');
    }).catch(error => {
      context.commit("errors", true);
      context.commit(
        "errorMsg",
        JSON.stringify(error.response.data.error)
      );
    });
  },

  // get a single product information
  async getProduct(context, slug){
    await this.$axios.get('product/show/' + slug, context.state.config).then(({ data }) => {
      context.commit("product", data.data);
    }).catch(error => {
      context.commit("errors", true);
      context.commit(
        "errorMsg",
        JSON.stringify(error.response.data.error)
      );
    });
  },

  // update a single product information
  async updateProduct(context, data){
    this.$axios.post('product/update/' + data.slug, data, context.state.config).then(response => {
      context.commit("success", true);
      context.commit("successMsg", "Product Updated Successful");
      this.$router.push('/');
    }).catch(error => {
      context.commit("errors", true);
      context.commit(
        "errorMsg",
        'product not updated'
      );
    });
  },

};
