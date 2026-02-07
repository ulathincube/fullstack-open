const Blog = require('../models/blog')

const user = {
  username: 'therealjasonzw',
  name: 'Jason Miller',
  password: '**therealmiller**',
}

const blogs = [
  {
    title: 'How to get gain a lot of muscle',
    author: 'Ulathi Ncube',
    url: 'https://google.com/fitness',
    likes: 1,
  },
  {
    title: 'How much Creatine is enough per day',
    author: 'Ulathi Ncube',
    url: 'https://google.com/fitness-basics',
    likes: 300,
  },
  {
    title: 'Which GPU should you buy?',
    author: 'Allisa Moyo',
    url: 'https://google.com/computers',
    likes: 50,
  },
]

async function blogsInDB() {
  const allBlogs = await Blog.find({})
  return allBlogs
}

async function nonExistingId() {
  const newBlog = new Blog({
    title: 'sooontobedeleted!',
    author: 'admin',
    url: 'https://google.com',
    likes: 0,
  })
  await newBlog.save()
  await newBlog.deleteOne()
  return newBlog._id.toString()
}

module.exports = {
  blogs,
  blogsInDB,
  nonExistingId,
  user,
}
