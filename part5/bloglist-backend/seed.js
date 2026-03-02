const Blog = require('./models/blog')
const User = require('./models/user')
const mongoose = require('mongoose')
require('dotenv').config()
const bcrypt = require('bcryptjs')

const databaseURI = process.env.TEST_MONGODB_URI

const keyword = process.argv[2]

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

const user = {
  username: 'therealjasonzw',
  name: 'Jason Miller',
  password: '**therealmiller**',
}

const blog = {
  title: 'How to learn javascript fast!',
  url: 'https://medium.com/posts/javascript-fast',
  likes: 350,
  user: process.env.USER_REF,
}

async function createUser() {
  try {
    await mongoose.connect(databaseURI, { family: 4 })
    const salt = await bcrypt.genSalt(Number(process.env.SALTROUNDS))
    const hashedPassword = await bcrypt.hash(user.password, salt)
    const newUser = new User({ ...user, password: hashedPassword })
    const newBlog = new Blog(blog)
    await newBlog.save()
    newUser.blogs = newUser.blogs.concat(newBlog._id)
    await newUser.save()
    console.log('user created!')
    await mongoose.connection.close()
  } catch (error) {
    console.log(error)
  }
}

// async function seedDB() {
//   try {
//     await mongoose.connect(databaseURI, { family: 4 })
//     await Blog.deleteMany({})
//     await Blog.insertMany(blogs)
//     await mongoose.connection.close()
//     console.log('data inserted')
//   } catch (error) {
//     console.log(error)
//   }
// }

async function clearDB() {
  try {
    await mongoose.connect(databaseURI, { family: 4 })
    await User.deleteMany({})
    await Blog.deleteMany({})

    await mongoose.connection.close()
  } catch (error) {
    console.log(error)
  }
}

if (keyword === 'clear') {
  clearDB()
} else if (keyword === 'createuser') {
  createUser()
} else if (keyword === 'createblogs') {
  console.log('creating blogs!')
}
