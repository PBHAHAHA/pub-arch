import qs from "qs";
import { z, ZodSchema } from "zod";
import type { H3Event } from "h3";

export const parseQuery = <ZodSchema extends z.ZodTypeAny>(
  event: H3Event,
  schema?: ZodSchema
) => {
  const data = qs.parse(getQuery(event));
  try {
    return schema ? schema.parse(data) : data;
  } catch (error) {
    throw createError({
      statusCode: 422,
      message: "查询参数数据解析失败",
      data: error,
    });
  }
};
