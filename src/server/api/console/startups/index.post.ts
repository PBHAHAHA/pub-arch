import { create } from "~/schema/startup";

/**
 * 创建
 */
export default defineEventHandler(async (event) => {
  const body = readValidatedBody(event, create.parse);
  return body;
});
