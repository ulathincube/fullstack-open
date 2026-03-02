const { Router } = require('express')
const { resetDatabase } = require('../controllers/testing')

const router = Router()

router.post('/reset', resetDatabase)

module.exports = router
