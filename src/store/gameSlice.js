import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { MAXIMUM_SCORE_PER_LEVEL } from 'gameSettings/gameSettings';

const url = 'data.json';

const getCorrectAnswerID = () => {
  // const maximumNumber = birdsData[currentLevel].length;
  const maximumNumber = 6;
  const minimumNumber = 1;
  const randomNumber =
    Math.floor(Math.random() * (maximumNumber - minimumNumber + 1)) +
    minimumNumber;
  return randomNumber;
};

const initialState = {
  birdsData: [],
  currentLevel: 1,
  correctAnswerID: getCorrectAnswerID(),
  numberOfWrongAnswers: 0,
  score: 0,
  isCorrectAnswerSelected: false,
  isGameOver: false,
  isLoading: true,
};

export const fetchBirdsData = createAsyncThunk('birds/birdsData', async () => {
  try {
    const response = await axios.get(url);
    return response?.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.log('something went wrong');
  }
});

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    nextLevel: (state) => {
      state.currentLevel += 1;
      state.correctAnswerID = getCorrectAnswerID();
      state.isCorrectAnswerSelected = false;
      state.numberOfWrongAnswers = 0;
    },

    win: (state) => {
      state.isCorrectAnswerSelected = true;
      if (state.numberOfWrongAnswers < MAXIMUM_SCORE_PER_LEVEL) {
        state.score +=
          MAXIMUM_SCORE_PER_LEVEL - (state.numberOfWrongAnswers - 1);
      }
      if (state.currentLevel > state.birdsData.length - 2) {
        state.isGameOver = true;
      }
    },

    choose: (state) => {
      state.numberOfWrongAnswers += 1;
    },

    newGame: (state) => {
      state.currentLevel = 1;
      state.correctAnswerID = getCorrectAnswerID();
      state.numberOfWrongAnswers = 0;
      state.score = 0;
      state.isCorrectAnswerSelected = false;
      state.isGameOver = false;
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchBirdsData.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchBirdsData.fulfilled, (state, action) => {
          // console.log(action);
          state.isLoading = false;
          state.birdsData = action.payload;
        })
        .addCase(fetchBirdsData.rejected, (state, action) => {
          console.log(action);
          state.isLoading = false;
        });
    },
  },
});

export const { nextLevel, win, choose, newGame } = gameSlice.actions;

export const selectCurrentLevel = (state) => state.game.currentLevel;
export const selectScore = (state) => state.game.score;
export const selectIsCorrectAnswerSelected = (state) =>
  state.game.isCorrectAnswerSelected;
export const selectIsGameOver = (state) => state.game.isGameOver;
export const selectCurrentCorrectAnswerObject = (state) =>
  state.game.birdsData[state.game.currentLevel][state.game.correctAnswerID - 1];
export const selectCurrentCategoryArray = (state) =>
  state.game.birdsData[state.game.currentLevel];
export const selectCategoriesNames = (state) => state.game.birdsData[0];
export const selectIsLoading = (state) => state.game.isLoading;

export default gameSlice.reducer;
