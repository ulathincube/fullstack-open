import NotificationContext from '../context/NotificationContext'
import { useContext } from 'react'

function Notification() {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  const { state } = useContext(NotificationContext)

  if (!state) return null

  return <div style={style}>{state}</div>
}

export default Notification
