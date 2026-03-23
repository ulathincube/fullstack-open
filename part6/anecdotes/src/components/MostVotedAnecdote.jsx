function MostVotedAnecdote({ title, anecdote }) {
  const { anecdote: anecdoteText } = anecdote;
  return (
    <div>
      <h2>{title}</h2>
      <p>{anecdoteText}</p>
    </div>
  );
}

export default MostVotedAnecdote;
