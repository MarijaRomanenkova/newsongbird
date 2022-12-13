import React, { createContext, useReducer } from 'react';

import birdsData from 'data.js';

export const QuizContext = createContext();

const MAXIMUM_SCORE_PER_LEVEL = 5;


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

const reducer = (state, action) => {
  switch (action.type) {
    case 'NEXT_LEVEL':
      return {
        ...state,
        currentLevel: state.currentLevel + 1,
        correctAnswerID: getCorrectAnswerID(state.currentLevel),
        isCorrectAnswerSelected: false,
        numberOfWrongAnswers: 0,
      };

    case 'WIN':
      if (state.currentLevel > birdsData.length - 2) {
        return {
          ...state,
          score:
            (state.numberOfWrongAnswers + 1 > MAXIMUM_SCORE_PER_LEVEL
              ? 0
              : MAXIMUM_SCORE_PER_LEVEL - (state.numberOfWrongAnswers - 1)) +
            state.score,
          isGameOver: true,
          isCorrectAnswerSelected: true,
        };
      }
      return {
        ...state,
        score:
          (state.numberOfWrongAnswers + 1 > MAXIMUM_SCORE_PER_LEVEL
            ? 0
            : MAXIMUM_SCORE_PER_LEVEL - (state.numberOfWrongAnswers - 1)) +
          state.score,
        isCorrectAnswerSelected: true,
      };

    case 'CHOOSE':
      return {
        ...state,
        numberOfWrongAnswers: state.numberOfWrongAnswers + 1,
      };

    case 'NEW_GAME':
      return {
        birdsData,
        currentLevel: 1,
        correctAnswerID: getCorrectAnswerID(0),
        numberOfWrongAnswers: 0,
        score: 0,
        isCorrectAnswerSelected: false,
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
