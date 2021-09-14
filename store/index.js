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
  successMsg: ""
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
  }
};
export const actions = {
  async nuxtServerInit({ dispatch, commit }) {
    commit("setToken");
  },

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
            $nuxt.$router.push("/");
          }
        })
        .catch(error => {
          let errors = Object.values(error.response.data);
          if (errors[0] === "Unauthorized") {
            context.commit("errors", true);
            context.commit("errorMsg", "Email and password doesn't match !!");
          } else {
            alert(errors[0]);
          }
        });
      if (token !== null) this.$cookies.set("authToken", token);
    }
  },
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
  async logout(context) {
    const token = this.$cookies.get("authToken");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    await axios
      .put(context.state.api_url + "user/logout", null, config)
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
  chnagePassworByOTP(context, formData){
      console.log(formData);
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
  }
};
