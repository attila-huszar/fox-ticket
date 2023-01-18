import db from '../src/db';

global.beforeEach(async () => {
  jest.clearAllMocks();
  await db.sync({ force: true }); // Clear the database
});
