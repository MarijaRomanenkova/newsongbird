/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../../widgets/game/gameSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export default store;
