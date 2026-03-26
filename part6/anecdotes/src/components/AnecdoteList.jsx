import Anecdote from './Anecdote';
import { useSelector, useDispatch } from 'react-redux';
import FilterAnecdotes from './FilterAnecdotes';
import { setNotification } from '../reducers/notificationReducer';
import { updateAnecdotes } from '../reducers/anecdoteReducer';

function AnecdoteList() {
  const dispatch = useDispatch();

  const anecdotesState = useSelector(state => {
    if (state.filter === '') return state.anecdote;

    return state.filter
      ? state.anecdote.filter(anecdoteObject =>
          anecdoteObject.content.includes(state.filter),
        )
      : state.anecdote;
  });

  const onVoteButtonHandler = anecdote => {
    const nextUpdate = { ...anecdote, votes: anecdote.votes + 1 };

    dispatch(updateAnecdotes(nextUpdate));
    // onVoteAnecdote(anecdote.id);
    dispatch(setNotification(`You voted: '${anecdote.content}'.`, 5));
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
