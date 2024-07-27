import {
  filterOperator,
  filterParam,
  paginationParam,
  sortParam,
} from "~/schema/app/param";
import type { H3Event } from "h3";
import { forEach, isArray, isString } from "lodash-es";

// 分页
export const getPagination = (event: H3Event) => {
  // console.log(paginationParam, "xxxx");
  const {
    pagination: { page, pageSize },
  } = parseQuery(event, paginationParam);
  console.log(page, pageSize);
  const start = page === 1 ? 0 : (page - 1) * pageSize;
  return { page, pageSize, start, limit: pageSize };
};

// 排序
export const getSort = (event: H3Event) => {
  const { sort } = parseQuery(event, sortParam);
  if (!sort) {
    return { orderBy: "", sort };
  }

  let value;
  if (Array.isArray(sort)) {
    value = sort.map((item) => Object.values(item).join(" ")).join(", ");
  } else {
    value = Object.values(sort).join(" ");
  }

  return {
    orderBy: `ORDER BY ${value}`,
    sort,
  };
};

// 判断是否为正确的操作符
const isOperator = (value: string) => {
  const { success } = filterOperator.safeParse(value);
  return success;
};
// isOr
const isOr = (value: string) => {
  return value === "$or";
};
const connectWithOr = (data: Array<any>) => {
  const items: Array<string> = [];
  data.forEach((item) => {
    const [[k1, v1]] = Object.entries(item);
    const [[k2, v2]] = Object.entries(v1 as any);
    if (isOperator(k2)) {
      items.push(`${k1} ${k2} ${v2}`);
    }
  });

  const conditions =
    items.length > 1 ? `${items.join(" OR ")}` : items.join("");
  return conditions;
};
// 获取过滤器
export const getFilter = (event: H3Event) => {
  const { filter } = parseQuery(event, filterParam);
  if (!filter) {
    return {
      where: "",
      conditions: "",
    };
  }

  const items: Array<string> = [];
  console.log(filter);
  forEach(filter, (v1, k1) => {
    if (isOr(k1) && isArray(v1)) {
      const item = connectWithOr(v1);
      return items.push(item);
    }

    forEach(v1, (v2, k2) => {
      if (!isOperator(k1) && isOperator(k2) && isString(v2)) {
        items.push(`${k1} ${k2} ${v2}`);
      }
      if (!isOperator(k1) && isOperator(k2) && isArray(v2)) {
        const item = `${k1} ${k2} [${v2.join(", ")}]`;
        items.push(item);
      }
    });
  });
  const conditions = items.length ? items.join(" AND ") : "";
  console.log(conditions);
  return {
    where: conditions ? `WHERE ${conditions}` : "",
    conditions,
    filter,
  };
};
