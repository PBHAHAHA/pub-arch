import { Surreal } from "surrealdb.js";

/**
 * 配置
 */
const config = useRuntimeConfig();

const {
  url,
  namespace,
  database,
  rootUser: username,
  rootPass: password,
} = config.surreal;

/**
 * SurrealDB 客户端
 */
export const db = new Surreal({
  onConnect() {
    console.log(`🌴 成功连接数据服务 ns: ${namespace}, db: ${database}`);
  },
});

/**
 * 连接 SurrealDB 数据服务
 */
export const dbconnect = async () => {
  console.log(username, password, "连接数据库--的信息");
  return db.connect(url, {
    // 设置连接命名空间与数据库
    namespace,
    database,

    // 设置连接身份
    auth: {
      namespace,
      database,
      username,
      password,
    },
  });
};
