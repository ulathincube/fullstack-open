const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { JWT_SECRET } = require('../utils/config')

async function login(req, res, next) {
  try {
    const { username, password } = req.body

    if (!(username || !password) || username.length < 3 || password.length < 3)
      return res
        .status(401)
        .json({ error: 'Please provide a valid username and password' })

    const user = await User.findOne({ username })

    if (!user) return res.status(404).json({ error: 'User does not exist!' })

    const match = await bcrypt.compare(password, user.password)

    if (!match)
      return res.status(401).json({ error: 'Invalid  username or password' })

    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      JWT_SECRET,
      { expiresIn: 60 * 60 * 2 },
    )
    res.status(200).json({ token, username: user.username })
  } catch (error) {
    next(error)
  }
}

module.exports = { login }
