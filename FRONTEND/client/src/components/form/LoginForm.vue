<template>
  <div class="container w-50 border border-dark rounded my-3 p-0">
    <h3 class="p-2 text-center border-bottom border-dark">Đăng nhập</h3>
    <Form @submit="submitLogin" :validation-schema="loginValidate">
      <div class="m-3">
        <strong v-if="errorLoginEmailOrPassword" class="text-danger"
          >Email hoặc mật khẩu không hợp lệ!</strong
        >
        <div class="form-group">
          <label for="email">Email: </label>
          <div>
            <Field
              id="email"
              name="email"
              type="email"
              value=""
              class="form-control"
              placeholder="Vui lòng nhập vào email của bạn"
              v-model="user.email"
            />
          </div>
          <strong class="text-danger"
            ><ErrorMessage name="email"></ErrorMessage
          ></strong>
          <small id="emailHelp" class="form-text text-muted">
            Chúng tôi sẽ không chia sẽ email của bạn với bất kì ai khác.</small
          >
        </div>

        <div class="form-group">
          <label for="password" class="my-2">Mật khẩu:</label>
          <div class="input-group border rounded-2">
            <Field
              id="password"
              name="password"
              :type="isShowPassword ? 'text' : 'password'"
              class="form-control border-0"
              placeholder="Nhập mật khẩu của bạn"
              v-model="user.password"
            />
            <i
              @click="showPassword"
              class="fa-sharp fa-solid fa-eye border-0 bg-white px-2 my-auto"
            ></i>
          </div>
          <strong class="text-danger"
            ><ErrorMessage name="password"></ErrorMessage
          ></strong>
        </div>
        <div class="form-group form-check my-2">
          <Field
            type="checkbox"
            id="remember"
            name="nho-mat-khau"
            class="form-check-input"
            @click="isSavePassword = !isSavePassword"
            v-model="isSavePassword"
          />
          <label for="remember" class="form-check-label"
            >Ghi nhớ đăng nhập</label
          >
        </div>
        <button class="btn text-white btnlogin" type="submit">Đăng nhập</button>
        <router-link
          class="btn text-white ms-4 btnsignin"
          to="/register"
          role="button"
          >Đăng kí tài khoản</router-link
        >
      </div>
    </Form>
  </div>
</template>

<script>
import * as yup from "yup";
import { Field, Form, ErrorMessage } from "vee-validate";
import Cookies from "js-cookie";

export default {
  props: {
    errorLoginEmailOrPassword: { type: Boolean },
  },
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  data() {
    const loginValidate = yup.object().shape({
      email: yup.string().required("Hãy nhập email"),
      password: yup.string().required("Hãy nhập mật khẩu"),
    });
    return {
      loginValidate,
      user: {
        email: "",
        password: "",
      },
      isShowPassword: false,
      isSavePassword: false,
    };
  },
  emits: ["submit:login"],
  methods: {
    submitLogin() {
      if (this.isSavePassword == null) {
        this.setCookie();
      }
      this.$emit("submit:login", this.user);
    },
    handleSubmitOauth(data) {
      console.log(data);
      this.$emit("submit:login", data);
    },
    showPassword() {
      this.isShowPassword = !this.isShowPassword;
    },
    setCookie() {
      if (Cookies.get("user")) {
        Cookies.remove("user");
      }
      // Set a cookie to store the password
      Cookies.set("user", JSON.stringify(this.user), { expires: 7 }); // 'passwordCookie' is the cookie name
    },
    getCookie() {
      if (Cookies.get("user")) {
        let cookie = JSON.parse(Cookies.get("user"));
        this.user.email = cookie.email;
        this.user.password = cookie.password;
      }
    },
  },
  mounted() {
    this.getCookie();
  },
};
</script>

<style scoped>
.btn-login-register-container {
  display: flex;
  justify-content: center;
  margin: 15px 0;
}
.btnlogin,
.btnsignin {
  background-color: #192a56;
}
</style>
