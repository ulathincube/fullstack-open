import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { vote, create } from './reducers/anecdoteReducer';
import {
  createNotification,
  removeNotification,
} from './reducers/notificationReducer';
import AnecdoteForm from './components/AnecdoteForm';
import Anecdote from './components/Anecdote';
import MostVotedAnecdote from './components/MostVotedAnecdote';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';

function App() {
  const [selected, setSelected] = useState(0);

  const dispatch = useDispatch();
  const anecdoteState = useSelector(state => {
    const stateCopy = [...state.anecdote].sort(
      (currentObject, nextObject) => nextObject.votes - currentObject.votes,
    );
    return stateCopy;
  });

  const notificationState = useSelector(state => state.notification);

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
    dispatch(createNotification(`${newAnecdote} has just been created!`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
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

  console.log({ notificationState });

  return (
    <div>
      {notificationState && <Notification message={notificationState} />}
      <Anecdote
        title='Anecdote of the Day'
        anecdote={anecdote}
        onVoteAnecdote={() => voteAnecdoteHandler(anecdote.id)}
        onNextAnecdote={randomAnecdoteHandler}
      />
      <AnecdoteList onVoteAnecdote={voteAnecdoteHandler} />
      <MostVotedAnecdote
        title='Anecdote with most votes'
        anecdote={highestVote}
      />
      <AnecdoteForm onCreateAnecdote={onCreateAnecdote} />
    </div>
  );
}

export default App;
