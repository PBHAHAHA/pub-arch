export default defineEventHandler(async (event) => {
  if (!isServerApi(event)) return;
  event.context.user = {
    name: "pubing",
  };
  console.log("🍭 user middleware");
});
