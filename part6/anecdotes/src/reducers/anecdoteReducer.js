import { createSlice, current } from '@reduxjs/toolkit';
import { generateId } from '../utils/generateId';
import { initialState } from '../utils/constants';

export const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    vote: (state, action) => {
      const anecdote = state.find(
        anecdoteObject => anecdoteObject.id === action.payload.id,
      );
      anecdote.votes += 1;
      console.log(current(state));
    },

    create: (state, action) => {
      const length = state.length;
      state[length] = {
        anecdote: action.payload.anecdote,
        votes: 0,
        id: generateId(),
      };
    },
  },
});

export const { vote, create } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
