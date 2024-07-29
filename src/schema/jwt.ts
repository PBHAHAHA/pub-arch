import { z } from "zod";

const config = useRuntimeConfig();
/**
 * 令牌
 */
export const token = z.object({
  NS: z.string().default(config.surreal.namespace), // 命名空间
  DB: z.string().default(config.surreal.database), // 数据库
  SC: z.string().default(config.surreal.scope), // 作用域
  TK: z.string().default(config.surreal.tokenName), // 令牌名称
  ID: z.string(), // 用户 ID
  name: z.string(), // 用户名
  iss: z.string().default(config.public.appName), // 令牌签发者
  iat: z.number().optional(), // 令牌签发时间
  exp: z.number().optional(), // 令牌过期时间
});

export type Token = z.infer<typeof token>;
