const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../utils/config')

async function showAllBlogs(req, res) {
  const allBlogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  })
  res.status(200).json(allBlogs)
}

async function createBlogPost(req, res) {
  const { author, title, url, likes = 0 } = req.body

  const { user } = req

  if (!user)
    return res.status(401).json({
      error: 'You are not authorized to create a blog post without logging in!',
    })

  console.log(`!!!hello ${user.username}: ID: ${user.id}!!!`)

  if (!title || !url) return res.status(400).end()

  const currentUser = await User.findById(user.id)
  if (!currentUser) return res.status(404).json({ error: 'User not found!' })

  const newBlog = new Blog({ author, title, url, likes, user: currentUser._id })
  await newBlog.save()

  currentUser.blogs = currentUser.blogs.concat(newBlog._id)
  await currentUser.save()

  res.status(201).json(newBlog)
}

async function deleteBlogPost(req, res, next) {
  const { id } = req.params
  const { user } = req
  console.log(user)

  if (!user)
    return res.status(401).json({
      error: 'You are not authorized to create a blog post without logging in!',
    })

  // user who created this post = > blog.user.id === userId

  try {
    const blogPost = await Blog.findById(id)

    if (!blogPost)
      return res.status(404).json({ error: 'Blog post not found!' })

    if (blogPost.user.toString() !== user.id.toString())
      return res.status(401).json({
        error: 'You do not have the access rights to delete this blog post!',
      })

    const deletedPost = await Blog.findByIdAndDelete(id)
    if (!deletedPost) return res.status(404).end()
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}

async function updateBlogPost(req, res, next) {
  const { id } = req.params
  const { likes, title, author, url } = req.body

  try {
    const blogPost = await Blog.findById(id)

    if (!blogPost) return res.status(404).end()

    blogPost.author = author
    blogPost.title = title
    blogPost.url = url
    blogPost.likes = likes

    const updatedData = await blogPost.save()
    const populatedData = await updatedData.populate('user', {
      username: 1,
      name: 1,
    })

    res.status(201).json(populatedData)
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
