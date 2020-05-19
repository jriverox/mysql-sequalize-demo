const db = require('./models');
const data = require('../data/data.json');

  (async ()=> {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await db.sequelize.sync();

        for (let index = 0; index < data.length; index++) {
          const user = data[index];
          await db.users.create(user, {include: [{ model: db.addresses, as: 'addresses' }]});
        }

        await db.sequelize.close();
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  })();