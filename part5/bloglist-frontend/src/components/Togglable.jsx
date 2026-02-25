import { useState, useImperativeHandle } from 'react'
import styles from './Togglable.module.css'

function Togglable({ children, mainLabel, ref }) {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return { toggleVisibility, visibility: visible }
  })

  return (
    <section>
      <div style={hideWhenVisible}>
        <button className={styles.button} onClick={toggleVisibility}>
          {mainLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button className={styles.cancel} onClick={toggleVisibility}>
          Cancel
        </button>
      </div>
    </section>
  )
}

export default Togglable
