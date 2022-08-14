const seedUsers = require('./user-seeds');

const sequelize = require('../../../../../Downloads/14.5/config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  console.log('--------------');

  process.exit(0);
};

seedAll();
