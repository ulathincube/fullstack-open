import { useState } from 'react';
import authService from '../services/auth';

function Login({ onLogin, onUpdateMessage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginFormHandler = async event => {
    event.preventDefault();
    try {
      const user = await authService.login({ username, password });

      onLogin(user);
      window.localStorage.setItem('user', JSON.stringify(user));
      onUpdateMessage({
        message: `${user.username} logged in successfully!`,
        type: 'success',
      });
    } catch (error) {
      onUpdateMessage({ message: error.message, type: 'error' });
    }
  };

  return (
    <form onSubmit={loginFormHandler}>
      <div>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          name='username'
          id='username'
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <div>
        <button type='submit'>Log In</button>
      </div>
    </form>
  );
}

export default Login;
