import { signinInput } from "~/schema/reception";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, signinInput.parseAsync);
  const token = signToken(body.user);
  return {
    id: body.user.id,
    name: body.user.name,
    token: token,
  };
});
