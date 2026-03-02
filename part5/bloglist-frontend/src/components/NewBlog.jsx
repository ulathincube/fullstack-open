import { useState } from 'react'
import styles from './NewBlog.module.css'

function NewBlog({ onUpdateMessage, onBlogCreate }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  const onFormSubmit = (event) => {
    event.preventDefault()
    if (!title || !url || !author) {
      onUpdateMessage({
        message: 'Please provide all the post data',
        type: 'error',
      })
      return
    }
    const clearInputs = () => {
      setTitle('')
      setAuthor('')
      setUrl('')
      setLikes(0)
    }

    onBlogCreate({ title, author, url, likes })
    clearInputs()
  }

  return (
    <section>
      <h3 className={styles.heading}>Create a New Blog Post</h3>
      <form className={styles.form} onSubmit={onFormSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">Url</label>
          <input
            type="text"
            name="url"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <label htmlFor="likes">Likes</label>
          <input
            type="number"
            name="likes"
            step="1"
            min="0"
            id="likes"
            value={likes}
            onChange={({ target }) => setLikes(target.value)}
          />
        </div>

        <div>
          <button className={styles.button} type="submit">
            Create
          </button>
        </div>
      </form>
    </section>
  )
}

export default NewBlog
