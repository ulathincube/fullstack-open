const User = require('../models/user')
const Blog = require('../models/blog')

async function resetDatabase(req, res, next) {
  try {
    await User.deleteMany({})
    await Blog.deleteMany({})
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  resetDatabase,
}
