import { Surreal } from "surrealdb.js";
import type { H3Event } from "h3";
import { z, ZodSchema } from "zod";
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

export const executeQuery = async <ZodSchema extends z.ZodTypeAny>(
  statement: string,
  statementParams?: Record<string, any>,
  schema?: ZodSchema
): Promise<z.infer<ZodSchema>> => {
  try {
    const [result] = await db.query(statement, statementParams);
    return schema ? schema.parse(result) : result;
  } catch (error: any) {
    if (error.name == "Error") {
      console.log("🐞数据查询失败:", error.message);
      throw createError({
        statusCode: 500,
        message: "数据查询失败",
      });
    }

    if (error.name == "ZodError") {
      console.log("❗️数据解析失败:", JSON.parse(error.message)[0]);
      throw createError({
        statusCode: 500,
        message: "数据解析失败",
      });
    }
  }
};

// 统计查询结果
export const countQueryResult = async (table: string, where: string) => {
  const statement = `
  SELECT count() FROM ${table} ${where} GROUP ALL
  `;

  // 执行查询
  const [result] = await executeQuery(statement);

  return result && result.count ? (result.count as number) : null;
};

/**
 * 设置 X-Total-Count 头部
 */
export const setXTotalCountHeader = async (
  event: H3Event,
  table: string,
  where: string
) => {
  const count = await countQueryResult(table, where);
  console.log("设置头信息", count);
  console.log(count);
  if (count) {
    setHeaders(event, {
      "x-total-count": count,
    });
  }
};
