import Post from "../model/Post";
// import Links from "../model/Links";
import fs from "fs";
import uuid from "uuid/v4";
import moment from "dayjs";
import config from "@/config";
// method1
// import { dirExists } from '@/common/Utils'
import mkdir from "make-dir";
import { checkCode, getJWTPayload } from "@/common/Utils";
import User from "@/model/User";
// import PostTags from "@/model/PostTags";
// import UserCollect from "../model/UserCollect";
// import qs from "qs";

class ContentController {
  // 上传图片
  async uploadImg(ctx) {
    const file = ctx.request.files.file;
    // 图片名称、图片格式、存储的位置，返回前台一可以读取的路径
    const ext = file.name.split(".").pop();
    const dir = `${config.uploadPath}/${moment().format("YYYYMMDD")}`;
    // 判断路径是否存在，不存在则创建
    await mkdir(dir);
    // 存储文件到指定的路径
    // 给文件一个唯一的名称
    const picname = uuid();
    const destPath = `${dir}/${picname}.${ext}`;
    const reader = fs.createReadStream(file.path);
    const upStream = fs.createWriteStream(destPath);
    const filePath = `/${moment().format("YYYYMMDD")}/${picname}.${ext}`;
    // method 1
    reader.pipe(upStream);

    // const stat = fs.statSync(file.path)
    // method 2
    // let totalLength = 0
    // reader.on('data', (chunk) => {
    //   totalLength += chunk.length
    //   if (upStream.write(chunk) === false) {
    //     reader.pause()
    //   }
    // })

    // upStream.on('drain', () => {
    //   reader.resume()
    // })

    // reader.on('end', () => {
    //   upStream.end()
    // })
    ctx.body = {
      code: 200,
      msg: "图片上传成功",
      data: filePath
    };
  }

  // 添加新贴
  async addPost(ctx) {
    const { body } = ctx.request;
    const sid = body.sid;
    const code = body.code;
    // 验证图片验证码的时效性、正确性
    const result = await checkCode(sid, code);
    if (result) {
      const obj = await getJWTPayload(ctx.header.authorization);
      // 判断用户的积分数是否 > fav，否则，提示用户积分不足发贴
      // 用户积分足够的时候，新建Post，减除用户对应的积分
      const user = await User.findByID({ _id: obj._id });
      if (user.favs < body.fav) {
        ctx.body = {
          code: 501,
          msg: "积分不足"
        };
        return;
      } else {
        await User.updateOne({ _id: obj._id }, { $inc: { favs: -body.fav } });
      }
      const newPost = new Post(body);
      newPost.uid = obj._id;
      const result = await newPost.save();
      ctx.body = {
        code: 200,
        msg: "成功的保存的文章",
        data: result
      };
    } else {
      // 图片验证码验证失败
      ctx.body = {
        code: 500,
        msg: "图片验证码验证失败"
      };
    }
  }
}

export default new ContentController();
