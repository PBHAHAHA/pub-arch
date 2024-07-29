export default defineEventHandler(async (event) => {
  const result = db.query(`
        SELECT * FROM user WHERE name = 'pub'  
    `);
  return result;
});
