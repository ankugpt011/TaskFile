import {configureStore} from '@reduxjs/toolkit';
import postReducer from './slices/dataSlice';

export const store = configureStore({
  reducer: {
    post: postReducer,
  },
});
