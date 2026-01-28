const { Router } = require('express');
const getInfo = require('../controllers/info');

const router = Router();

router.get('/', getInfo);

module.exports = router;
