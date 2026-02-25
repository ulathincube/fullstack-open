import { useState, useEffect, useRef } from 'react'
import blogService from '../services/blogs'
import Blog from '../components/Blog'
import Login from '../components/Login'
import NewBlog from '../components/NewBlog'
import Notification from '../components/Notification'
import Togglable from '../components/Togglable'
import styles from './Home.module.css'

function Home({ user, onUserChange, onUpdateMessage }) {
  const [blogs, setBlogs] = useState([])

  const newBlogRef = useRef()

  useEffect(() => {
    console.log('does this run again??')
    const getAllBlogs = async () => {
      try {
        const allBlogs = await blogService.getAll()

        const sortedAllBlogs = allBlogs.sort(
          (currentObject, nextObject) => currentObject.likes - nextObject.likes
        )

        setBlogs(sortedAllBlogs)
      } catch (error) {
        if (!error.message) {
          onUpdateMessage({
            message: 'Internal Server error! Try again later',
            type: 'error',
          })
        } else {
          onUpdateMessage({
            message: error.message,
            type: 'error',
          })
        }

        return
      }
    }

    getAllBlogs()
  }, [onUpdateMessage])

  const logOutHandler = () => {
    onUpdateMessage({
      message: `${user.username} logged out`,
      type: 'success',
    })
    window.localStorage.removeItem('user')
    onUserChange(null)
  }

  const onBlogUpdate = (blogs) => setBlogs(blogs)

  if (!user)
    return (
      <Togglable mainLabel="Log In">
        <Login onLogin={onUserChange} onUpdateMessage={onUpdateMessage} />
      </Togglable>
    )

  const onToggle = () => {
    console.log(newBlogRef.current)
    newBlogRef.current.toggleVisibility()
  }

  const onPostLike = async (postId) => {
    const blogToEditIndex = blogs.findIndex(
      (blogObject) => blogObject.id === postId
    )

    const oldBlog = blogs[blogToEditIndex]

    const newBlogs = [...blogs]
    newBlogs[blogToEditIndex] = { ...oldBlog, likes: oldBlog.likes + 1 }
    onBlogUpdate(newBlogs)

    blogService.getToken(user.token)

    await blogService.updateBlog(
      {
        author: oldBlog.author,
        title: oldBlog.title,
        url: oldBlog.url,
        likes: oldBlog.likes + 1,
      },
      postId
    )
  }

  const createBlogPost = async (data) => {
    const createBlog = (data) => ({
      title: data.title,
      author: data.author,
      url: data.url,
    })
    const blogPost = createBlog({
      url: data.url,
      title: data.title,
      author: data.author,
    })
    try {
      blogService.getToken(user.token)
      const dbBlogPost = await blogService.createBlog(blogPost)
      onBlogUpdate(blogs.concat(dbBlogPost))
      onUpdateMessage({
        message: `Blog post: ${data.title} by ${data.author} has been added!`,
        type: 'success',
      })

      onToggle()
    } catch (error) {
      onUpdateMessage({ message: error.message, type: 'error' })
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <h3>{user.username} logged in!</h3>
      <Togglable mainLabel="Create New Blog" ref={newBlogRef}>
        <NewBlog
          onBlogCreate={createBlogPost}
          onUpdateMessage={onUpdateMessage}
        />
      </Togglable>

      {blogs.length > 0 &&
        blogs.map((blog) => (
          <Blog
            onPostLike={() => onPostLike(blog.id)}
            onUpdateMessage={onUpdateMessage}
            key={blog.id}
            blog={blog}
            user={user}
            onBlogUpdate={onBlogUpdate}
            blogs={blogs}
          />
        ))}
      <button className={styles.button} onClick={logOutHandler}>
        Log Out
      </button>
    </div>
  )
}

export default Home
