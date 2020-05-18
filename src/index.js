const db = require('./models');

  (async ()=> {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await db.sequelize.sync();

        const user = {
          id: 2,
          firstName: 'Jhony',
          lastName: 'Rivero',
          role: 'admin',
          email: 'jon@test',
          Address: [
            {
              id: 1,
              street: 'somestreet',
              city: 'lima'
            }
          ]
        };

        await db.userModel.create(user, {include: [db.addressModel]});

        await db.sequelize.close();
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  })();