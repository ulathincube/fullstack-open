import { createSlice, current } from '@reduxjs/toolkit';

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
  },
});

export const { vote, create, setAnecdotes } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
