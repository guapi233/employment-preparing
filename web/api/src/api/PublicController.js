import svgCaptcha from "svg-captcha";
import { getValue, setValue } from "../config/RedisConfig";
import qs from "qs";
import Post from "@/model/Post";

class PublicController {
  constructor() {}
  async getCaptcha(ctx) {
    const body = ctx.request.query;
    const newCaptca = svgCaptcha.create({
      size: 4,
      ignoreChars: "0o1il",
      color: true,
      noise: Math.floor(Math.random() * 5),
      width: 150,
      height: 38
    });
    // 保存图片验证码数据，设置超时时间，单位: s
    // 设置图片验证码超时10分钟
    setValue(body.sid, newCaptca.text, 10 * 60);
    ctx.body = {
      code: 200,
      data: newCaptca.data
    };
  }

  async getList(ctx) {
    // 获取文章列表
    const body = qs.parse(ctx.query);

    const sort = body.sort ? body.sort : "created";
    const page = body.page ? parseInt(body.page) : 0;
    const limit = body.limit ? parseInt(body.limit) : 20;
    const options = {};

    if (body.title) {
      options.title = { $regex: body.title };
    }
    if (body.catalog && body.catalog.length > 0) {
      options.catalog = { $in: body.catalog };
    }
    if (body.isTop) {
      options.isTop = body.isTop;
    }
    if (body.isEnd) {
      options.isEnd = body.isEnd;
    }
    if (body.status) {
      options.status = body.status;
    }
    if (typeof body.tag !== "undefined" && body.tag !== "") {
      options.tags = { $elemMatch: { name: body.tag } };
    }
    const result = await Post.getList(options, sort, page, limit);
    const total = await Post.countList(options);

    ctx.body = {
      code: 200,
      data: result,
      msg: "获取文章列表成功",
      total: total
    };
  }
}

export default new PublicController();
