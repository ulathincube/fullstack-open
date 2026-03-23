import { createSlice } from '@reduxjs/toolkit';
import { generateId } from '../utils/generateId';

const initialState = [
  {
    anecdote: 'If it hurts, do it more often.',
    votes: 0,
    id: generateId(),
  },
  {
    anecdote: 'Adding manpower to a late software project makes it later!',
    votes: 0,
    id: generateId(),
  },
  {
    anecdote:
      'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    votes: 1,
    id: generateId(),
  },
  {
    anecdote:
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    votes: 0,
    id: generateId(),
  },
  {
    anecdote: 'Premature optimization is the root of all evil.',
    votes: 0,
    id: generateId(),
  },
  {
    anecdote:
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    votes: 0,
    id: generateId(),
  },
  {
    anecdote:
      'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    votes: 0,
    id: generateId(),
  },
  {
    anecdote: 'The only way to go fast, is to go well.',
    votes: 0,
    id: generateId(),
  },
];

export const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    vote: (state, action) => {
      const anecdote = state.find(
        anecdoteObject => anecdoteObject.id === action.payload.id,
      );
      anecdote.votes += 1;
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
