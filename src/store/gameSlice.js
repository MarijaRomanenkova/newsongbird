import { createSlice } from '@reduxjs/toolkit';

import { MAXIMUM_SCORE_PER_LEVEL } from 'gameSettings/gameSettings';
import birdsData from '../data';

const getCorrectAnswerID = (currentLevel) => {
  const maximumNumber = birdsData[currentLevel].length;
  const minimumNumber = 1;
  const randomNumber =
    Math.floor(Math.random() * (maximumNumber - minimumNumber + 1)) +
    minimumNumber;
  return randomNumber;
};

const initialState = {
  birdsData,
  currentLevel: 1,
  correctAnswerID: getCorrectAnswerID(0),
  numberOfWrongAnswers: 0,
  score: 0,
  isCorrectAnswerSelected: false,
  isGameOver: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,

  reducers: {
    nextLevel: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.currentLevel += 1;
      const nextLevelCorrectAnswerID = getCorrectAnswerID(state.currentLevel);
      state.push({
        correctAnswerID: nextLevelCorrectAnswerID,
        isCorrectAnswerSelected: false,
        numberOfWrongAnswers: 0,
      });
    },

    win: (state) => {
      if (state.currentLevel > birdsData.length - 2) {
        (state.score +=
          state.numberOfWrongAnswers + 1 > MAXIMUM_SCORE_PER_LEVEL
            ? 0
            : MAXIMUM_SCORE_PER_LEVEL - (state.numberOfWrongAnswers - 1)),
          state.push({
            isGameOver: true,
            isCorrectAnswerSelected: true,
          });
      }
      state.score +=
        state.numberOfWrongAnswers + 1 > MAXIMUM_SCORE_PER_LEVEL
          ? 0
          : MAXIMUM_SCORE_PER_LEVEL - (state.numberOfWrongAnswers - 1);
      state.push({ isCorrectAnswerSelected: true });
    },

    choose: (state) => {
      state.numberOfWrongAnswers += 1;
    },

    newGame: (state) => {
      const nextLevelCorrectAnswerID = getCorrectAnswerID(0);
      state.push({
        currentLevel: 1,
        correctAnswerID: nextLevelCorrectAnswerID,
        numberOfWrongAnswers: 0,
        score: 0,
        isCorrectAnswerSelected: false,
        isGameOver: false,
      });
    },
  },
});

export const { nextLevel, win, choose, newGame } = gameSlice.actions;

export const correctAnswerID = (state) => state.game.correctAnswerID;
export const selectCurrentLevel = (state) => state.game.currentLevel;
export const selectNumberOfWrongAnswers = (state) =>
  state.game.numberOfWrongAnswers;
export const selectScore = (state) => state.game.score;
export const selectIsCorrectAnswerSelected = (state) =>
  state.game.isCorrectAnswerSelected;
export const selectIsGameOver = (state) => state.game.isGameOver;
export const selectCurrentCorrectAnswerObject = (state) =>
  state.game.birdsData[state.game.currentLevel][state.game.correctAnswerID - 1];
export const selectCurrentCategoryArray = (state) =>
  state.game.birdsData[state.game.currentLevel];

export default gameSlice.reducer;
