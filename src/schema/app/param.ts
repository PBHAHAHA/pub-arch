import { z } from "zod";

const config = useRuntimeConfig();

// 分页
export const paginationParam = z.object({
  pagination: z
    .object({
      page: z
        .union([z.number(), z.string()])
        .optional()
        .default(1)
        .transform((value) => Math.abs(parseInt(`${value}`, 10))),
      pageSize: z
        .union([z.number(), z.string()])
        .optional()
        .default(config.api.pageSize)
        .transform((value) => Math.abs(parseInt(`${value}`, 10)))
        .refine((value) => value <= 1000, {
          message: "每页的项目数量不能超过1000",
        }),
    })
    .default({
      page: 1,
      pageSize: config.api.pageSize,
    }),
});

// 排序
const SORT_ORDER = ["asc", "desc"] as const;
const SORT_RULE = ["collate", "numeric"] as const;

export const sortItem = z.object({
  field: z.string().min(1).max(60),
  order: z
    .enum(SORT_ORDER)
    .optional()
    .default("asc")
    .transform((value) => value.toUpperCase()),
  rule: z
    .enum(SORT_RULE)
    .optional()
    .transform((value) => value?.toUpperCase()),
});

export const sortParam = z.object({
  sort: z.union([z.array(sortItem), sortItem]).optional(),
});

// 过滤
const OPERATORS = [
  "=", // 是否相等
  "!=", // IS NOT 是否不相等
  "==", // 是否绝对相等
  "~", // 用模糊匹配检查两个值是否相等，示例："test text" ~ "Test"，"true" ~ true，
  "!~", // 用模糊匹配检查两个值是否不相等
  "<", // 小于
  "<=", // 小于等于
  ">", // 大于
  ">=", // 大于等于
  "∋", // CONTAINS，检查一个值是否包含包一个值，用于数组或字符串，示例："this is some text" CONTAINS "text";
  "∌", // CONTAINSNOT，不包含单个值，示例 [10, 20, 30] CONTAINSNOT 15，结果为 true
  "⊇", // CONTAINSALL，包含所有，示例：[10, 20, 30] CONTAINSALL [10, 20, 10]
  "⊃", // CONTAINSANY，包含任意，示例：[10, 20, 30] CONTAINSANY [10, 15, 25]
  "⊅", // CONTAINSNONE，不包含所有值，示例：[10, 20, 30] CONTAINSNONE [15, 25, 35]
  "∈", // INSIDE or ∈ or IN，示例：10 INSIDE [10, 20, 30]，"text" INSIDE "this is some text";
  "∉", // NOTINSIDE or ∉ or NOT IN，示例：15 NOTINSIDE [10, 20, 30]，"other" NOTINSIDE "this is some text"
  "⊆", // ALLINSIDE or ⊆，示例：[10, 20, 10] ALLINSIDE [10, 20, 30]
  "⊂", // ANYINSIDE or ⊂，示例：[10, 15, 25] ANYINSIDE [10, 20, 30]
  "⊄", // NONEINSIDE or ⊄，示例：[15, 25, 35] NONEINSIDE [10, 20, 30]
] as const;

export const filterOperator = z.enum(OPERATORS);

//   record 定义一个对象，参数是 （参数名，值）
export const filterItem = z.record(z.string(), z.any());

export const filterParam = z.object({
  filter: filterItem.optional(),
});
