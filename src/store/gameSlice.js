/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { MAXIMUM_SCORE_PER_LEVEL } from 'gameSettings/gameSettings';

const url = '/data.json';

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
  isQuestionaryDataLoading: true,
  currentLevel: 1,
  correctAnswerID: getCorrectAnswerID(),
  numberOfWrongAnswers: 0,
  score: 0,
  isCorrectAnswerSelected: false,
  isGameOver: false,
};

export const getBirdsData = createAsyncThunk('game/getBirdsData', async () => {
  const response = await axios.get(url);
  console.log(response.data);
  return response.data;
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
  },
  // getBirdsData: (state, action) => {
  //   state.birdsData = action.payload;
  //   console.log('it happens');
  //   console.log(state.birdsData);
  // },
  extraReducers: (builder) => {
    builder
      .addCase(getBirdsData.pending, (state) => {
        state.isQuestionaryDataLoading = true;
      })
      .addCase(getBirdsData.fulfilled, (state, action) => {
        console.log(action, 'fullfilled');
        state.isQuestionaryDataLoading = false;
        state.birdsData = action.payload;
      })
      .addCase(getBirdsData.rejected, (state) => {
        console.log('error rejected');
        state.isQuestionaryDataLoading = false;
      });
  },
});

export const { nextLevel, win, choose, newGame } = gameSlice.actions;

// export const getBirdsDataAsync = (data) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(getBirdsData(data));
//   }, 1000);
// };

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
export const selectIsQuestionaryDataLoading = (state) =>
  state.game.isQuestionaryDataLoading;

export default gameSlice.reducer;
