require('dotenv').config()

const { connect } = require('amqplib')
const MailSender = require('./mailSender')
const Listener = require('./listener')
const PlaylistService = require('./services/playlistService')
const QUEUES = require('./lib/queues')

const mailSender = new MailSender()
const playlistService = new PlaylistService()
const listener = new Listener(playlistService, mailSender)

const init = async () => {
  const connection = await connect(process.env.RABBITMQ_SERVER)
  const channel = await connection.createChannel()

  await channel.assertQueue(QUEUES.EXPORT_PLAYLIST, {
    durable: true
  })

  channel.consume(QUEUES.EXPORT_PLAYLIST, listener.listen, { noAck: true })
}

init()
