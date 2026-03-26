function MostVotedAnecdote({ title, anecdote }) {
  const { content } = anecdote;
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}

export default MostVotedAnecdote;
