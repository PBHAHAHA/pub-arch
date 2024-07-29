import jwt, { type Algorithm } from "jsonwebtoken";
import { type H3Event } from "h3";
import { token, type Token } from "~/schema/jwt";
/**
 * 配置
 */
const config = useRuntimeConfig();

/**
 * 公钥
 */
export const jwtPublicKey = Buffer.from(
  config.jwt.publicKey,
  "base64"
).toString();

/**
 * 私钥
 */
export const jwtPrivateKey = Buffer.from(
  config.jwt.privateKey,
  "base64"
).toString();

// 签发令牌
export const signToken = (user: { id: string; name: string }) => {
  //   准备数据
  const data: Partial<Token> = {
    ID: user.id,
    name: user.name,
  };

  //   令牌主体
  const payload = token.parse(data);

  const result = jwt.sign(payload, jwtPrivateKey, {
    algorithm: config.jwt.algorithm as Algorithm, // 令牌的算法
    expiresIn: config.jwt.expiresIn, // 令牌的有效期
  });

  return result;
};

// 从header中取出令牌
export const getToken = (event: H3Event) => {
  const authHeader = getRequestHeader(event, "Authorization");
  console.log(authHeader, "authHeader");
  return authHeader ? authHeader.replace("Bearer", "").trim() : null;
};

// 验证令牌
export const verifyToken = (data: string) => {
  try {
    const result = jwt.verify(data, jwtPublicKey, {
      algorithms: [config.jwt.algorithm as Algorithm],
    });
    console.log(`jwt.ts-verifyToken-`, result);
    return token.parse(result);
  } catch (error) {
    console.log(" error-- verifyToken", error);
  }
};
