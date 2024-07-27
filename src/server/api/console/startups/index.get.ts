import { list } from "~/schema/startup";
// import { executeQuery } from "~/server/utils/surreal";
// import { parseQuery } from "~/server/utils/app/parse";
export default defineEventHandler(async (event) => {
  /**
   * 列表
   */
  //   const result = await useStorage().getItem("startups");

  // const queryParams = getQuery(event);
  // console.log(parseQuery(event));

  const { limit, start } = getPagination(event);
  const { orderBy } = getSort(event);
  const { where } = getFilter(event);
  console.log(where, "", "where");
  // 查询声明

  const statement = /* surql */ `
  SELECT * FROM startup 
    ${where} ${orderBy} LIMIT $limit start $start;
`;

  const statementParams = {
    limit: limit,
    start: start,
    where: where,
  };
  console.log(statementParams, "statementParams");
  const result = executeQuery(statement, statementParams, list);
  await setXTotalCountHeader(event, "startup", where);
  return result;
});
