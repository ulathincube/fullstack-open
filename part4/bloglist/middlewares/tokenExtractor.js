function tokenExtractor(req, res, next) {
  const token = req.get('authorization')

  if (token && token.startsWith('Bearer')) {
    const authToken = token.replace('Bearer ', '')
    req.token = authToken
  }
  next()
}

module.exports = tokenExtractor
