function Notification({ data }) {
  const { message, type } = data;
  if (message === null) return null;

  const styles =
    type === 'success'
      ? { color: 'green', borderColor: 'green' }
      : { color: 'red', borderColor: 'red' };

  return (
    <div className='notification' style={styles}>
      {message}
    </div>
  );
}

export default Notification;
