import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { RootState } from 'app/store';
import { MAXIMUM_SCORE_PER_LEVEL } from 'features/game/gameSettings';
import axiosInstance from 'shared/axiosInstance';

interface GameState {
  language: string;
  birdsData: any;
  isRequestLoading: boolean;
  currentLevel: number;
  correctAnswerID: number;
  numberOfWrongAnswers: number;
  score: number;
  isCorrectAnswerChosen: boolean;
  isGameOver: boolean;
}

const initialState: GameState = {
  language: 'en',
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
  } catch (error: any) {
    return toast.error('Error', error);
  }
});

function getCorrectAnswerID(currentLevelArrayLength: number): number {
  const maximumNumber = currentLevelArrayLength;
  const minimumNumber = 1;
  const randomNumber =
    Math.floor(Math.random() * (maximumNumber - minimumNumber + 1)) +
    minimumNumber;
  return randomNumber;
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    switchLanguage: (state, action) => {
      state.language = action.payload;
    },
    switchToNextLevel: (state) => {
      state.currentLevel += 1;
      state.correctAnswerID = getCorrectAnswerID(
        Object.values(state.birdsData[state.language][state.currentLevel])
          .length
      );
      state.isCorrectAnswerChosen = false;
      state.numberOfWrongAnswers = 0;
    },
    answerWasChosen: (state) => {
      state.numberOfWrongAnswers += 1;
    },
    resetTheGame: (state) => {
      state.currentLevel = 1;
      state.correctAnswerID = getCorrectAnswerID(
        Object.values(state.birdsData[state.language][state.currentLevel])
          .length
      );
      state.numberOfWrongAnswers = 0;
      state.score = 0;
      state.isCorrectAnswerChosen = false;
      state.isGameOver = false;
    },

    correctAnswerChosen: (state) => {
      state.isCorrectAnswerChosen = true;
      if (state.numberOfWrongAnswers < MAXIMUM_SCORE_PER_LEVEL) {
        state.score +=
          MAXIMUM_SCORE_PER_LEVEL - (state.numberOfWrongAnswers - 1);
      }
      if (state.currentLevel > state.birdsData[state.language].length - 2) {
        state.isGameOver = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBirdsData.pending, (state) => {
        state.isRequestLoading = true;
      })
      .addCase(getBirdsData.fulfilled, (state, action) => {
        state.birdsData = action.payload;
        state.correctAnswerID = getCorrectAnswerID(
          Object.values(action.payload[state.language][1]).length
        );

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
  switchLanguage,
} = gameSlice.actions;
export const selectCurrentLevel = (state: RootState): number =>
  state.game.currentLevel;
export const selectScore = (state: RootState): number => state.game.score;
export const selectIsCorrectAnswerChosen = (state: RootState): boolean =>
  state.game.isCorrectAnswerChosen;
export const selectIsGameOver = (state: RootState): boolean =>
  state.game.isGameOver;
export const selectIsRequestLoading = (state: RootState): boolean =>
  state.game.isRequestLoading;
export const selectCorrectAnswerID = (state: RootState): number =>
  state.game.correctAnswerID;
export const selectBirdsData = (state: RootState) => state.game.birdsData;

export default gameSlice.reducer;
