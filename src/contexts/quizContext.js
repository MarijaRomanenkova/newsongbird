/* eslint-disable import/no-unresolved */
import React, { createContext, useReducer } from 'react';
import birdsData from 'data.js';

export const QuizContext = createContext();

// TODO: wrong func naming (look at input variable naming) it is not obvious
const getRandomQuestionId = (level) => {
  const maximumNumber = birdsData[level].length;
  const minimumNumber = 1;
  const randomNumber =
    Math.floor(Math.random() * (maximumNumber - minimumNumber + 1)) +
    minimumNumber;
  return randomNumber;
};

// TODO: move it to top
const MAXIMUM__SCORE__PER__LEVEL = 5;

// TODO: simplify logic here. it looks like we do not need to iterate through all answers to determine amount of score. 2. naming for function looks like it not cover for the functionality inside
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
  chosenAnswerId: {},
  numberOfAttempts: 0,
  score: 0,
  // TODO: naming for variable below, can we rename it?
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
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
}
