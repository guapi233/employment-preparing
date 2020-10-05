// import Post from "../model/Post";
// import Links from "../model/Links";
import fs from "fs";
import uuid from "uuid/v4";
import moment from "dayjs";
import config from "@/config";
// method1
// import { dirExists } from '@/common/Utils'
import mkdir from "make-dir";
// import { checkCode, getJWTPayload } from "@/common/Utils";
// import User from "@/model/User";
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
}

export default new ContentController();
