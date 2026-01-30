function errorHandler(error, req, res, next) {
  console.log(error.name, error.message)

  if (error.name === 'CastError')
    return res.status(400).send({ error: 'Malformatted ID' })
  else if (error.name === 'ValidationError')
    return res.status(400).send({ error: error.message })

  next(error)
}

module.exports = errorHandler
