import svgCaptcha from "svg-captcha";
import { getValue, setValue } from "../config/RedisConfig";

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

  getList(ctx) {
    ctx.body = {
      code: 200,
      data: [
        {
          uid: {
            name: "imooc",
            isVip: 1
          },
          title: "詹博A",
          content: "",
          created: "2019-10-01 01:00:00",
          catalog: "ask",
          fav: 40,
          isEnd: 0,
          reads: 10,
          answer: 0,
          status: 0,
          isTop: 1,
          tags: [
            {
              name: "精华",
              class: "layui-bg-red"
            },
            {
              name: "热门",
              class: "layui-bg-blue"
            }
          ]
        },
        {
          uid: {
            name: "imooc",
            isVip: 1
          },
          title: "吃口饭！",
          content: "",
          created: "2019-10-01 01:00:00",
          catalog: "ask",
          fav: 40,
          isEnd: 0,
          reads: 10,
          answer: 598,
          status: 0,
          isTop: 0,
          tags: [
            {
              name: "精华",
              class: "layui-bg-red"
            },
            {
              name: "热门",
              class: "layui-bg-blue"
            }
          ]
        },
        {
          uid: {
            name: "imooc",
            isVip: 1
          },
          title: "芜湖！起飞！",
          content: "",
          created: "2019-10-01 01:00:00",
          catalog: "ask",
          fav: 70,
          isEnd: 0,
          reads: 10,
          answer: 88,
          status: 0,
          isTop: 0,
          tags: [
            {
              name: "精华",
              class: "layui-bg-red"
            },
            {
              name: "热门",
              class: "layui-bg-blue"
            }
          ]
        }
      ]
    };
  }
}

export default new PublicController();
