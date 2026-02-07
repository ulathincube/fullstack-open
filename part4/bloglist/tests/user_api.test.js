const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app.js')
const mongoose = require('mongoose')
const User = require('../models/user')

const api = supertest(app)

describe('user api', () => {
  beforeEach(async () => {
    await User.findOneAndDelete({ username: 'therealoliverzw' })
  })
  test('creates a new user', async () => {
    const newUser = {
      name: 'Oliver Mtukudzi',
      username: 'therealoliverzw',
      password: '$oliver-mtukudzi$',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert(response.body.name, 'Oliver Mtukudzi')
  })

  test('get all the users', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('creating an invalid username returns an error', async () => {
    const userData = {
      name: 'Faulty User',
      username: 'F',
      password: 'password',
    }
    await api.post('/api/users').send(userData).expect(400)
  })

  test('creating a user with invalid password returns error', async () => {
    const userData = {
      name: 'Faulty User',
      username: 'faultyuser',
      password: 'p',
    }

    await api.post('/api/users').send(userData).expect(400)
  })

  test('login with valid data returns a 200 request', async () => {
    const userInfo = {
      username: 'therealjasonzw',
      password: '**therealmiller**',
    }

    const response = await api
      .post('/api/auth/login')
      .send(userInfo)
      .expect(200)

    console.log(response.body.token)
  })
})

after(async () => {
  mongoose.connection.close()
})
