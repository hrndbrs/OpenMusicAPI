module.exports = class Listener {
  constructor(playlistService, mailSender) {
    this._playlistService = playlistService
    this._mailSender = mailSender
  }

  listen = async (message) => {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString())

      const playlist = await this._playlistService.getPlaylistById(playlistId)
      const info = await this._mailSender.sendEmail(targetEmail, JSON.stringify({ playlist }, null, 2))

      console.log('Message Id :', info.messageId)
    } catch (err) {
      console.error(err)
    }
  }
}
