const transporter = require('./config/nodemailer')

module.exports = class MailSender {
  #transporter = transporter

  sendEmail (targetEmail, content) {
    const message = {
      from: 'OpenMusic',
      to: targetEmail,
      subject: 'Export Playlist',
      text: 'See attachment for the playlist',
      attachments: [
        {
          filename: 'playlist.json',
          content
        }
      ]
    }

    return this.#transporter.sendMail(message)
  }
}
