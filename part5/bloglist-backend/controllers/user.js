const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { SALTROUNDS } = require('../utils/config')
const CustomError = require('../errors/CustomError')

async function createUser(req, res, next) {
  const { username, name, password } = req.body

  if (!(username || name || password))
    return res.status(400).json({
      error:
        'Please provide all the required user data - username, password, name }',
    })

  if (password.length < 3)
    throw new CustomError(400, 'Please provide a stronger password')

  try {
    const salt = await bcrypt.genSalt(Number(SALTROUNDS))

    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      username,
      name,
      password: hashedPassword,
    })

    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
}

async function getAllUsers(req, res, next) {
  try {
    const allUsers = await User.find({}).populate('blogs', {
      url: 1,
      title: 1,
      author: 1,
    })
    res.status(200).json(allUsers)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createUser,
  getAllUsers,
}
