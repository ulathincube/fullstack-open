const Blog = require('../models/blog')

async function showAllBlogs(req, res) {
  const allBlogs = await Blog.find({})
  res.status(200).json(allBlogs)
}

async function createBlogPost(req, res) {
  const { author, title, url, likes = 0 } = req.body

  if (!title || !url) return res.status(400).end()

  const newBlog = new Blog({ author, title, url, likes })
  await newBlog.save()
  res.status(201).json(newBlog)
}

async function deleteBlogPost(req, res, next) {
  const { id } = req.params

  try {
    const deletedPost = await Blog.findByIdAndDelete(id)
    if (!deletedPost) return res.status(404).end()
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}

async function updateBlogPost(req, res, next) {
  const { id } = req.params
  const { likes = 0 } = req.body

  try {
    const blogPost = await Blog.findById(id)
    if (!blogPost) return res.status(404).end()

    blogPost.likes = likes

    await blogPost.save()

    res.status(201).json(blogPost)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  showAllBlogs,
  createBlogPost,
  deleteBlogPost,
  updateBlogPost,
}
