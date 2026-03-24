import Anecdote from './Anecdote';
import { useSelector, useDispatch } from 'react-redux';
import FilterAnecdotes from './FilterAnecdotes';
import {
  createNotification,
  removeNotification,
} from '../reducers/notificationReducer';

function AnecdoteList({ onVoteAnecdote }) {
  const dispatch = useDispatch();

  const anecdotesState = useSelector(state => {
    console.log(state.filter);
    if (state.filter === '*') return state.anecdote;

    return state.filter
      ? state.anecdote.filter(anecdoteObject =>
          anecdoteObject.anecdote.includes(state.filter),
        )
      : state.anecdote;
  });

  const onVoteButtonHandler = anecdote => {
    onVoteAnecdote(anecdote.id);
    dispatch(createNotification(`You voted: ${anecdote.anecdote}.`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  const anecdotesListUI = anecdotesState.map(anecdoteObject => (
    <Anecdote
      anecdote={anecdoteObject}
      key={anecdoteObject.anecdote}
      onVoteAnecdote={() => onVoteButtonHandler(anecdoteObject)}
    />
  ));

  return (
    <ul
      style={{
        listStyle: 'none',
        margin: 0,
        padding: 0,
      }}
    >
      <FilterAnecdotes />
      {anecdotesListUI}
    </ul>
  );
}

export default AnecdoteList;
