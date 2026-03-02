const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../utils/config')

function userExtractor(req, res, next) {
  const user = jwt.verify(req.token, JWT_SECRET)

  if (user) {
    req.user = user
  }
  next()
}

module.exports = userExtractor
