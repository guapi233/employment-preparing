import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VeeValidate, { Validator } from "vee-validate";
import zh from "vee-validate/dist/locale/zh_CN";
import axios from "axios";

import "./assets/css/layui.css";

Validator.addLocale(zh);
Vue.use(VeeValidate, {
  locale: "zh_CN",
});

Vue.config.productionTip = false;

axios.defaults.baseURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "http://your.domain.com";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
