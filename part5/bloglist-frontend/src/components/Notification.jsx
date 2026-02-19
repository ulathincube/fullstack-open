import styles from './Notification.module.css';

function Notification({ message, type }) {
  return <div className={`${styles.message} ${styles[type]}`}>{message}</div>;
}

export default Notification;
