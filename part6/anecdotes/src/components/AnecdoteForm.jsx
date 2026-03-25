import styles from './AddAnecdote.module.css';
import anecdoteServices from '../services/anecdotes';

function AnecdoteForm({ onCreateAnecdote }) {
  const addAnecdoteHandler = async event => {
    event.preventDefault();
    const anecdote = await anecdoteServices.createNew(
      event.target.anecdote.value,
    );

    console.log({ anecdote });
    onCreateAnecdote(anecdote);
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
