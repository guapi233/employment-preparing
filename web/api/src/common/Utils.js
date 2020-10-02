import jwt from "jsonwebtoken";
import config from "../config/index";
import { getValue } from "../config/RedisConfig";

const checkCode = async (key, value) => {
  const redisData = await getValue(key);
  if (redisData != null) {
    if (redisData.toLowerCase() === value.toLowerCase()) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const getJWTPayload = token => {
  return jwt.verify(token.split(" ")[1], config.JWT_SECRET);
};

export { checkCode, getJWTPayload };
