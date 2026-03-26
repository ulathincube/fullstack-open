import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

import AnecdoteForm from './components/AnecdoteForm';
import Anecdote from './components/Anecdote';
import MostVotedAnecdote from './components/MostVotedAnecdote';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';

import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
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
      {/* <Anecdote title='Anecdote of the Day' anecdote={anecdote} /> */}
      <ErrorBoundary fallback={<div>Error encountered with AnecdoteList</div>}>
        <AnecdoteList />
      </ErrorBoundary>
      <MostVotedAnecdote
        title='Anecdote with most votes'
        anecdote={highestVote}
      />
      <AnecdoteForm />
    </div>
  );
}

export default App;
