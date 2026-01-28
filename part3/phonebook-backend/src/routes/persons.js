const { Router } = require('express');
const {
  getAllPersons,
  getOnePerson,
  deleteOnePerson,
  createOnePerson,
} = require('../controllers/persons');

const router = Router();

router.get('/:personId', getOnePerson);
router.delete('/:personId', deleteOnePerson);

router.get('/', getAllPersons);
router.post('/', createOnePerson);

module.exports = router;
