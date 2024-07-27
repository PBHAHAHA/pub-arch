import { z } from "zod";
/**
 * 属性
 */
const id = z.union([z.string(), z.number()]).transform((value) => `${value}`);
const name = z.string();
const avatar = z.string();
const oneline = z.string();
const description = z.string();
const industry = z.string();
const teamSize = z.number().nullable();
const isTopValuation = z.boolean();
const isTopRevenue = z.boolean();
const tags = z.array(z.any());

/**
 * 项目
 */
export const item = z.object({
  id,
  name,
  avatar,
  oneline,
  description,
  industry,
  teamSize,
  isTopValuation,
  isTopRevenue,
  tags,
});
/**
 * 列表
 */
export const list = z.array(item);
export type List = z.infer<typeof list>;

/**
 * 创建
 */
export const create = z.object({
  name,
  oneline,
  teamSize: teamSize.optional(),
});
