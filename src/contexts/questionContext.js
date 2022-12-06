import React, { createContext, useReducer } from 'react';
import birdsData from '../data';

export const QuestionContext = createContext();

const getRandomQuestionId = (level) => {
  const maximumNumber = birdsData[level].length;
  const minimumNumber = 1;
  const randomNumber =
    Math.floor(Math.random() * (maximumNumber - minimumNumber + 1)) +
    minimumNumber;
  return randomNumber;
};

const MAXIMUM__SCORE__PER__LEVEL = 5;

const setScore = (prevScore, numberOfAttempts) => {
  let score = 0;
  for (let i = numberOfAttempts; i < MAXIMUM__SCORE__PER__LEVEL + 1; i += 1) {
    score += 1;
  }
  return prevScore + score;
};

const initialState = {
  birdsData,
  level: 0,
  randomQuestionID: getRandomQuestionId(0),
  chosenAnswerId: null,
  numberOfAttempts: 0,
  score: 0,
  numberOfCorrectAnswers: 0,
  isCorrectAnswer: false,
  isGameOver: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'NEXT_LEVEL':
      return {
        ...state,
        level: state.level + 1,
        randomQuestionID: getRandomQuestionId(state.level),
        chosenAnswerId: null,
        isCorrectAnswer: false,
        numberOfAttempts: 0,
        isGameOver: false,
      };

    case 'WIN':
      if (state.numberOfCorrectAnswers > 4) {
        return {
          ...state,
          score: setScore(state.score, state.numberOfAttempts),
          isGameOver: true,
          isCorrectAnswer: true,
        };
      }
      return {
        ...state,
        chosenAnswerId: action.payload,
        isCorrectAnswer: true,
        numberOfCorrectAnswers: state.numberOfCorrectAnswers + 1,
        isGameOver: false,
        score: setScore(state.score, state.numberOfAttempts),
      };

    case 'CHOOSE':
      return {
        ...state,
        numberOfAttempts: state.numberOfAttempts + 1,
        chosenAnswerId: action.payload,
        isGameOver: false,
      };

    case 'NEW_GAME':
      return {
        birdsData,
        level: 0,
        randomQuestionID: getRandomQuestionId(0),
        chosenAnswerId: null,
        numberOfAttempts: 0,
        score: 0,
        numberOfCorrectAnswers: 0,
        isCorrectAnswer: false,
        isGameOver: false,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

// eslint-disable-next-line react/prop-types
export function QuestionProvider({ children }) {
  const value = useReducer(reducer, initialState);
  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
}
