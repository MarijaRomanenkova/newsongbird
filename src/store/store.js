/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import languageReducer from './languageSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    language: languageReducer,
  },
});

export default store;
