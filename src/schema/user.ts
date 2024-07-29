import { z } from "zod";
import { record } from "./common";

/**
 * 属性
 */

// 标识
const id = record("user");

// 名称
const name = z.string();

// 密码
const password = z.string().optional();

// 邮箱
const email = z.string().email().optional();

// 手机
const mobile = z.string().max(11).optional();
/**
 * 项目
 */
export const item = z.object({
  id,
  name,
  password,
  email,
  mobile,
});

export type Item = z.infer<typeof item>;
/**
 * 列表
 */
export const list = z.array(item);
export type List = z.infer<typeof list>;

// 数据记录
export const row = z.object({
  id,
  name,
  password,
  email,
  mobile,
});
