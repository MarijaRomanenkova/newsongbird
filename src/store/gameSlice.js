/* eslint-disable prettier/prettier */
/* eslint-disable prefer-destructuring */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

import { MAXIMUM_SCORE_PER_LEVEL } from 'gameSettings/gameSettings';
import { axiosInstance } from '../axiosInstance';



const initialState = {
  birdsData: [],  
  categoriesNames: [],
  isRequestLoading: true,
  currentLevel: 1,
  currentCategoryOptions: [],
  correctAnswerID: 0,
  correctAnswerObject: {},
  currentChosenAnswer: {},
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

function setCurrentCategoryOptions(currentCategoryOptions, id) {
  const newArray = currentCategoryOptions.map((option) => {    
      if (option.id === id) {
        return { ...option,                
          uniqueID: nanoid(),
          isTouched: false, 
          isCorrectAnswer: true,                
        };
      }
      return { ...option,
        uniqueID: nanoid(),
        isTouched: false,
        isCorrectAnswer: false,
      };
    }
  );
  return newArray  
}

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
        state.birdsData.ru[state.currentLevel].length);  
      state.currentCategoryOptions = setCurrentCategoryOptions(state.birdsData.ru[state.currentLevel], state.correctAnswerID)
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

    answerWasChosen: (state, action) => {
      state.numberOfWrongAnswers += 1; 
      state.currentCategoryOptions = state.currentCategoryOptions.map(
        (option) => {
          if (option.id === action.payload) {
            return { ...option, isTouched: true };
          }
          return { ...option };
        }
      );
      state.currentChosenAnswer = state.currentCategoryOptions.find(
        (option) => option.id === action.payload
      ); 
    },

    resetTheGame: (state) => {
      state.currentLevel = 1;
      state.currentCategoryOptions = state.birdsData.ru[1];
      state.correctAnswerID = getCorrectAnswerID(state.birdsData.ru[1].length);
      state.currentCategoryOptions = setCurrentCategoryOptions(state.currentCategoryOptions,state.correctAnswerID);              
      state.currentChosenAnswer = {};
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
        // eslint-disable-next-line prefer-destructuring        
        state.categoriesNames = action.payload.categories;
        state.correctAnswerID = getCorrectAnswerID(action.payload.ru[1].length);
        state.currentCategoryOptions = setCurrentCategoryOptions(action.payload.ru[state.currentLevel], state.correctAnswerID);     
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
export const selectCategoriesNames = (state) => state.game.categoriesNames;
export const selectCurrentCategoryOptions = (state) =>
  state.game.currentCategoryOptions;
export const selectCorrectAnswerObject = (state) =>
  state.game.correctAnswerObject;
export const selectCurrentChosenAnswer = (state) =>
  state.game.currentChosenAnswer;
export const selectCorrectAnswerID = (state) => state.game.correctAnswerID;

export const selectBirdsData = (state) => state.game.birdsData;


export default gameSlice.reducer;
