const Blog = require('../models/blog');

function showAllBlogs(req, res) {
  Blog.find({}).then(allBlogs => res.json(allBlogs));
}

function createBlog(req, res) {
  const blogData = req.body;
  const newBlog = new Blog(blogData);
  newBlog.save().then(savedBlog => res.status(201).json(savedBlog));
}

module.exports = { showAllBlogs, createBlog };
