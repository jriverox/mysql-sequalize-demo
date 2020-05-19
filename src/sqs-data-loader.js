const yenv = require('yenv');
const { performance } = require('perf_hooks');
const db = require('./models');
const data = require('../data/data.json');
const QueueManager = require('./utils/queue-manager');

const env = yenv();

(async ()=> {
  try {
    const start = performance.now();
    const totalRows = await db.users.count();
    const limit = 20;
    const pages = totalRows / limit;
    const queue = new QueueManager(env.SQS.URL, env.SQS.REGION);

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

      //console.log(JSON.stringify(users, null, 2))
      const message = {
        header: `header-${page}`,
        data: users
      };
      const sqsRespose = await queue.sendAsync(message);
      console.log(sqsRespose);
    }

    await db.sequelize.close();
    const execTime = performance.now() - start;
    console.log(`Tiempo total: ${execTime}`);
  } catch (error) {
    console.error('Error:', error);
  }
})();