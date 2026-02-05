function errorHandler(error, req, res, next) {
  console.log(error.message)
}

module.exports = errorHandler
