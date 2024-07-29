import z from "zod";

// 数据记录 ID
export const record = <Table extends string = string>(table?: Table) => {
  return z.custom<`${Table}:${string}`>(
    (value) => {
      return typeof value === "string" && table
        ? value.startsWith(`${table}:`)
        : true;
    },
    {
      message: `必须是有效的 ${table ? table : "table"} 数据记录`,
    }
  );
};
