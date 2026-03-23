import styles from './AddAnecdote.module.css';

function AnecdoteForm({ onCreateAnecdote }) {
  const addAnecdoteHandler = event => {
    event.preventDefault();
    onCreateAnecdote(event.target.anecdote.value);
    event.target.anecdote.value = '';
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
