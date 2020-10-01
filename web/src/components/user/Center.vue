<template>
  <div class="panel main pd20">
    <div class="msg">Hi，Mob，您即使我们的正式会员！</div>
    <div class="layui-row layui-col-space20">
      <div class="layui-col-md6">
        <div class="panel border">
          <div class="title">我的会员信息</div>
          <div class="content">
            <p>您的积分有：60</p>
            <p>您当前为：非Vip</p>
          </div>
        </div>
      </div>
      <div class="layui-col-md6">
        <Sign class="border" />
      </div>
      <div class="layui-col-md12 mt20">
        <div class="pannel border">
          <div class="title">快捷方式</div>
          <ul class="content">
            <div class="layui-row layui-col-space10">
              <li class="layui-col-sm3 layui-col-xs4">
                <a href="">
                  <div class="shortcut">😂</div>
                  <span>修改密码</span>
                </a>
              </li>
              <li class="layui-col-sm3 layui-col-xs4">
                <a href="">
                  <div class="shortcut">😂</div>
                  <span>修改密码</span>
                </a>
              </li>
              <li class="layui-col-sm3 layui-col-xs4">
                <a href="">
                  <div class="shortcut">😂</div>
                  <span>修改密码</span>
                </a>
              </li>
              <li class="layui-col-sm3 layui-col-xs4">
                <a href="">
                  <div class="shortcut">😂</div>
                  <span>修改密码</span>
                </a>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sign from "@/components/sidebar/Sign.vue";
export default {
  name: "user-center",
  components: { Sign },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .panel.main {
    margin: 0 !important;
  }
}

.panel {
  color: #333;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 1px 2ox 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s;

  &.main {
    margin: 0 0 10px 225px;
  }
}

.mt20 {
  margin-top: -20px;
}

.shortcut {
  background-color: #2f9688;
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  border-radius: 2px;
  font-size: 30px;
}

.msg {
  background: #f8f8f8;
  color: #666;
  padding: 10px 15px;
  margin-bottom: 20px;
}

.border {
  border: 1px solid #e6e6e6;
}

.pd20 {
  padding: 20px;
}

.title {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #e9e9e9;
  font-size: 14px;
  padding: 0 15px;
  color: #333;
}

li {
  text-align: center;
  padding: 5px;
}

.content {
  padding: 18px 15px;
  line-height: 26px;
  font-size: 14px;
  color: #666;
}
</style>