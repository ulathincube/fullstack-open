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
    console.log({ state });
    if (state.filter === '') return state.anecdote;

    return state.filter
      ? state.anecdote.filter(anecdoteObject =>
          anecdoteObject.content.includes(state.filter),
        )
      : state.anecdote;
  });

  const onVoteButtonHandler = anecdote => {
    onVoteAnecdote(anecdote.id);
    dispatch(createNotification(`You voted: ${anecdote.content}.`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  const anecdotesListUI = anecdotesState.map(anecdoteObject => (
    <Anecdote
      anecdote={anecdoteObject}
      key={anecdoteObject.id}
      onVoteAnecdote={() => onVoteButtonHandler(anecdoteObject)}
    />
  ));

  if (!anecdotesState) return <h1>...Unable to find all anecdotes...</h1>;

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
