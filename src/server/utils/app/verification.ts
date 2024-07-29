/**
 * 是否允许发送验证码
 */
export const isAllowVerify = async (identifier: string) => {
  console.log(identifier, "identifier");
  const statement = /* surql */ `
      array::len(
        SELECT created FROM verification 
          WHERE identifier = $identifier AND time::now() - created < 60s
          ORDER BY created DESC LIMIT 1
      );
    `;

  const statementParams = { identifier };

  const [result] = await db.query<number[]>(statement, statementParams);
  //   console.log(result, "KKK");

  return result ? false : true;
};

/**
 * 检查验证码是否有效
 */
export const compareVerification = async (
  identifier: string,
  verification: string
) => {
  const statement = /* surql */ `
      array::len(
        SELECT * FROM verification
          WHERE 
            identifier = $identifier 
            AND code = $verification
            AND time::now() - created < 5m
          ORDER BY created DESC LIMIT 1
      );
  `;

  const statementParams = { identifier, verification };

  const [result] = await db.query<number[]>(statement, statementParams);

  return result ? true : false;
};
