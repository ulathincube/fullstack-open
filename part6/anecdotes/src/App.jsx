import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { vote, create, setAnecdotes } from './reducers/anecdoteReducer';
import {
  createNotification,
  removeNotification,
} from './reducers/notificationReducer';
import AnecdoteForm from './components/AnecdoteForm';
import Anecdote from './components/Anecdote';
import MostVotedAnecdote from './components/MostVotedAnecdote';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import anecdoteServices from './services/anecdotes';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAnecdotes = async () => {
      const allAnecdotes = await anecdoteServices.getAll();
      dispatch(setAnecdotes(allAnecdotes));
    };

    getAnecdotes();
  }, [dispatch]);

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
    dispatch(create(newAnecdote));
    dispatch(
      createNotification(`${newAnecdote.content} has just been created!`),
    );
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

  return (
    <div>
      {notificationState && <Notification message={notificationState} />}
      <Anecdote title='Anecdote of the Day' anecdote={anecdote} />
      <ErrorBoundary fallback={<div>Error encountered with AnecdoteList</div>}>
        <AnecdoteList onVoteAnecdote={voteAnecdoteHandler} />
      </ErrorBoundary>
      <MostVotedAnecdote
        title='Anecdote with most votes'
        anecdote={highestVote}
      />
      <AnecdoteForm onCreateAnecdote={onCreateAnecdote} />
    </div>
  );
}

export default App;
