import { z } from "zod";
import { item, type Item } from "~/schema/user";
// import type { Item as Role, RoleName } from "~/schema/role";

/**
 * 获取用户
 */
export async function readUser<T extends z.ZodTypeAny>(
  data: Record<string, any>,
  connector: "AND" | "OR",
  schema: T
): Promise<z.infer<T>>;

export async function readUser(
  data: Record<string, any>,
  connector?: "AND" | "OR"
): Promise<Item>;

export async function readUser(
  data: Record<string, any>,
  connector: "AND" | "OR" = "AND",
  schema: z.ZodTypeAny = item
) {
  // 声明参数
  const statementParams: Record<string, any> = {};
  //   console.log(statementParams, "ddd");
  // 查询条件
  const conditions = Object.entries(data)
    .map(([key, value]) => {
      statementParams[key] = value;
      return `${key} = $${key}`;
    })
    .join(` ${connector} `);

  // 查询声明
  const statement = /* surql */ `
    SELECT * FROM user WHERE ${conditions};
  `;

  // 执行查询
  //   console.log(statement, statementParams, "ddd");
  const [result] = await db.query<Item[][]>(statement, statementParams);
  //   console.log(result, "xxx");

  // 返回结果
  return result && result.length ? schema.parse(result[0]) : null;
}

/**
 * 用户角色
 */
// export const hasRole = (user: Item, roleName: RoleName) => {
//   let result;

//   if (!user || !user.roles || !user.roles.length) return;

//   if (typeof user.roles[0] === 'string') {
//     result = user.roles.some((item) => item === `role:${roleName}`);
//   }

//   if (typeof user.roles[0] === 'object') {
//     result = (user.roles as Array<Role>).some((item) => item.name === roleName);
//   }

//   return result;
// };

// export const isRole = (roleName: RoleName) => (user: Item) => {
//   return hasRole(user, roleName);
// };

// export const isAdministrator = isRole("administrator");
// export const isEditor = isRole("editor");
// export const isStandard = isRole("standard");
