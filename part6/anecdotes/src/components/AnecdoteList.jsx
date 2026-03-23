function AnecdoteList({ title, anecdote, onNextAnecdote, onVoteAnecdote }) {
  const { anecdote: anecdoteText, votes: currentVotes } = anecdote;

  return (
    <ul
      style={{
        listStyle: 'none',
        margin: 0,
        padding: 0,
      }}
    >
      <li>
        <h2>{title}</h2>
        <p>{anecdoteText}</p>
        <div>has {currentVotes} votes</div>
        <div style={{ display: 'flex', gap: 5 }}>
          <button onClick={onVoteAnecdote}>Vote</button>
          <button onClick={onNextAnecdote}>Next Anecdote</button>
        </div>
      </li>
    </ul>
  );
}

export default AnecdoteList;
