const app = require('./app')
const { PORT } = require('./utils/config')
const { logInfo, logError } = require('./utils/logger')

app.listen(PORT, (error) => {
  if (error) logError(error)
  logInfo('server is running on port ' + PORT)
})
