import { useState } from 'react';
import Togglable from './Togglable';
import blogServices from '../services/blogs';
import styles from './Blog.module.css';

function Blog({ blog, user, onUpdateMessage, onBlogUpdate, blogs }) {
  const [show, setShow] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const showWhenSetShow = { display: show ? '' : 'none' };

  const toggleShow = () => setShow(!show);

  const likePostHandler = async () => {
    const likesCount = likes + 1;

    // toggleShow();
    setLikes(likesCount);

    const { author, title, url } = blog;

    blogServices.getToken(user.token);

    await blogServices.updateBlog(
      { author, title, url, likes: likesCount },
      blog.id,
    );
  };

  const removePostHandler = async () => {
    const response = window.confirm(
      `Are you sure you want to remove the post: ${blog.title} by ${blog.author}`,
    );

    if (!response) return;
    try {
      blogServices.getToken(user.token);
      await blogServices.deleteBlogPost(blog.id);
      const filteredBlogs = blogs.filter(
        blogObject => blogObject.id !== blog.id,
      );

      onBlogUpdate(filteredBlogs);
      // onBlogUpdate(previousState =>
      //   previousState.filter(blogObject => blogObject.id === blog.id),
      // );
    } catch (error) {
      onUpdateMessage({ message: error.message, type: 'error' });
    }
  };

  const isOwner = user.username === blog.user.username;

  return (
    <div className={styles.container}>
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
          <dd>{likes}</dd>
        </dl>
        <button className={styles.button} onClick={likePostHandler}>
          Like
        </button>
        {blog.user.name && <p>{blog.user.name}</p>}
      </section>
      {isOwner && (
        <button onClick={removePostHandler} className={styles.remove}>
          Remove
        </button>
      )}
    </div>
  );
}

export default Blog;
