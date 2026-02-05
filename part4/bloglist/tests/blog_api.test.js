const supertest = require('supertest')
const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const { blogs, blogsInDB, nonExistingId } = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(blogs)
})

describe('api', () => {
  test.skip('get all the blogs', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const contents = response.body.map((blog) => blog.title)

    assert(contents.includes('Which GPU should you buy?'), true)
    assert.strictEqual(response.body.length, 3)
  })

  test.skip('id property exists in database', async () => {
    const response = await api.get('/api/blogs')

    const idPropertyExists = response.body.every((blog) => blog.id)

    assert.strictEqual(idPropertyExists, true)
  })

  test.skip('creating a new post adds it to db', async () => {
    const newBlog = {
      title: 'How to get a lot of money',
      author: 'Arthur Morgan',
      url: 'https://red-dead-redemption.com/arthur',
      likes: 100000,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.post('/api/blogs').send(newBlog)
    assert.strictEqual(response.body.title, 'How to get a lot of money')
  })

  test.skip('adds a default value of zero to the object', async () => {
    const newBlog = {
      title: 'Das leben wird sehr gesund wenn du taglich trainierst!',
      author: 'Hanz Schreber',
      url: 'https://daslebenfuralles.de/hanz',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.post('/api/blogs').send(newBlog)
    assert.strictEqual(response.body.likes, 0)
  })

  test.skip('a blog without a title or url returns an error', async () => {
    const blog = {
      author: 'The Odin Project',
      likes: 300,
    }

    await api.post('/api/blogs').send(blog).expect(400)
  })
})

describe('delete a blog post', () => {
  test.skip('deleting a blog post is successful', async () => {
    const [firstBlog] = await blogsInDB()
    const { id: blogPostId } = firstBlog.toJSON()
    await api.delete(`/api/blogs/${blogPostId}`).expect(204)
  })

  test.skip('trying to delete a non existent document returns error', async () => {
    const nonExistentId = await nonExistingId()
    await api.delete(`/api/blogs/${nonExistentId}`).expect(404)
  })
})

describe('update a single post', () => {
  test.skip('updating a single document is successful', async () => {
    const [firstBlog] = await blogsInDB()

    const { id: blogPostId } = firstBlog.toJSON()
    await api.put(`/api/blogs/${blogPostId}`).send({ likes: 1500 }).expect(201)
  })

  test('trying to update a non existent document returns error', async () => {
    const nonExistentId = await nonExistingId()

    await api
      .put(`/api/blogs/${nonExistentId}`)
      .send({ likes: 1500 })
      .expect(404)
  })
})

after(async () => {
  mongoose.connection.close()
})
