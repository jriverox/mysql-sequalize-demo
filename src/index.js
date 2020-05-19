const db = require('./models');
const data = require('../data/data.json');

  (async ()=> {
    try {
      const totalRows = await db.users.count();
      const limit = 20;
      const pages = totalRows / limit;

      for (let page = 0; page < pages; page++) {
        const offset = page * limit;
        const users = await db.users.findAll({
          include: [
            { model: db.addresses, as: 'addresses' }
          ],
          raw: false,
          order: ['id'],
          limit: limit,
          offset: offset,
        });
        console.log(`-------PAGE: ${page}-------`);
        console.log(JSON.stringify(users, null, 2))
        console.log('---------------------------')
      }

      await db.sequelize.close();
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();