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
    const batchSize = 20;
    const totalPages = totalRows > batchSize ? Math.ceil(totalRows / batchSize) : 1;
    const queue = new QueueManager(env.SQS.URL, env.SQS.REGION);
    let sqsMessages = [];
    let sqsBatchCount = 0

    for (let page = 0; page < totalPages; page++) {
      const offset = page * batchSize;
      // obtener la data de forma paginada
      const users = await db.users.findAll({
        include: [
          { model: db.addresses, as: 'addresses' }
        ],
        raw: false,
        order: ['id'],
        limit: batchSize,
        offset: offset,
      });

      //console.log(JSON.stringify(users, null, 2))

      // enviar a la cola de sqs
      const message = {
        header: `header-${page}`,
        data: users
      };

      // enviar a la cola de a 1 en 1
      //const sqsRespose = await queue.sendAsync(message);
      //console.log(sqsRespose);

      sqsMessages.push(message);
      sqsBatchCount += 1;
      if (sqsBatchCount === 10 || page === totalPages - 1) {
        await queue.sendBatch(sqsMessages)
        sqsMessages = [];
        sqsBatchCount = 0;
      }
    }

    await db.sequelize.close();
    const execTime = performance.now() - start;
    console.log(`Tiempo total: ${execTime}`);
  } catch (error) {
    console.error('Error:', error);
  }
})();