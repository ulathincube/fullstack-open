import { useState } from 'react'
import authService from '../services/auth'
import styles from './Login.module.css'

function Login({ onLogin, onUpdateMessage }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginFormHandler = async (event) => {
    event.preventDefault()
    try {
      const user = await authService.login({ username, password })

      onLogin(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      onUpdateMessage({
        message: `${user.username} logged in successfully!`,
        type: 'success',
      })
    } catch (error) {
      if (!error.message) {
        return onUpdateMessage({
          message: 'Internal Server error',
          type: 'error',
        })
      }
      onUpdateMessage({ message: error.message, type: 'error' })
    }
  }

  return (
    <form className={styles.form} onSubmit={loginFormHandler}>
      <div className={styles.group}>
        <label className={styles.label} htmlFor="username">
          Username
        </label>
        <input
          className={styles.field}
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div className={styles.group}>
        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <input
          className={styles.field}
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className={styles.group}>
        <button className={styles.button} type="submit">
          Log In
        </button>
      </div>
    </form>
  )
}

export default Login
