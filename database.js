const fs = require('fs')

module.exports = {
  save(filename, data) {
    fs.writeFileSync(filename, JSON.stringify(data))
  },

  load(filename) {
    return new Promise((resolve, reject) => {
      fs.readFile(filename, 'utf8', (err, contents) => {
        if (err) return reject(err)

        resolve(JSON.parse(contents))
      })
    })
  }
}
