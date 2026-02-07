function errorHandler(error, req, res, next) {
  console.error(error.message)

  if (error.name === 'ValidationError')
    return res.status(400).json({ error: error.message })

  if (error.name === 'JsonWebTokenError')
    return res.status(401).json({ error: 'Please provide a valid token' })

  next(error)
}

module.exports = errorHandler
