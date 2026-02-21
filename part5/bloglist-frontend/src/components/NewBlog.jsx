import { useState } from 'react';
import blogServices from '../services/blogs';
import styles from './NewBlog.module.css';

function NewBlog({ user, onBlogUpdate, onUpdateMessage, blogs, onToggle }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const createPostHandler = async event => {
    event.preventDefault();

    const clearInputs = () => {
      setTitle('');
      setAuthor('');
      setUrl('');
    };

    if (!title || !url || !author) {
      onUpdateMessage({
        message: 'Please provide all the post data',
        type: 'error',
      });
      return;
    }
    const blogPost = { title, author, url };
    try {
      blogServices.getToken(user.token);
      const dbBlogPost = await blogServices.createBlog(blogPost);
      onBlogUpdate(blogs.concat(dbBlogPost));
      onUpdateMessage({
        message: `Blog post: ${title} by ${author} has been added!`,
        type: 'success',
      });

      clearInputs();
      onToggle();
    } catch (error) {
      onUpdateMessage({ message: error.message, type: 'error' });
    }
  };

  return (
    <section>
      <h3>Create a New Blog Post</h3>
      <form onSubmit={createPostHandler}>
        <div>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor='author'>Author</label>
          <input
            type='text'
            name='author'
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor='url'>Url</label>
          <input
            type='text'
            name='url'
            id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <button type='submit'>Create</button>
        </div>
      </form>
    </section>
  );
}

export default NewBlog;
