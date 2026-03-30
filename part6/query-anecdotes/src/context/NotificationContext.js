import { createContext } from 'react'

const NotificationContext = createContext({ state: '', dispatch: () => {} })

export default NotificationContext
