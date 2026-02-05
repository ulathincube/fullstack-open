const { Router } = require('express')
const {
  showAllBlogs,
  createBlogPost,
  deleteBlogPost,
  updateBlogPost,
} = require('../controllers/blog')

const router = Router()

router.get('/', showAllBlogs)
router.post('/', createBlogPost)

router.put('/:id', updateBlogPost)
router.delete('/:id', deleteBlogPost)

module.exports = router
