function errorHandler(error, req, res, next) {
  console.log(error.name, error.message);

  if (error.name === 'CastError')
    return res.status(400).send({ error: 'Malformatted ID' });

  next(error);
}

module.exports = errorHandler;
