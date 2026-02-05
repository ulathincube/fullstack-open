const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./routes/blog')
const { MONGODB_URI } = require('./utils/config')
const { logInfo, logError } = require('./utils/logger')
const notFound = require('./errors/notFound')
const errorHandler = require('./errors/errorHandler')

const app = express()

mongoose
  .connect(MONGODB_URI, { family: 4 })
  .then(() => logInfo('connected to db'))
  .catch((error) => logError(error))

app.use(express.json())

app.use('/api/blogs', blogRouter)

app.use('/*splat', notFound)
app.use(errorHandler)

module.exports = app
