const mongoose = require("mongoose");

// 连接Mongdb
mongoose.connect("mongodb://localhost:27017/testdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 创建数据模型
const User = mongoose.model("user", {
  name: String,
  age: Number,
  email: String,
});

// 传入数据生产实例
const imooc = new User({
  name: "cyj",
  age: 19,
  email: "1290148953@qq.com",
});

// 保存至数据库
imooc.save().then(() => {
  console.log("ok");
});
