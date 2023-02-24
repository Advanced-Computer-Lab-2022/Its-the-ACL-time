import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    type: null,
    message: null,
    open: false,
  },
  reducers: {
    loadNotification(state, action) {
      state = {
        ...state,
        type: action.payload.type,
        open: true,
      };
    },

    successNotification(state, action) {
      state = {
        ...state,
        message: action.payload.message,
        type: 'success',
        open: true,
      };
    },

    errorNotification(state, action) {
      state = {
        ...state,
        message: action.payload.message,
        type: 'error',
        open: true,
      };
    },

    hideNotification(state) {
      state = {
        ...state,
        message: null,
        type: null,
        open: false,
      };
    },
  },
});

export const uiActions = {
  loadNotification: uiSlice.actions.loadNotification,
  successNotification: uiSlice.actions.successNotification,
  errorNotification: uiSlice.actions.errorNotification,
  hideNotification: uiSlice.actions.hideNotification,
};

export default uiSlice.reducer;
