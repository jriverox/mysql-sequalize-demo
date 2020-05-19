const AWS = require('aws-sdk')

module.exports = class QueueManager {
  constructor(queueUrl, region) {
    AWS.config.update({ region: region })
    this.sqs = new AWS.SQS({ apiVersion: '2012-11-05' })
    this.queueUrl = queueUrl;
  }

  send(document) {
    const params = {
      MessageBody: JSON.stringify(document),
      QueueUrl: this.queueUrl,
    }

    this.sqs
      .sendMessage(params)
      .promise()
      .then(result => {
        return result.MessageId
      })
      .catch(err => {
        throw err
      })
  }
  async sendAsync(document) {
    const params = {
      MessageBody: JSON.stringify(document),
      QueueUrl: this.queueUrl,
    }

    const response = await this.sqs.sendMessage(params).promise();
    return response.MessageId;
  }

  sendBatch(message) {
    return new Promise((resolve, reject) => {
      const messages = message.map((task, i) => {
        return {
          Id: `task-${i}`,
          MessageBody: JSON.stringify(task),
        }
      })
      const params = {
        Entries: messages,
        QueueUrl: this.queueUrl,
      }
      this.sqs.sendMessageBatch(params, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
}
