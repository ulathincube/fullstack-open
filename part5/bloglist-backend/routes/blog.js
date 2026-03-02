const { Router } = require('express')
const {
  showAllBlogs,
  createBlogPost,
  deleteBlogPost,
  updateBlogPost,
} = require('../controllers/blog')
const userExtractor = require('../middlewares/userExtractor')

const router = Router()

router.get('/', showAllBlogs)
router.post('/', userExtractor, createBlogPost)

router.put('/:id', updateBlogPost)
router.delete('/:id', userExtractor, deleteBlogPost)

module.exports = router
