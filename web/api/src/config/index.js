const DB_URL = "mongodb://localhost:27017/testdb";
const REDIS = {
  host: "localhost",
  port: 6379
};
const JWT_SECRET =
  "a&*38QthAKuiRwISGLotgq^3%^$zvA3A6Hfr8MF$jM*HY4*dWcwAW&9NGp7*b53!";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "http://front.dev.toimc.com:22500"
    : "http://localhost:8080";

export default {
  DB_URL,
  REDIS,
  JWT_SECRET
};
