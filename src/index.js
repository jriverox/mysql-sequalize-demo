const db = require('./models');
const data = require('../data/data.json');

  (async ()=> {
    try {
      const totalRows = await db.users.count();
      const limit = 20;
      const pages = totalRows / limit;

      for (let page = 0; page < pages; page++) {
        const offset = page * limit;
        const users = await db.users.findAndCountAll({
          order: ['id'],
          limit: limit,
          offset: offset,
        });
        //console.log(`page: ${page} id: ${users[0].id}`);
        console.log(users);
      }

      await db.sequelize.close();
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();