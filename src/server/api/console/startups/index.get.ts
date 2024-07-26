import { list } from "~/schema/startup";
// import { parseQuery } from "~/server/utils/app/parse";
export default defineEventHandler(async (event) => {
  /**
   * 列表
   */
  //   const result = await useStorage().getItem("startups");

  const queryParams = getQuery(event);
  console.log(parseQuery(event));

  // 查询声明

  const statement = /* surql */ `
  SELECT * FROM startup 
      ORDER BY created LIMIT $limit;
`;

  const statementParams = {
    limit: 10,
  };

  try {
    const [result] = await db.query(statement, statementParams);
    return list.parse(result);
  } catch (error: any) {
    console.log(error);
  }
});
