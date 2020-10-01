<template>
  <div class="layui-container fly-marginTop fly-user-main">
    <ul class="layui-nav layui-nav-tree" lay-filter="test">
      <!-- 侧边导航: <ul class="layui-nav layui-nav-tree layui-nav-side"> -->
      <li
        class="layui-nav-item textcenter"
        v-for="item in lists"
        :key="item.name"
      >
        <router-link :to="{ name: item.link }">{{ item.name }}</router-link>
      </li>
    </ul>
    <!-- 右侧内容 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "center",
  data() {
    return {
      lists: [
        {
          name: "我的主页",
          link: "home",
        },
        {
          name: "用户中心",
          link: "center",
        },
        {
          name: "基本设置",
          link: "set",
        },
        {
          name: "我的帖子",
          link: "posts",
        },
        {
          name: "我的消息",
          link: "msg",
        },
        {
          name: "其他设置",
          link: "others",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.textcenter {
  text-align: center;
}
</style>