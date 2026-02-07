const { Router } = require('express')
const { login } = require('../controllers/auth')

const router = Router()

router.post('/login', login)
router.get('/login', (req, res) => {
  res.json({ message: 'hi!' })
})

module.exports = router
