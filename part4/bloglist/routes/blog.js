const { Router } = require('express');
const { showAllBlogs, createBlog } = require('../controllers/blog');

const router = Router();

router.get('/', showAllBlogs);
router.post('/', createBlog);

module.exports = router;
