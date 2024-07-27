import { db, dbconnect } from "../utils/surreal";

export default defineNitroPlugin(async (nitroApp) => {
  console.log("🚀 initialize");

  // const result = await $fetch(
  //   "https://resources.ninghao.net/nid-camp/startups.json"
  // );
  // useStorage().setItem("startups", result as any);

  /**
   * 连接数据库
   */
  await dbconnect();

  // 测试数据库客户端
  const list = await db.select("startup");
  // console.log(list);
});
