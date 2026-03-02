import { useState } from 'react'
import Togglable from './Togglable'
import blogServices from '../services/blogs'
import styles from './Blog.module.css'

function Blog({
  blog,
  user,
  onUpdateMessage,
  onBlogUpdate,
  blogs,
  onPostLike,
}) {
  const [show, setShow] = useState(false)

  const showWhenSetShow = { display: show ? '' : 'none' }

  const toggleShow = () => setShow(!show)

  const removePostHandler = async () => {
    const response = window.confirm(
      `Are you sure you want to remove the post: ${blog.title} by ${blog.author}`
    )

    if (!response) return
    try {
      blogServices.getToken(user.token)
      await blogServices.deleteBlogPost(blog.id)
      const filteredBlogs = blogs.filter(
        (blogObject) => blogObject.id !== blog.id
      )

      onBlogUpdate(filteredBlogs)
      onUpdateMessage({
        message: `Blog post ${blog.title} by ${blog.author} has been deleted!`,
        type: 'success',
      })
      // onBlogUpdate(previousState =>
      //   previousState.filter(blogObject => blogObject.id === blog.id),
      // );
    } catch (error) {
      onUpdateMessage({ message: error.message, type: 'error' })
    }
  }

  const isOwner = user.username === blog.user.username

  return (
    <li className={`blog ${styles.container}`}>
      <div>
        <h1 className={styles.heading}>
          {blog.title} {blog.author}
        </h1>
        <button className={styles.button} onClick={toggleShow}>
          {show ? 'Hide' : 'View'}
        </button>
      </div>
      <section style={showWhenSetShow}>
        <a className={styles.link} href={blog.url}>
          {blog.url}
        </a>
        <dl className={styles.list}>
          <dt>Likes</dt>
          <dd>{blog.likes}</dd>
        </dl>
        <button className={styles.button} onClick={onPostLike}>
          Like
        </button>
        {blog.user.name && <p>{blog.user.name}</p>}
      </section>
      {isOwner && (
        <button onClick={removePostHandler} className={styles.remove}>
          Remove
        </button>
      )}
    </li>
  )
}

export default Blog
