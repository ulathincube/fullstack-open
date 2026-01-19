import { useState } from 'react';

function Anecdote({ title, anecdote }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{anecdote}</p>
    </div>
  );
}

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);

  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  const currentVotes = votes[selected];
  const anecdote = anecdotes[selected];

  const getRandomNum = () => Math.round(Math.random() * 7);

  const randomAnecdoteHandler = () => {
    setSelected(getRandomNum());
  };

  const voteAnecdoteHandler = key => {
    setVotes({ ...votes, [key]: votes[key] + 1 });
  };

  const returnHighestVoted = () => {
    const votesArray = Object.entries(votes);
    let largest = votesArray[0];

    for (let i = 0; i < votesArray.length; i++) {
      const current = votesArray[i];
      if (current[1] > largest[1]) {
        largest = votesArray[i];
      }
    }

    const highestVote = anecdotes[largest[0]];
    return highestVote;
  };

  const highestVote = returnHighestVoted();

  return (
    <div>
      <Anecdote title='Anecdote of the Day' anecdote={anecdote} />
      <div>has {currentVotes} votes</div>
      <div style={{ display: 'flex', gap: 5 }}>
        <button onClick={() => voteAnecdoteHandler(selected)}>Vote</button>
        <button onClick={randomAnecdoteHandler}>Next Anecdote</button>
      </div>
      <Anecdote title='Anecdote with most votes' anecdote={highestVote} />
    </div>
  );
}

export default App;
