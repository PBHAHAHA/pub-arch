import { verificationInput } from "~/schema/reception";

export default defineEventHandler(async (event) => {
  // 准备数据
  const body = await readValidatedBody(event, verificationInput.parseAsync);
  const { isEmail, isMobile, identifier, user } = body;

  // 生成四位随机数字
  const [code] = await db.query(`rand::int(1000,9999)`);

  // 发送邮件验证码
  if (isEmail) {
    console.log(`🍁 验证码 (${String(code)}) 已发送到邮件 ${identifier}`);
  }

  // 发送邮件验证码
  if (isMobile) {
    console.log(`🍁 验证码 (${String(code)}) 已发送到手机 ${identifier}`);
  }

  // 存储验证码
  await db.create("verification", {
    user: user!.id,
    code: `${String(code)}`,    
    identifier,
    type: isEmail ? "email" : "mobile",
  });

  // 作出响应
  return {
    message: `🍁 验证码已发送到 ${identifier}`,
  };
});
