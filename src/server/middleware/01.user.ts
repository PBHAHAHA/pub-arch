import { verifyToken } from "../utils/jwt";
import { item } from "~/schema/user";

export default defineEventHandler(async (event) => {
  if (!isServerApi(event)) return;
  const token = getToken(event);
  // console.log(token);
  if (!token) return;
  // 令牌主体
  let payload;
  event.context.token = {};
  try {
    console.log(payload, "payload----");
    payload = verifyToken(token);
    event.context.token.payload = payload;
  } catch (error) {
    event.context.token.error = error as any;
    console.log("01.user.ts: error" + error);
  }

  if (!payload) return;
  try {
    const user = await readUser(
      { name: payload.name },
      "AND",
      item.omit({ password: true })
    );
    event.context.user = user;
    console.log(`01.user.ts: `, user);
  } catch (error) {}
});
