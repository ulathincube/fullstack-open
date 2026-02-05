function dummy(blogs) {
  return 1
}

function totalLikes(blogPosts) {
  return blogPosts.reduce(
    (accumulator, current) => accumulator + current.likes,
    0,
  )
}

function favouriteBlog(blogPosts) {
  if (blogPosts.length === 0) return []
  let favouritePost = blogPosts[0]

  for (const blogPost of blogPosts) {
    if (blogPost.likes > favouritePost.likes) {
      favouritePost = blogPost
    }
  }

  return favouritePost
}

function mostBlogs(blogPosts) {
  const authorNamesArray = new Set(blogPosts.map((blogPost) => blogPost.author))
  const authors = Array.from(authorNamesArray, (author) => ({
    author,
    posts: 0,
  }))

  console.log(authors)
  // loop array
  // make objects {author, posts: 0}
  // increment posts, for every author instance

  for (const blogPost of blogPosts) {
    for (const author of authors) {
      if (author.author === blogPost.author) {
        author.posts++
      }
    }
  }

  console.log(authors)
}

mostBlogs([
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
])

module.exports = { dummy, totalLikes, favouriteBlog }
