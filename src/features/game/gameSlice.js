import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { MAXIMUM_SCORE_PER_LEVEL } from 'features/game/gameSettings';
import { axiosInstance } from 'shared/axiosInstance';

const initialState = {
  birdsData: {},
  isRequestLoading: true,
  currentLevel: 1,
  correctAnswerID: 0,
  numberOfWrongAnswers: 0,
  score: 0,
  isCorrectAnswerChosen: false,
  isGameOver: false,
};

export const getBirdsData = createAsyncThunk('game/getBirdsData', async () => {
  try {
    const response = await axiosInstance.get('');
    return response.data;
  } catch (error) {
    return toast.error('Error', error);
  }
});

function getCorrectAnswerID(currentLevelArrayLength) {
  const maximumNumber = currentLevelArrayLength;
  const minimumNumber = 1;
  const randomNumber = Math.floor(Math.random() * (maximumNumber - minimumNumber + 1)) +
    minimumNumber;
  return randomNumber;
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    switchToNextLevel: (state) => {
      state.currentLevel += 1;
      state.correctAnswerID = getCorrectAnswerID(
        state.birdsData.ru[state.currentLevel].length
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
      if (state.currentLevel > state.birdsData.ru.length - 2) {
        state.isGameOver = true;
      }
    },

    answerWasChosen: (state) => {
      state.numberOfWrongAnswers += 1;
    },

    resetTheGame: (state) => {
      state.currentLevel = 1;
      state.correctAnswerID = getCorrectAnswerID(state.birdsData.ru[1].length);
      state.numberOfWrongAnswers = 0;
      state.score = 0;
      state.isCorrectAnswerChosen = false;
      state.isGameOver = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBirdsData.pending, (state) => {
        state.isRequestLoading = true;
      })
      .addCase(getBirdsData.fulfilled, (state, action) => {
        state.birdsData = action.payload;
        state.correctAnswerID = getCorrectAnswerID(action.payload.ru[1].length);
        state.isRequestLoading = false;
      })
      .addCase(getBirdsData.rejected, (state) => {
        state.isRequestLoading = false;
      });
  },
});

export const {
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
export const selectIsRequestLoading = (state) => state.game.isRequestLoading;
export const selectCorrectAnswerID = (state) => state.game.correctAnswerID;
export const selectBirdsData = (state) => state.game.birdsData;

export default gameSlice.reducer;