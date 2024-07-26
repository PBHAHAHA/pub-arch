export default defineEventHandler(async (event) => {
  return getRouterParams(event);
});
