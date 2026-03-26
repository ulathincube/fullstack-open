import styles from './AddAnecdote.module.css';
import { useDispatch } from 'react-redux';
import { addNewAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

function AnecdoteForm() {
  const dispatch = useDispatch();

  const addAnecdoteHandler = async event => {
    event.preventDefault();

    dispatch(addNewAnecdote(event.target.anecdote.value));
    dispatch(
      setNotification(
        `'${event.target.anecdote.value}' has just been created!`,
        5,
      ),
    );
    event.target.anecdote.value = '';

    // onCreateAnecdote(anecdote);
  };

  return (
    <section>
      <h3>Add A New Anecdote</h3>
      <form onSubmit={addAnecdoteHandler}>
        <div>
          <label htmlFor='anecdote'>Anecdote</label>
          <input
            id='anecdote'
            className={styles.input}
            type='text'
            name='anecdote'
            placeholder='Anecdote'
          />
        </div>
        <div>
          <button>Add Anecdote</button>
        </div>
      </form>
    </section>
  );
}

export default AnecdoteForm;
