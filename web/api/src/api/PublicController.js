const svgCaptcha = require("svg-captcha");

class PublicController {
  constructor() {}
  async getCaptcha(ctx) {
    const newCaptcha = svgCaptcha.create({
      color: true,
      noise: Math.floor(Math.random() * 5),
      ignoreChars: "0o1il",
      width: 150,
      height: 50,
    });

    ctx.body = {
      msg: newCaptcha.data,
    };
  }
}

export default new PublicController();
