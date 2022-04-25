const headers = require('../headers')

const optionPosts = res => {
  res.writeHead(200, headers)
  res.end()
}

module.exports = optionPosts
