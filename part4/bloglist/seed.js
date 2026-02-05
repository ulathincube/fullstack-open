const Blog = require('./models/blog')
const mongoose = require('mongoose')
require('dotenv').config()

const databaseURI = process.env.TEST_MONGODB_URI

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

async function seedDB() {
  try {
    await mongoose.connect(databaseURI, { family: 4 })
    await Blog.deleteMany({})
    await Blog.insertMany(blogs)
    await mongoose.connection.close()
    console.log('data inserted')
  } catch (error) {
    console.log(error)
  }
}

seedDB()
