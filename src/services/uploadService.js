const fs = require('fs')
const path = require('path')

module.exports = class UploadService {
  constructor () {
    this._folder = this.createFolder()
  }

  createFolder = () => {
    const directory = path.resolve(__dirname, '../upload/coverAlbums')
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true })
    }
    return directory
  }

  writeFile = (image) => {
    const filename = +new Date() + image.hapi.filename
    const path = `${this._folder}/${filename}`
    const fileStream = fs.createWriteStream(path)

    return new Promise((resolve, reject) => {
      fileStream.on('error', (err) => reject(err))
      image.pipe(fileStream)
      image.on('end', () => resolve(filename))
    })
  }
}
