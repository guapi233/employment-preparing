import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sid: "",
    isLogin: false,
    token: "",
    userInfo: {}
  },
  mutations: {
    setSid(state, value) {
      state.sid = value;
    },
    // 设置用户的基本信息
    setUserInfo(state, value) {
      state.userInfo = value;
      localStorage.setItem("userInfo", JSON.stringify(value));
    },
    setIsLogin(state, value) {
      state.isLogin = value;
    },
    setToken(state, value) {
      state.token = value;
      localStorage.setItem("token", JSON.stringify(value));
    }
  },
  actions: {}
});
