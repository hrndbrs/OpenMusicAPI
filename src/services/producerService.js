const { connect } = require('amqplib')

module.exports = class ProducerService {
  async sendMessage (queue, message) {
    const connection = await connect(process.env.RABBITMQ_SERVER)
    const channel = await connection.createChannel()
    await channel.assertQueue(queue, {
      durable: true
    })

    channel.sendToQueue(queue, Buffer.from(message))

    setTimeout(() => {
      connection.close()
    }, 1000)
  }
}
