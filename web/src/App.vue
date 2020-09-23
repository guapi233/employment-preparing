<template>
  <div class="app">
    <form class="layui-form layui-form-pane" action>
      <div class="layui-form-item">
        <label class="layui-form-label">账号</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify="required"
            placeholder="请输入您的账号"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">密码</label>
        <div class="layui-input-inline">
          <input
            type="password"
            name="password"
            required
            lay-verify="required"
            placeholder="请输入您的密码"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">验证码</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify="required"
            placeholder="请输入验证码"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>
      <div class="layui-form-item">
        <div class="layui-input-block">
          <button class="layui-btn" lay-submit lay-filter="formDemo">点击登录</button>
          <a href="javascript:;" class="forget-password-btn">忘记密码？</a>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.app {
  background-color: #f2f2f2;
}

input {
  width: 190px;
}

.forget-password-btn {
  margin-left: 10px;

  &:hover {
    color: #009688;
  }
}
</style>