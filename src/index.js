const db = require('./models');

  (async ()=> {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await db.sequelize.sync();
        await db.userModel.create({
            id: 2,
            firstName: 'Jhony',
            lastName: 'Rivero',
            role: 'admin',
            email: 'jon@test'
        });

        await db.sequelize.close();
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  })();