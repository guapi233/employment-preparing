import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import jwt from "jsonwebtoken";
import moment from "dayjs";
import store from "@/store";

const Login = () => import(/* webpackChunkName: 'login' */ "./views/Login.vue");
const Reg = () => import(/* webpackChunkName: 'reg' */ "./views/Reg.vue");
const Forget = () =>
  import(/* webpackChunkName: 'forget' */ "./views/Forget.vue");
const Index = () =>
  import(/* webpackChunkName: 'index' */ "./views/channels/Index.vue");
const Template1 = () =>
  import(/* webpackChunkName: 'template1' */ "./views/channels/Template1.vue");
const Center = () =>
  import(/* webpackChunkName: 'center' */ "@/views/Center.vue");
const UserCenter = () =>
  import(/* webpackChunkName: 'user-center' */ "@/components/user/Center.vue");
const Settings = () =>
  import(/* webpackChunkName: 'settings' */ "@/components/user/Settings.vue");
const Posts = () =>
  import(/* webpackChunkName: 'user-post' */ "@/components/user/Posts.vue");
const Msg = () =>
  import(/* webpackChunkName: 'user-msg' */ "@/components/user/Msg.vue");
const Others = () =>
  import(/* webpackChunkName: 'othres' */ "@/components/user/Others.vue");
const MyInfo = () =>
  import(/* webpackChunkName: 'info' */ "@/components/user/common/MyInfo.vue");
const PicUpload = () =>
  import(
    /* webpackChunkName: 'uploadpic' */ "@/components/user/common/PicUpload.vue"
  );
const Passwd = () =>
  import(
    /* webpackChunkName: 'password' */ "@/components/user/common/Passwd.vue"
  );
const Accounts = () =>
  import(
    /* webpackChunkName: 'accounts' */ "@/components/user/common/Accounts.vue"
  );
const MyPost = () =>
  import(
    /* webpackChunkName: 'mypost' */ "@/components/user/common/MyPost.vue"
  );
const MyCollection = () =>
  import(
    /* webpackChunkName: 'mycollection' */ "@/components/user/common/MyCollection.vue"
  );
const User = () => import(/* webpackChunkName: 'home' */ "@/views/User.vue");
const NoFound = () =>
  import(/* webpackChunkName: 'notfound' */ "@/views/NotFound.vue");
const Confirm = () =>
  import(/* webpackChunkName: 'confirm' */ "@/views/Confirm.vue");
const Reset = () => import(/* webpackChunkName: 'reset' */ "@/views/Reset.vue");
const Add = () =>
  import(/* webpackChunkName: 'add' */ "@/components/contents/Add.vue");
const Edit = () =>
  import(/* webpackChunkName: 'edit' */ "@/components/contents/Edit.vue");
const Detail = () =>
  import(/* webpackChunkName: 'detail' */ "@/components/contents/Detail.vue");

Vue.use(Router);

const router = new Router({
  linkExactActiveClass: "layui-this",
  routes: [
    {
      path: "/",
      component: Home,
      children: [
        {
          path: "",
          name: "index",
          component: Index
        },
        {
          path: "/index/:catalog",
          name: "catalog",
          component: Template1
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/confirm",
      name: "confirm",
      component: Confirm
    },
    {
      path: "/reset",
      name: "reset",
      component: Reset
    },
    {
      path: "/reg",
      name: "reg",
      component: Reg,
      beforeEnter: (to, from, next) => {
        if (from.name === "login") {
          next();
        } else {
          next("/login");
        }
      }
    },
    {
      path: "/forget",
      name: "forget",
      component: Forget
    },
    {
      path: "/user/:uid",
      name: "home",
      props: true,
      component: User
    },

    {
      path: "/add",
      name: "add",
      component: Add,
      meta: { requiresAuth: true }
    },
    {
      path: "/edit/:tid",
      props: true,
      name: "edit",
      component: Edit,
      meta: { requiresAuth: true },
      beforeEnter(to, from, next) {
        // 正常的情况 detail
        if (
          ["detail", "mypost"].indexOf(from.name) !== -1 &&
          to.params.page &&
          to.params.page.isEnd === "0"
        ) {
          next();
        } else {
          // 用户在edit页面刷新的情况
          const editData = localStorage.getItem("editData");
          if (editData && editData !== "") {
            const editObj = JSON.parse(editData);
            if (editObj.isEnd === "0") {
              next();
            } else {
              next("/");
            }
          } else {
            next("/");
          }
        }
      }
    },
    {
      path: "/detail/:tid",
      name: "detail",
      props: true,
      component: Detail,
      meta: {
        // 通过后台接口动态添加到路由 addRoutes
        types: ["get", "add", "delete"]
      }
    },
    {
      path: "/center",
      linkActiveClass: "layui-this",
      component: Center,
      meta: {
        requirsAuth: true
      },
      children: [
        {
          path: "",
          name: "center",
          component: UserCenter
        },
        {
          path: "set",
          name: "set",
          component: Settings,
          children: [
            {
              path: "",
              name: "info",
              component: MyInfo
            },
            {
              path: "pic",
              name: "pic",
              component: PicUpload
            },
            {
              path: "passwd",
              name: "passwd",
              component: Passwd
            },
            {
              path: "account",
              name: "account",
              component: Accounts
            }
          ]
        },
        {
          path: "msg",
          name: "msg",
          component: Msg
        },
        {
          path: "posts",
          name: "posts",
          component: Posts,
          children: [
            {
              path: "",
              name: "mypost",
              component: MyPost
            },
            {
              path: "mycollection",
              name: "mycollection",
              component: MyCollection
            }
          ]
        },
        {
          path: "others",
          name: "others",
          component: Others
        }
      ]
    },
    {
      path: "/404",
      name: "404",
      component: NoFound
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (token && userInfo.name) {
    const payload = jwt.decode(token);

    if (moment().isBefore(moment(payload.exp * 1000))) {
      store.commit("setToken", token);
      store.commit("setUserInfo", userInfo);
      store.commit("setIsLogin", true);
    } else {
      localStorage.clear();
    }
  }

  // 判断目标路由是否需要鉴权
  if (to.matched.some(record => record.meta.requirsAuth)) {
    if (store.state.isLogin) {
      next();
    } else {
      next("/login");
    }
  } else {
    // 公共页面，不需要用户登录
    next();
  }
});

export default router;
