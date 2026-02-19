import { useState, useEffect } from 'react';
import blogService from '../services/blogs';
import Blog from '../components/Blog';
import Login from '../components/Login';
import NewBlog from '../components/NewBlog';
import Notification from '../components/Notification';

function Home({ user, onUserChange, onUpdateMessage }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const allBlogs = await blogService.getAll();
        setBlogs(allBlogs);
      } catch (error) {
        onUpdateMessage({ message: error.message, type: 'error' });
      }
    };

    getAllBlogs();
  }, [onUpdateMessage]);

  const logOutHandler = () => {
    onUpdateMessage({
      message: `${user.username} logged out`,
      type: 'success',
    });
    window.localStorage.removeItem('user');
    onUserChange(null);
  };

  const onBlogAdd = newBlog => setBlogs([...blogs, newBlog]);

  if (!user)
    return <Login onLogin={onUserChange} onUpdateMessage={onUpdateMessage} />;

  return (
    <div>
      <h2>blogs</h2>
      <h3>{user.username} logged in!</h3>
      <NewBlog
        user={user}
        onBlogAdd={onBlogAdd}
        onUpdateMessage={onUpdateMessage}
      />
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
      <button onClick={logOutHandler}>Log Out</button>
    </div>
  );
}

export default Home;
