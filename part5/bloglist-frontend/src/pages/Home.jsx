import { useState, useEffect, useRef } from 'react';
import blogService from '../services/blogs';
import Blog from '../components/Blog';
import Login from '../components/Login';
import NewBlog from '../components/NewBlog';
import Notification from '../components/Notification';
import Togglable from '../components/Togglable';
import styles from './Home.module.css';

function Home({ user, onUserChange, onUpdateMessage }) {
  const [blogs, setBlogs] = useState([]);

  const newBlogRef = useRef();

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const allBlogs = await blogService.getAll();

        // if (!allBlogs) throw new Error('Internal Server Error');
        const sortedAllBlogs = allBlogs.sort(
          (currentObject, nextObject) => currentObject.likes - nextObject.likes,
        );

        setBlogs(sortedAllBlogs);
      } catch (error) {
        if (!error.message) {
          onUpdateMessage({
            message: 'Internal Server error! Try again later',
            type: 'error',
          });
        } else {
          onUpdateMessage({
            message: error.message,
            type: 'error',
          });
        }
      }
    };

    getAllBlogs();

    return () => {
      setBlogs([]);
    };
  }, []);

  const logOutHandler = () => {
    onUpdateMessage({
      message: `${user.username} logged out`,
      type: 'success',
    });
    window.localStorage.removeItem('user');
    onUserChange(null);
  };

  const onBlogUpdate = blogs => setBlogs(blogs);

  if (!user)
    return (
      <Togglable mainLabel='Log In'>
        <Login onLogin={onUserChange} onUpdateMessage={onUpdateMessage} />
      </Togglable>
    );

  const onToggle = () => newBlogRef.current.toggleVisibility();

  return (
    <div>
      <h2>blogs</h2>
      <h3>{user.username} logged in!</h3>
      <Togglable mainLabel='Create New Blog' ref={newBlogRef}>
        <NewBlog
          blogs={blogs}
          user={user}
          onBlogUpdate={onBlogUpdate}
          onUpdateMessage={onUpdateMessage}
          onToggle={onToggle}
        />
      </Togglable>

      {blogs.length > 0 &&
        blogs.map(blog => (
          <Blog
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
  );
}

export default Home;
