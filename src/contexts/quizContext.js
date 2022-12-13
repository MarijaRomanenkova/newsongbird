import React, { createContext, useReducer } from 'react';

import birdsData from 'data.js';

export const QuizContext = createContext();

export const MAXIMUM__SCORE__PER__LEVEL = 5;
export const MAXIMUM_TOTAL_SCORE_VALUE =
  MAXIMUM__SCORE__PER__LEVEL * (birdsData.length - 1);

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
  isCorrectAnswer: false,
  isGameOver: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'NEXT_LEVEL':
      return {
        ...state,
        currentLevel: state.currentLevel + 1,
        correctAnswerID: getCorrectAnswerID(state.currentLevel),
        isCorrectAnswer: false,
        numberOfWrongAnswers: 0,
        isGameOver: false,
      };

    case 'WIN':
      if (state.level > birdsData.length - 2) {
        return {
          ...state,
          score:
            MAXIMUM__SCORE__PER__LEVEL -
            state.numberOfWrongAnswers +
            state.prevScore,
          isGameOver: true,
          isCorrectAnswer: true,
        };
      }
      return {
        ...state,
        isCorrectAnswer: true,
        isGameOver: false,
        score:
          MAXIMUM__SCORE__PER__LEVEL -
          state.numberOfWrongAnswers +
          state.prevScore,
      };

    case 'CHOOSE':
      return {
        ...state,
        numberOfWrongAnswers: state.numberOfWrongAnswers + 1,
        isGameOver: false,
      };

    case 'NEW_GAME':
      return {
        birdsData,
        currentLevel: 1,
        correctAnswerID: getCorrectAnswerID(0),
        numberOfWrongAnswers: 0,
        score: 0,
        isCorrectAnswer: false,
        isGameOver: false,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export function QuizProvider({ children }) {
  const value = useReducer(reducer, initialState);
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}
