import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { MAXIMUM_SCORE_PER_LEVEL } from 'gameSettings/gameSettings';

const url = '/data.json';

const initialState = {
  birdsData: [],
  isQuestionaryDataLoading: true,
  currentLevel: 1,
  correctAnswerID: 1,
  numberOfWrongAnswers: 0,
  score: 0,
  isCorrectAnswerChosen: false,
  isGameOver: false,
};

export const getBirdsData = createAsyncThunk('game/getBirdsData', async () => {
  const response = await axios.get(url);
  return response.data;
});

const getCorrectAnswerID = (currentLevelArrayLength) => {
  const maximumNumber = currentLevelArrayLength;
  const minimumNumber = 1;
  const randomNumber =
    Math.floor(Math.random() * (maximumNumber - minimumNumber + 1)) +
    minimumNumber;
  return randomNumber;
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    getFirstQuizAnswear: (state) => {
      state.correctAnswerID = getCorrectAnswerID(
        state.birdsData[state.currentLevel].length
      );
    },
    switchToNextLevel: (state) => {
      state.currentLevel += 1;
      state.correctAnswerID = getCorrectAnswerID(
        state.birdsData[state.currentLevel].length
      );
      state.isCorrectAnswerChosen = false;
      state.numberOfWrongAnswers = 0;
    },

    correctAnswerChosen: (state) => {
      state.isCorrectAnswerChosen = true;
      if (state.numberOfWrongAnswers < MAXIMUM_SCORE_PER_LEVEL) {
        state.score +=
          MAXIMUM_SCORE_PER_LEVEL - (state.numberOfWrongAnswers - 1);
      }
      if (state.currentLevel > state.birdsData.length - 2) {
        state.isGameOver = true;
      }
    },

    answerWasChosen: (state) => {
      state.numberOfWrongAnswers += 1;
    },

    resetTheGame: (state) => {
      state.currentLevel = 1;
      state.correctAnswerID = getCorrectAnswerID(state.birdsData[1].length);
      state.numberOfWrongAnswers = 0;
      state.score = 0;
      state.isCorrectAnswerChosen = false;
      state.isGameOver = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBirdsData.pending, (state) => {
        state.isQuestionaryDataLoading = true;
      })
      .addCase(getBirdsData.fulfilled, (state, action) => {
        state.isQuestionaryDataLoading = false;
        state.birdsData = action.payload;
      })
      .addCase(getBirdsData.rejected, (state) => {
        state.isQuestionaryDataLoading = false;
      });
  },
});

export const {
  getFirstQuizAnswear,
  switchToNextLevel,
  correctAnswerChosen,
  answerWasChosen,
  resetTheGame,
} = gameSlice.actions;
export const selectCurrentLevel = (state) => state.game.currentLevel;
export const selectScore = (state) => state.game.score;
export const selectIsCorrectAnswerChosen = (state) =>
  state.game.isCorrectAnswerChosen;
export const selectIsGameOver = (state) => state.game.isGameOver;
export const selectCorrectAnswerObject = (state) =>
  state.game.birdsData[state.game.currentLevel][state.game.correctAnswerID - 1];
export const selectCurrentCategoryArray = (state) =>
  state.game.birdsData[state.game.currentLevel];
export const selectCategoriesNames = (state) => state.game.birdsData[0];
export const selectIsQuestionaryDataLoading = (state) =>
  state.game.isQuestionaryDataLoading;

export default gameSlice.reducer;
