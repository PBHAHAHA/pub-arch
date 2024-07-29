import { z } from "zod";

const name = z
  .string({ required_error: "请提供用户名" })
  .min(1, { message: "请提供用户名" })
  .max(36, { message: "用户名长度不能超过 36 个字符" })
  .trim();

const password = z
  .string({ required_error: "请提供密码" })
  .min(6, { message: "密码长度至少是6位" })
  .max(36, { message: "密码长度不能超过 36 个字符" })
  .trim();

// 用户标识
const identifier = z
  .string({ required_error: "请提供用户标识" })
  .min(1, { message: "请提供用户标识" })
  .max(36, { message: "用户标识长度不能超过 36 位" })
  .trim();

// 验证码
const verification = z
  .string()
  .length(4, { message: "验证码为4位数字" })
  .optional();
/**
 * 注册
 */
export const signupInput = z.object(
  {
    name: name.refine(
      async (value) => {
        console.log(value, "用户吗");
        const user = await readUser({ name: value });
        console.log(user, "---");
        return !user;
      },
      { message: "用户名已存在" }
    ),
    password: password.transform((value) => createHash(value)),
  },
  { required_error: "请提供注册数据" }
);

/**
 * 登录
 */
export const signinInput = z
  .object({
    identifier,
    password: password.optional(),
    verification,
  })
  .transform(async ({ identifier, password, verification }) => {
    const user = await readUser(
      { name: identifier, email: identifier, mobile: identifier },
      "OR"
    );

    return { identifier, password, user, verification };
  })
  .superRefine(
    async ({ user, password, verification, identifier }, context) => {
      // 用户是否存在
      if (!user) {
        return context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "用户不存在",
        });
      }

      if (password) {
        // 密码是否匹配
        const isPasswordMatched = await compareHash(user.password!, password);
        console.log("signinInput.transform");

        if (!isPasswordMatched) {
          return context.addIssue({
            code: z.ZodIssueCode.custom,
            message: "密码不匹配",
          });
        }
      }

      if (verification) {
        const isVerificationValid = await compareVerification(
          identifier,
          verification
        );

        if (!isVerificationValid) {
          return context.addIssue({
            code: z.ZodIssueCode.custom,
            message: "验证码无效或不匹配",
          });
        }
      }

      if (!password && !verification) {
        return context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "请提供登录验证码或密码",
        });
      }
    }
  );

/**
 * 验证码
 */
export const verificationInput = z
  .object({
    identifier,
  })
  .transform(async ({ identifier }, context) => {
    const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobile = /^[0-9]{11}$/;
    const isEmail = email.test(identifier);
    const isMobile = mobile.test(identifier);
    const isValidIdentifier = isEmail || isMobile;

    if (isValidIdentifier) {
      const user = await readUser(
        { email: identifier, mobile: identifier },
        "OR"
      );
      const canVerify = await isAllowVerify(identifier);

      return {
        isEmail,
        isMobile,
        isValidIdentifier,
        identifier,
        user,
        canVerify,
      };
    }

    return {
      isEmail,
      isMobile,
      isValidIdentifier,
      identifier,
    };
  })
  .superRefine(async ({ user, isValidIdentifier, canVerify }, context) => {
    if (!isValidIdentifier) {
      return context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "请提供有效的用户标识",
      });
    }
    if (!canVerify) {
      return context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "请稍后再次发送验证码",
      });
    }
    if (!user) {
      return context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "用户不存在",
      });
    }
  });
