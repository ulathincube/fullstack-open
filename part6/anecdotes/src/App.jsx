import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { vote, create } from './slices/anecdoteSlice';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import MostVotedAnecdote from './components/MostVotedAnecdote';

function App() {
  const [selected, setSelected] = useState(0);

  const dispatch = useDispatch();
  const anecdoteState = useSelector(state => {
    const stateCopy = [...state.anecdote].sort(
      (currentObject, nextObject) => nextObject.votes - currentObject.votes,
    );
    return stateCopy;
  });

  if (!anecdoteState || anecdoteState.length === 0)
    return <h1>...Loading Anecdotes...</h1>;

  const anecdote = anecdoteState[selected];

  const getRandomNum = () =>
    Math.abs(Math.round(Math.random() * anecdoteState.length - 1));

  const randomAnecdoteHandler = () => {
    setSelected(getRandomNum());
  };

  const onCreateAnecdote = newAnecdote => {
    dispatch(create({ anecdote: newAnecdote }));
  };

  const voteAnecdoteHandler = id => {
    console.log(id);
    dispatch(vote({ id }));
  };

  const returnHighestVoted = () => {
    let largest = anecdoteState[0];

    for (let i = 0; i < anecdoteState.length; i++) {
      if (anecdoteState[i].votes > largest.votes) {
        largest = anecdoteState[i];
      }
    }

    return largest;
  };

  const highestVote = returnHighestVoted();

  return (
    <div>
      <AnecdoteList
        title='Anecdote of the Day'
        anecdote={anecdote}
        onVoteAnecdote={() => voteAnecdoteHandler(anecdote.id)}
        onNextAnecdote={randomAnecdoteHandler}
      />
      <MostVotedAnecdote
        title='Anecdote with most votes'
        anecdote={highestVote}
      />
      <AnecdoteForm onCreateAnecdote={onCreateAnecdote} />
    </div>
  );
}

export default App;
