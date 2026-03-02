const { test, describe } = require('node:test')
const assert = require('node:assert')
const {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  highestLikes,
} = require('../utils/list_helper')

const blogPosts = [
  {
    _id: '345555555554444xxxx',
    author: 'James Clean',
    title: 'How to get rid of bad habits',
    likes: 1000,
    url: 'https://google.com/atomic-habits',
    __v: 0,
  },
  {
    _id: '345555555556664xxyy',
    author: 'UX Matters',
    title: 'How to design web forms',
    likes: 350,
    url: 'https://google.com/web-forms',
    __v: 0,
  },
  {
    _id: '3455555442224444xxzz',
    author: 'Smashing Magazine',
    title: 'How to get good at CSS',
    likes: 560,
    url: 'https://google.com/how-to-get-good-at-css',
    __v: 0,
  },
  {
    _id: '3455555442224444xxzz',
    author: 'Smashing Magazine',
    title: 'How to master CSS Grid',
    likes: 400,
    url: 'https://google.com/how-to-master-css-grid',
    __v: 0,
  },
]

describe('dummy', () => {
  test('dummy returns 1', () => {
    assert.strictEqual(dummy(), 1)
  })
})

describe('likes', () => {
  test('empty blog list returns 0', () => {
    const blogPosts = []

    assert.strictEqual(totalLikes(blogPosts), 0)
  })

  test('single blog list returns its own likes value', () => {
    const blogPost = [
      {
        author: 'Ulathi Ncube',
        title: 'How to get rid of bad friends',
        likes: 1,
        url: 'https://google.com/bad-friends',
      },
    ]

    assert.strictEqual(totalLikes(blogPost), 1)
  })

  test('total likes is equal to 2310', () => {
    assert.strictEqual(totalLikes(blogPosts), 2310)
  })
})

describe('favouriteBlog', () => {
  test('empty blogPosts return []', () => {
    assert.deepStrictEqual(favouriteBlog([]), [])
  })

  test('blog posts with one item return that single post', () => {
    assert.deepStrictEqual(
      favouriteBlog([
        {
          _id: '3455555442224444xxzz',
          author: 'Smashing Magazine',
          title: 'How to get good at CSS',
          likes: 560,
          url: 'https://google.com/how-to-get-good-at-css',
          __v: 0,
        },
      ]),
      {
        _id: '3455555442224444xxzz',
        author: 'Smashing Magazine',
        title: 'How to get good at CSS',
        likes: 560,
        url: 'https://google.com/how-to-get-good-at-css',
        __v: 0,
      },
    )
  })

  test('blog posts with many items return post with highest likes', () => {
    assert.deepStrictEqual(favouriteBlog(blogPosts), {
      _id: '345555555554444xxxx',
      author: 'James Clean',
      title: 'How to get rid of bad habits',
      likes: 1000,
      url: 'https://google.com/atomic-habits',
      __v: 0,
    })
  })
})

describe('most blogs', () => {
  test('given an array of blog posts an author with the highest blog posts is returned', () => {
    const highestBlogs = mostBlogs(blogPosts)

    assert.deepStrictEqual(highestBlogs, {
      author: 'Smashing Magazine',
      posts: 2,
    })
  })
})

describe('highest likes', () => {
  test('returns author with the highest likes', () => {
    const mostLikedAuthor = highestLikes(blogPosts)

    assert.deepStrictEqual(mostLikedAuthor, {
      author: 'James Clean',
      likes: 1000,
    })
  })
})
