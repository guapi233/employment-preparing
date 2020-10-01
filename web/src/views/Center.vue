<template>
  <div class="layui-container fly-marginTop fly-user-main">
    <ul class="layui-nav layui-nav-tree" lay-filter="test">
      <!-- 侧边导航: <ul class="layui-nav layui-nav-tree layui-nav-side"> -->
      <li
        class="layui-nav-item textcenter"
        v-for="item in lists"
        :key="item.name"
      >
        <a href="">{{ item.name }}</a>
      </li>
    </ul>
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
        },
        {
          name: "基本设置",
        },
        {
          name: "我的帖子",
        },
        {
          name: "我的消息",
        },
        {
          name: "其他设置",
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