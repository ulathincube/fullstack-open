import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    createNotification: (state, action) => {
      return action.payload;
    },
    removeNotification: () => {
      return null;
    },
  },
});

const { createNotification, removeNotification } = notificationSlice.actions;

export const setNotification = (text, time) => {
  return dispatch => {
    dispatch(createNotification(text));
    setTimeout(() => {
      dispatch(removeNotification());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
