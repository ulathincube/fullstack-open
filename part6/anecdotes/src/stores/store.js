import { configureStore } from '@reduxjs/toolkit';
import anecdoteReducer from '../slices/anecdoteSlice';

export default configureStore({
  reducer: {
    anecdote: anecdoteReducer,
  },
});
