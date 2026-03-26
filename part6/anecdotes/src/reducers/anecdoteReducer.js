import { createSlice, current } from '@reduxjs/toolkit';
import anecdoteServices from '../services/anecdotes';

export const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    vote: (state, action) => {
      const anecdote = state.find(
        anecdoteObject => anecdoteObject.id === action.payload.id,
      );
      anecdote.votes += 1;
      console.log(current(state));
    },

    create: (state, action) => {
      state.push(action.payload);
    },

    setAnecdotes: (state, action) => {
      return action.payload;
    },
    updateAnecdote: (state, action) => {
      const anecdote = state.find(
        anecdoteObject => anecdoteObject.id === action.payload.id,
      );

      anecdote.votes += 1;

      state.map(anecdoteObject =>
        anecdoteObject.id === action.payload.id ? anecdote : anecdoteObject,
      );
    },
  },
});

const { create, setAnecdotes, updateAnecdote } = anecdoteSlice.actions;

export const { vote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const allAnecdotes = await anecdoteServices.getAll();
    dispatch(setAnecdotes(allAnecdotes));
  };
};

export const addNewAnecdote = anecdote => {
  return async dispatch => {
    const anecdoteObject = await anecdoteServices.createNew(anecdote);
    dispatch(create(anecdoteObject));
  };
};

export const updateAnecdotes = content => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteServices.updateVote(content);
    dispatch(updateAnecdote(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;
