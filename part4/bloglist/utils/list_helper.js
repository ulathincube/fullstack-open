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

  let current = authors[0]

  // {author: '', posts: ''}

  for (const author of authors) {
    if (author.posts > current.posts) {
      current = author
    }
  }

  return current
}

function highestLikes(blogPosts) {
  if (!blogPosts) return null
  const uniqueAuthorNames = new Set(
    blogPosts.map((blogPost) => blogPost.author),
  )
  const authors = Array.from(uniqueAuthorNames, (author) => ({
    author,
    likes: 0,
  }))

  for (const blogPost of blogPosts) {
    for (const author of authors) {
      if (author.author === blogPost.author) {
        author.likes += blogPost.likes
      }
    }
  }

  let current = authors[0]
  for (const author of authors) {
    if (author.likes > current.likes) {
      current = author
    }
  }

  return current
}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, highestLikes }
