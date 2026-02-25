import Home from './pages/Home'
import Notification from './components/Notification'
import { useState, useEffect, useCallback } from 'react'

function App() {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({ message: '', type: null })

  const onUpdateMessage = useCallback((newMessage) => {
    setMessage(newMessage)
    setTimeout(() => setMessage({ message: '', type: null }), 3000)
  }, [])

  useEffect(() => {
    const getUserData = () => {
      const localStorageUser = window.localStorage.getItem('user')

      if (!localStorageUser) return
      const userData = JSON.parse(localStorageUser)
      setUser(userData)
    }
    getUserData()
  }, [])

  const onUserChange = (newUser) => setUser(newUser)

  return (
    <>
      {message.message && (
        <Notification message={message.message} type={message.type} />
      )}
      <Home
        user={user}
        onUserChange={onUserChange}
        onUpdateMessage={onUpdateMessage}
      />
    </>
  )
}

export default App
