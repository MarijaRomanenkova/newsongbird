import React, { createContext, useReducer } from 'react';

import birdsData from 'data.js';

export const QuizContext = createContext();

export const MAXIMUM__SCORE__PER__LEVEL = 5;
export const MAXIMUM_TOTAL_SCORE_VALUE = MAXIMUM__SCORE__PER__LEVEL * birdsData.length;


const getCorrectAnswerID = (level) => {
  const maximumNumber = birdsData[level].length;
  const minimumNumber = 1;
  const randomNumber =
    Math.floor(Math.random() * (maximumNumber - minimumNumber + 1)) +
    minimumNumber;
  return randomNumber;
};

const initialState = {
  birdsData,
  level: 0,
  correctAnswerID: getCorrectAnswerID(0),
  chosenAnswerOptionId: {},
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
        level: state.level + 1,
        correctAnswerID: getCorrectAnswerID(state.level),
        chosenAnswerOptionId: null,
        isCorrectAnswer: false,
        numberOfWrongAnswers: 0,
        isGameOver: false,
      };

    case 'WIN':
      if (state.level > birdsData.length - 1) {
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
        chosenAnswerOptionId: action.payload,
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
        chosenAnswerOptionId: action.payload,
        isGameOver: false,
      };

    case 'NEW_GAME':
      return {
        birdsData,
        level: 0,
        correctAnswerID: getCorrectAnswerID(0),
        chosenAnswerOptionId: null,
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
